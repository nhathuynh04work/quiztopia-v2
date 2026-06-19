import { ReactNode } from "react";

export function SettingCard({ children }: { children: ReactNode }) {
	return (
		<div className="w-full bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] p-8 rounded-md">{children}</div>
	);
}
