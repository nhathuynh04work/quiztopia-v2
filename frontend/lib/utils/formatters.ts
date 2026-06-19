import { formatDuration, intervalToDuration } from "date-fns";

// x minute y seconds
export function formatTimeLimit(ms: number) {
	return formatDuration(
		intervalToDuration({
			start: 0,
			end: ms,
		}),
	);
}
