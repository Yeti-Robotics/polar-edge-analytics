

export default async function ErrorPage(props: { searchParams: Promise<Record<string, any>> }) {
    const searchParams = (await props.searchParams);

    return (
        <div>Error: {searchParams["error"] ?? "UNKNOWN_ERROR"}</div>
    )
}