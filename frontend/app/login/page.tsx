import LoginForm from "@/features/auth/login/login-form";

export default function Login() {
	return (
		<div className="py-8 flex flex-col gap-4 items-center">
			<h1 className="text-3xl font-bold text-center">Login</h1>

			<LoginForm />
		</div>
	);
}
