export function Loading() {
	return (
		<div className="w-2xl h-128 flex flex-col gap-8 items-center justify-center">
			<div className="size-24 border-16 border-t-transparent border-kahoot-green-dark rounded-full animate-spin" />
			<span className="text-4xl font-bold">Validating quiz...</span>
		</div>
	);
}
