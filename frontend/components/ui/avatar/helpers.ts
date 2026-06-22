const COLORS = [
	"bg-red-500",
	"bg-kahoot-blue-light",
	"bg-green-500",
	"bg-purple-500",
	"bg-pink-500",
];

export function getInitials(name: string): string {
	const cleaned = name.trim();
	if (!cleaned) return "U";

	const parts = cleaned.split(/\s+/);
	if (parts.length >= 2) {
		const first = parts[0].charAt(0);
		const last = parts[parts.length - 1].charAt(0);
		return (first + last).toUpperCase();
	}

	return parts[0].charAt(0).toUpperCase();
}

export function getAvatarColor(name: string): string {
	let hash = 0;

	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}

	return COLORS[Math.abs(hash) % COLORS.length];
}
