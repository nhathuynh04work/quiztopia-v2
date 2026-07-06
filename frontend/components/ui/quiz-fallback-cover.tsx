export function QuizFallbackCover() {
	return (
		<div className="w-full flex justify-center items-center aspect-16/11 relative bg-[#b6b6b6] overflow-hidden @container">
			<div className="w-2/3 aspect-square absolute bg-[#8c8c8c] rounded-full top-0 left-0 -translate-y-1/2 -translate-x-1/2" />
			<div className="w-1/2 aspect-square absolute bg-[#8c8c8c] bottom-0 right-0 rotate-45 translate-x-1/3 translate-y-2/3" />

			<span className="text-[#e6e6e6] text-[clamp(8px,9.5cqi,34px)] font-semibold uppercase font-mono select-none">
				<span className="px-[clamp(2px,1.2cqi,10px)] py-[clamp(1px,0.4cqi,5px)] bg-[#8c8c8c] rounded-[clamp(3.5px,1.1cqi,11px)] mr-[clamp(1.5px,0.4cqi,4px)]">Quiz</span>topia!
			</span>
		</div>
	);
}
