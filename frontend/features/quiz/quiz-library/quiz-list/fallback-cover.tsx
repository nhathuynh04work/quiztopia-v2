export function FallbackCover() {
	return (
		<div className="w-full flex justify-center items-center aspect-16/11 relative bg-[#b6b6b6] overflow-hidden">
			<div className="w-2/3 aspect-square absolute bg-[#8c8c8c] rounded-full top-0 left-0 -translate-y-1/2 -translate-x-1/2" />
			<div className="w-1/2 aspect-square absolute bg-[#8c8c8c] bottom-0 right-0 rotate-45 translate-x-1/3 translate-y-2/3" />

			<span className="text-[#e6e6e6] text-lg font-semibold uppercase font-mono">
				<span className="px-1 py-0.5 bg-[#8c8c8c] rounded-sm">Quiz</span>topia!
			</span>
		</div>
	);
}
