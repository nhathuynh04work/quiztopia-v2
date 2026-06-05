import { LibrarySidebar } from "@/components/layouts/library-sidebar/library-sidebar";
import { ReactNode } from "react";

export default function LibraryPageLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="flex h-full">
			<div className="bg-white h-full">
				<LibrarySidebar />
			</div>
			<div>{children}</div>
		</div>
	);
}
