import { auth } from "@/lib/auth";


export default async function dataTablePage() {
    const session = await auth();

    if (!session?.user?.id) {
        return <div>"You must be logged in to view this page"</div>
    }

    return <div>dataTable page hello world </div>
}



