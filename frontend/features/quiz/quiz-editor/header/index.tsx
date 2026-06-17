import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { SettingDialog } from "./setting-dialog";
import { SavingIndicator } from "./saving-indicator";
import { ActionList } from "./action-list";

export function Header() {
	return (
		<header className="flex items-center justify-between px-6 shadow-sm">
			<div className="flex items-center py-2">
				<Link href="/" className="mr-8">
					<Logo size="lg" />
				</Link>

				<SettingDialog />

				<div className="ml-6">
					<SavingIndicator />
				</div>
			</div>

			<div>
				<ActionList />
			</div>
		</header>
	);
}
