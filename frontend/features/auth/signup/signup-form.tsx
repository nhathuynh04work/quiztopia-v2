"use client";

import { signupAction } from "@/features/auth/actions/signup";
import { authConstants } from "@/constants/auth";
import { useActionState } from "react";
import { SignupFormState } from "../types/signup-form-state";

const initialState: SignupFormState = {};

export default function SignupForm() {
	const [state, formAction, isPending] = useActionState<
		SignupFormState,
		FormData
	>(signupAction, initialState);

	return (
		<form action={formAction} className="flex flex-col gap-4">
			{state.errors?.form?.map((error) => (
				<p key={error}>{error}</p>
			))}
			<div className="flex flex-col gap-2">
				<label htmlFor="firstName">First name</label>
				<input
					id="firstName"
					type="text"
					name="firstName"
					placeholder="John"
					defaultValue={state.defaultValues?.firstName}
					required
					className="border"
				/>
				{state.errors?.fieldErrors?.firstName?.map((error) => (
					<p key={error}>{error}</p>
				))}
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="name">Last name</label>
				<input
					id="lastName"
					type="text"
					name="lastName"
					placeholder="Doe"
					defaultValue={state.defaultValues?.lastName}
					required
					className="border"
				/>
				{state.errors?.fieldErrors?.lastName?.map((error) => (
					<p key={error}>{error}</p>
				))}
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="email">Email</label>
				<input
					id="email"
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
					id="password"
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
				{isPending ? "Signing you up..." : "Submit"}
			</button>
		</form>
	);
}
