import { createServerClient } from "@supabase/ssr";
import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value)
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	// IMPORTANT: Avoid writing any logic between createServerClient and
	// supabase.auth.getUser(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	const {
		data: { user },
	} = await supabase.auth.getUser();

	await supabase.auth.refreshSession();
	const { data } = await supabase.auth.getSession();
	const jwt = data.session?.access_token;
	let userInfo;
	if (jwt) {
		try {
			userInfo = await jwtVerify(
				jwt,
				new TextEncoder().encode(process.env.JWT_SECRET)
			);
		} catch (err) {
			const url = request.nextUrl.clone();
		}
	}

	if (request.nextUrl.pathname.startsWith("/admin")) {
		const { data } = await supabase.auth.getSession();
		const userJWT = data.session?.access_token;
		if (userJWT) {
			const userRole = await jwtVerify(
				userJWT,
				new TextEncoder().encode(process.env.JWT_SECRET)
			)
				.then((data) => data.payload.user_role)
				.catch(() => undefined);
			if (userRole !== "admin") {
				const url = request.nextUrl.clone();
				url.pathname = "/403";
				return NextResponse.redirect(url);
			}
		} else {
			const url = request.nextUrl.clone();
			url.pathname = "/403";
			return NextResponse.redirect(url);
		}
	}

	// IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
	// creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}
