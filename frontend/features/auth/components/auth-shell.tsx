import Link from "next/link";
import { ReactNode } from "react";
import { Logo } from "../../../components/ui/logo";

type Props = {
	heroImageUrl: string;
	formName: string;
	children: ReactNode;
};

export function AuthShell({ heroImageUrl, formName, children }: Props) {
	return (
		<div className="flex h-screen overflow-hidden">
			<div
				className="h-full flex-1 bg-cover bg-center p-8 relative z-10"
				style={{ backgroundImage: `url("${heroImageUrl}")` }}
			>
				<Link href="/">
					<Logo size="xl" />
				</Link>
			</div>

			<div className="h-full flex-1">
				<div className="h-full flex items-center justify-center bg-gray-50/60 relative">
					<div className="w-3xl h-192 absolute bg-gray-200/60 rounded-full bottom-0 left-0 -translate-x-1/3 - translate-y-1/3" />
					<div className="w-lg h-128 absolute bg-gray-200/60 top-0 right-0 translate-x-1/3 translate-y-1/3 rotate-40" />

					<div className="p-8 flex flex-col gap-4 items-center bg-white shadow-sm relative z-10">
						<h1 className="text-3xl font-bold w-full">{formName}</h1>

						<div className="min-w-2xl mt-6">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
