export default function MdxLayout({ children }: { children: React.ReactNode }) {
	return <article className="prose dark:prose-invert">{children}</article>;
}
