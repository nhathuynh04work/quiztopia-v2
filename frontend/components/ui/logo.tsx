type Props = {
	size?: "sm" | "md" | "lg" | "xl";
};

const sizes = {
	sm: "text-sm",
	md: "text-md",
	lg: "text-lg",
	xl: "text-xl",
};

export function Logo({ size = "md" }: Props) {
	return (
		<span
			className={`${sizes[size]} uppercase font-black font-mono tracking-wide text-kahoot-purple`}>
			<span className="bg-kahoot-purple text-white inline-block px-1 rounded-md mr-0.5">quiz</span>
			topia!
		</span>
	);
}
