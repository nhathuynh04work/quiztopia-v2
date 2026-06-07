import { Logo } from "@/components/ui/logo";
import { SessionsList } from "@/features/auth/components/sessions-list";
import { getActiveSessions } from "@/lib/auth/get-active-sessions";
import Link from "next/link";

export default async function SessionManagement() {
	const sessions = await getActiveSessions();

	return (
		<div className="h-screen flex items-center justify-center bg-gray-50/60 relative p-8">
			<div className="w-3xl h-192 absolute bg-gray-200/60 rounded-full bottom-0 left-0 -translate-x-1/3 - translate-y-1/3" />
			<div className="w-lg h-128 absolute bg-gray-200/60 top-0 right-0 translate-x-1/3 translate-y-1/3 rotate-40" />

			<Link href="/" className="absolute top-8 left-8">
				<Logo size="xl" />
			</Link>

			<div className="min-w-xl w-3xl flex flex-col gap-10 p-8 shadow-sm bg-white">
				<h1 className="text-3xl font-bold w-full">Your sessions</h1>
				{sessions.length > 0 ? (
					<SessionsList sessions={sessions} />
				) : (
					<p className="border border-blue-500 bg-blue-50 p-4 rounded-sm text-blue-700 font-medium text-lg">
						You have not logged in anywhere.{" "}
						<Link href="/" className="font-bold underline">
							Back to home
						</Link>
					</p>
				)}
			</div>
		</div>
	);
}
