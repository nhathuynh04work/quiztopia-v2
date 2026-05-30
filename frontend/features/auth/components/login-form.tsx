"use client";

import { useActionState } from "react";
import { loginAction } from "@/features/auth/actions/login";
import { LoginFormState } from "@/features/auth/types/login-form-state";
import { AuthField } from "./auth-field";
import { Button } from "@/components/ui/button";
import { formStyle, inputStyle, submitBtnStyle } from "../styles/form";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { FormErrors } from "./form-errors";
import { PasswordField } from "./password-field";

const initialState: LoginFormState = {};

export default function LoginForm() {
	const [state, formAction, isPending] = useActionState<
		LoginFormState,
		FormData
	>(loginAction, initialState);

	return (
		<form action={formAction} className={cn(formStyle)}>
			{state.errors?.form?.length && state.errors.form.length > 0 && (
				<FormErrors errors={state.errors.form} />
			)}

			<AuthField
				label="Email"
				htmlFor="email"
				error={state.errors?.fieldErrors?.email?.[0]}
			>
				<input
					id="email"
					type="email"
					name="email"
					placeholder="johndoe@gmail.com"
					defaultValue={state.defaultValues?.email}
					required
					className={inputStyle}
				/>
			</AuthField>

			<AuthField
				label="Password"
				htmlFor="password"
				error={state.errors?.fieldErrors?.password?.[0]}
			>
				<PasswordField
					id="password"
					type="password"
					name="password"
					required
					className={inputStyle}
				/>
			</AuthField>

			<Button type="submit" disabled={isPending} className={submitBtnStyle}>
				{isPending ? "Logging in..." : "Submit"}
			</Button>

			<p className="font-semibold text-lg mt-4">
				Don't have an account?{" "}
				<Link href="/signup" className="font-bold underline underline-offset-2">
					Sign up
				</Link>
			</p>
		</form>
	);
}
