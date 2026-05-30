import { AuthShell } from "@/features/auth/components/auth-shell";
import SignupForm from "@/features/auth/components/signup-form";

export default function Signup() {
	return (
		<AuthShell heroImageUrl="/signup-hero.jpg" formName="Signup">
			<SignupForm />
		</AuthShell>
	);
}
