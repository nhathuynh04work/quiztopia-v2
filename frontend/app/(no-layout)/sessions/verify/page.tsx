import { Logo } from "@/components/ui/logo";
import { SessionsVerifyForm } from "@/features/auth/components/forms/sessions-verify-form";
import Link from "next/link";

export default function SessionsVerify() {
	return (
		<div className="h-screen flex items-center justify-center bg-gray-50/60 relative p-8">
			<div className="w-3xl h-192 absolute bg-gray-200/60 rounded-full bottom-0 left-0 -translate-x-1/3 - translate-y-1/3" />
			<div className="w-lg h-128 absolute bg-gray-200/60 top-0 right-0 translate-x-1/3 translate-y-1/3 rotate-40" />

			<Link href="/" className="absolute top-8 left-8">
				<Logo size="xl" />
			</Link>

			<div className="min-w-xl w-3xl flex flex-col gap-10 p-8 shadow-sm bg-white">
				<h1 className="text-3xl font-bold w-full">Verify</h1>
				<SessionsVerifyForm />
			</div>
		</div>
	);
}
