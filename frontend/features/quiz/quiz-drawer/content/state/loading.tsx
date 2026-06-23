export function Loading() {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-10">
			<div className="size-40 border-24 border-kahoot-green-dark border-t-transparent rounded-full animate-spin" />
			<span className="text-3xl font-bold">Loading...</span>
		</div>
	);
}
