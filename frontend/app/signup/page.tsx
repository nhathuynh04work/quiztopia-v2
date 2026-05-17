import SignupForm from "@/features/auth/signup/signup-form";

export default function Signup() {
	return (
		<div className="py-8 flex flex-col gap-4 items-center">
			<h1 className="text-3xl font-bold text-center">Signup</h1>

			<SignupForm />
		</div>
	);
}
