import { SessionUser } from "@/features/auth/types/session-user";

const COLORS = [
	"bg-red-500",
	"bg-blue-500",
	"bg-green-500",
	"bg-purple-500",
	"bg-pink-500",
];

export function getUserFullName(user: SessionUser) {
	return `${user.firstName} ${user.lastName}`;
}

export function getFirstNameInitial(firstName: string) {
	return firstName.trim().charAt(0).toUpperCase();
}

export function getAvatarColor(firstName: string) {
	let hash = 0;

	for (let i = 0; i < firstName.length; i++) {
		hash = firstName.charCodeAt(i) + ((hash << 5) - hash);
	}

	return COLORS[Math.abs(hash) % COLORS.length];
}
