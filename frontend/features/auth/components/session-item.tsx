import { Cpu, Monitor, Smartphone } from "lucide-react";
import { Session } from "../types/session";
import { SessionItemActions } from "./session-item-actions";

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
	const { deviceType, deviceName, country, city } = session;
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
				<p className="font-semilight text-lg">{getLocation(city, country)}</p>
			</div>
			<SessionItemActions sessionId={session.id} />
		</div>
	);
}
