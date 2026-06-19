export function Loading() {
	return (
		<div className="w-full py-32 flex flex-col items-center gap-12">
			<div className="size-36 border-18 border-kahoot-green-dark border-t-transparent animate-spin rounded-full" />
			<p className="text-3xl font-bold">Loading quizzes...</p>
		</div>
	);
}
