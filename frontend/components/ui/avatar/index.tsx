import Image from "next/image";
import { getAvatarColor, getInitials } from "./helpers";
import { SIZES } from "./sizes";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

type Props = {
	url: string | null;
	name: string;
	size?: AvatarSize;
};

export function Avatar({ url, name, size = "md" }: Props) {
	if (url) {
		const avatarSize = SIZES[size];

		return (
			<Image
				src={url}
				alt={`${name}'s avatar`}
				width={avatarSize.pixels}
				height={avatarSize.pixels}
				className={`rounded-full ${avatarSize.className} object-cover`}
			/>
		);
	}

	return (
		<AvatarFallback
			size={size}
			initials={getInitials(name)}
			color={getAvatarColor(name)}
		/>
	);
}

function AvatarFallback({
	size,
	initials,
	color,
}: {
	size: AvatarSize;
	initials: string;
	color: string;
}) {
	const avatarSize = SIZES[size];

	return (
		<div
			className={`${avatarSize.className} ${avatarSize.text} ${color} rounded-full flex items-center justify-center text-white font-semibold select-none`}
		>
			{initials}
		</div>
	);
}
