type Props = {
	size?: "sm" | "md" | "lg" | "xl";
};

const special = `text-indigo-600`;

const sizes = {
	sm: "text-sm",
	md: "text-md",
	lg: "text-lg",
	xl: "text-xl",
};

export function Logo({ size = "md" }: Props) {
	return (
		<span
			className={`${sizes[size]} uppercase font-black font-mono tracking-wide`}>
			<span className={`${special}`}>Q</span>
			uiztopia
			<span className={`${special}`}>!</span>
		</span>
	);
}
