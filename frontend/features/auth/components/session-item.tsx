import { Cpu, Monitor, Smartphone } from "lucide-react";
import { Session } from "../types/session";
import { SessionItemActions } from "./session-item-actions";
import { format } from "date-fns";

type Props = {
	session: Session;
};

const deviceIcons = {
	mobile: Smartphone,
	desktop: Monitor,
};

function getLocation(city: string | null, country: string | null) {
	if (city && country) {
		return `${city}, ${country}`;
	}

	if (country) {
		return country;
	}

	return "Unknown location";
}

export function SessionItem({ session }: Props) {
	const { deviceType, deviceName, country, city, createdAt } = session;
	const DeviceIcon =
		deviceType && deviceType in deviceIcons
			? deviceIcons[deviceType as keyof typeof deviceIcons]
			: Cpu;

	return (
		<div className="flex items-center gap-6">
			<DeviceIcon size={30} />
			<div className="flex-1 flex flex-col gap-2">
				<p className="font-semibold text-xl">
					{deviceName ? deviceName : "Unknown device"}
				</p>
				<p className="font-semilight text-lg">
					{getLocation(city, country)} •{" "}
					{format(createdAt, "MMM d, yyyy 'at' HH:mm")}
				</p>
			</div>
			<SessionItemActions sessionId={session.id} />
		</div>
	);
}
