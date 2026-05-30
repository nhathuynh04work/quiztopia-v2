import { AuthShell } from "@/features/auth/components/auth-shell";
import LoginForm from "@/features/auth/components/login-form";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { redirect } from "next/navigation";

export default async function Login() {
	const user = await getCurrentUser();

	if (user) {
		redirect("/");
	}

	return (
		<AuthShell heroImageUrl="/login-hero.jpg" formName="Login">
			<LoginForm />
		</AuthShell>
	);
}
