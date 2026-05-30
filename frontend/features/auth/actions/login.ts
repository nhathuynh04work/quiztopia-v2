"use server";

import { apiFetch } from "@/lib/api/api-fetch";
import { ApiClientError } from "@/lib/api/api-client-error";
import { formDataEntryToString, formDataToObject } from "@/lib/utils/form-data";
import { LoginFormState } from "@/features/auth/types/login-form-state";
import { redirect } from "next/navigation";
import { AuthTokens } from "@/features/auth/types/auth-tokens";
import { setAuthCookies } from "@/lib/auth/cookies";

export async function loginAction(
	_prevState: LoginFormState,
	formData: FormData,
): Promise<LoginFormState> {
	try {
		const tokens = await apiFetch<AuthTokens>("/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formDataToObject(formData)),
		});

		await setAuthCookies(tokens);

		redirect("/");
	} catch (error) {
		if (error instanceof ApiClientError) {
			if (error.status === 400) {
				return {
					defaultValues: {
						email: formDataEntryToString(formData.get("email")),
					},
					errors: {
						fieldErrors: error.response.error.fieldErrors,
					},
				};
			}

			if (error.status === 401) {
				return {
					defaultValues: {
						email: formDataEntryToString(formData.get("email")),
					},
					errors: {
						form: [error.response.error.message],
					},
				};
			}

			if (error.status === 409) {
			}
		}

		throw error;
	}
}
