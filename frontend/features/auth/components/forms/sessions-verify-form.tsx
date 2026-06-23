"use client";

import { useActionState } from "react";
import { AuthField } from "./auth-field";
import { Button } from "@/components/button";
import { formStyle, inputStyle, submitBtnStyle } from "../../styles/form";
import { cn } from "@/lib/utils/cn";
import { FormErrors } from "./form-errors";
import { PasswordField } from "./password-field";
import { SessionsVerifyFormState } from "../../types/sessions-verify-form-state";
import { getSessionManagementTokenAction } from "../../actions/sessions";

const initialState: SessionsVerifyFormState = {};

export function SessionsVerifyForm() {
	const [state, formAction, isPending] = useActionState<
		SessionsVerifyFormState,
		FormData
	>(getSessionManagementTokenAction, initialState);

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
		</form>
	);
}
