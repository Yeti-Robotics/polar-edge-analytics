

export default async function ErrorPage(props: { searchParams: Record<string, any> }) {
    const searchParams = props.searchParams;

    return (
        <div>Error: {searchParams["error"] ?? "UNKNOWN_ERROR"}</div>
    )
}