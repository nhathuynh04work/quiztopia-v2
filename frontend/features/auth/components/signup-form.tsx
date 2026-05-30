"use client";

import { signupAction } from "@/features/auth/actions/signup";
import { authConstants } from "@/constants/auth";
import { useActionState } from "react";
import { SignupFormState } from "../types/signup-form-state";
import { AuthField } from "./auth-field";
import { Button } from "@/components/ui/button";
import { formStyle, inputStyle, submitBtnStyle } from "../styles/form";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { FormErrors } from "./form-errors";
import { PasswordField } from "./password-field";

const initialState: SignupFormState = {};

export default function SignupForm() {
	const [state, formAction, isPending] = useActionState<
		SignupFormState,
		FormData
	>(signupAction, initialState);

	return (
		<form action={formAction} className={cn(formStyle)}>
			{state.errors?.form?.length && state.errors.form.length > 0 && (
				<FormErrors errors={state.errors.form} />
			)}

			<div className="flex gap-6 items-start mt-6">
				<div className="flex-1">
					<AuthField
						label="First name"
						htmlFor="firstName"
						error={state.errors?.fieldErrors?.firstName?.[0]}
					>
						<input
							id="firstName"
							type="text"
							name="firstName"
							placeholder="John"
							defaultValue={state.defaultValues?.firstName}
							required
							className={inputStyle}
						/>
					</AuthField>
				</div>
				<div className="flex-1">
					<AuthField
						label="Last name"
						htmlFor="lastName"
						error={state.errors?.fieldErrors?.lastName?.[0]}
					>
						<input
							id="lastName"
							type="text"
							name="lastName"
							placeholder="Doe"
							defaultValue={state.defaultValues?.lastName}
							required
							className={inputStyle}
						/>
					</AuthField>
				</div>
			</div>

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
					minLength={authConstants.PASSWORD_MIN_LENGTH}
					required
					className={inputStyle}
				/>
			</AuthField>

			<Button type="submit" disabled={isPending} className={submitBtnStyle}>
				{isPending ? "Signing you up..." : "Submit"}
			</Button>

			<p className="font-semibold text-lg mt-4">
				Already have an account?{" "}
				<Link href="/login" className="font-bold underline underline-offset-2">
					Log in
				</Link>
			</p>
		</form>
	);
}
