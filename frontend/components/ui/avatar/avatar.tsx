import { SessionUser } from "@/features/auth/types/session-user";
import Image from "next/image";
import {
	getAvatarColor,
	getFirstNameInitial,
	getUserFullName,
} from "./avatar.util";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

type Props = {
	user: SessionUser;
	size?: AvatarSize;
};

const avatarSizes = {
	sm: {
		className: "w-10 h-10",
		pixels: 40,
		text: "text-xl",
	},
	md: {
		className: "w-12 h-12",
		pixels: 48,
		text: "text-2xl",
	},
	lg: {
		className: "w-16 h-16",
		pixels: 64,
		text: "text-3xl",
	},
	xl: {
		className: "w-24 h-24",
		pixels: 96,
		text: "text-5xl",
	},
};

export function Avatar({ user, size = "md" }: Props) {
	if (user.avatarUrl) {
		const avatarSize = avatarSizes[size];

		return (
			<Image
				src={user.avatarUrl}
				alt={`${getUserFullName(user)}'s avatar`}
				width={avatarSize.pixels}
				height={avatarSize.pixels}
				className={`rounded-full ${avatarSize.className} object-cover`}
			/>
		);
	}

	return (
		<AvatarFallback
			size={size}
			initials={getFirstNameInitial(user.firstName)}
			color={getAvatarColor(user.firstName)}
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
	const avatarSize = avatarSizes[size];

	return (
		<div
			className={`${avatarSize.className} ${avatarSize.text} ${color} rounded-full flex items-center justify-center text-white font-semibold select-none`}>
			{initials}
		</div>
	);
}
