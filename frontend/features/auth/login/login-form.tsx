"use client";

import { authConstants } from "@/constants/auth.constant";
import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth/login.action";
import { LoginFormState } from "@/lib/types/auth/login-form-state";

const initialState: LoginFormState = {};

export default function LoginForm() {
	const [state, formAction, isPending] = useActionState<
		LoginFormState,
		FormData
	>(loginAction, initialState);

	return (
		<form action={formAction} className="flex flex-col gap-4">
			{state.errors?.form?.map((error) => (
				<p key={error}>{error}</p>
			))}

			<div className="flex flex-col gap-2">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					placeholder="johndoe@gmail.com"
					defaultValue={state.defaultValues?.email}
					required
					className="border"
				/>
				{state.errors?.fieldErrors?.email?.map((error) => (
					<p key={error}>{error}</p>
				))}
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					minLength={authConstants.PASSWORD_MIN_LENGTH}
					required
					className="border"
				/>
				{state.errors?.fieldErrors?.password?.map((error) => (
					<p key={error}>{error}</p>
				))}
			</div>

			<button type="submit" disabled={isPending} className="border mt-4">
				{isPending ? "Logging in..." : "Submit"}
			</button>
		</form>
	);
}
