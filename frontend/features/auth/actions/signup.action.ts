"use server";

import { apiFetch } from "@/lib/api/api-fetch";
import { ApiClientError } from "@/lib/api/api-client-error";
import { formDataEntryToString, formDataToObject } from "@/lib/utils/form-data";
import { SignupFormState } from "@/features/auth/types/signup-form-state";

export async function signupAction(
	_prevState: SignupFormState,
	formData: FormData,
): Promise<SignupFormState> {
	try {
		await apiFetch("/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formDataToObject(formData)),
		});

		return {};
	} catch (error) {
		if (error instanceof ApiClientError) {
			return {
				defaultValues: {
					name: formDataEntryToString(formData.get("name")),
					email: formDataEntryToString(formData.get("email")),
				},
				errors: {
					form: [error.response.error.message],
					fieldErrors: error.response.error.fieldErrors,
				},
			};
		}

		throw error;
	}
}
