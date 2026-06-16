import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { SettingDialog } from "./setting-dialog";
import { Button } from "@/components/ui/button";
import { SavingIndicator } from "./saving-indicator";

export function Header() {
	return (
		<header className="flex justify-between px-6 shadow-sm">
			<div className="flex items-center py-2">
				<Link href="/" className="mr-8">
					<Logo size="lg" />
				</Link>

				<SettingDialog />

				<div className="ml-6">
					<SavingIndicator />
				</div>
			</div>

			<div className="flex items-center gap-2">
				<Button className="py-3 px-6 bg-gray-200 hover:bg-gray-300 font-bold text-lg rounded-sm">
					Exit
				</Button>
				<Button className="py-3 px-6 bg-kahoot-blue-light hover:bg-kahoot-blue-dark font-bold text-lg rounded-sm text-white">
					Save
				</Button>
			</div>
		</header>
	);
}
