"use server";

import { apiFetch } from "@/lib/api/api-fetch";
import { ApiClientError } from "@/lib/api/api-client-error";
import { formDataEntryToString, formDataToObject } from "@/lib/utils/form-data";
import { SignupFormState } from "@/features/auth/types/signup-form-state";
import { redirect } from "next/navigation";

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

		redirect("/login");
	} catch (error) {
		if (error instanceof ApiClientError) {
			if (error.status == 400) {
				return {
					defaultValues: {
						firstName: formDataEntryToString(formData.get("firstName")),
						lastName: formDataEntryToString(formData.get("lastName")),
						email: formDataEntryToString(formData.get("email")),
					},
					errors: {
						fieldErrors: error.response.error.fieldErrors,
					},
				};
			}

			if (error.status == 422) {
				return {
					defaultValues: {
						firstName: formDataEntryToString(formData.get("firstName")),
						lastName: formDataEntryToString(formData.get("lastName")),
						email: formDataEntryToString(formData.get("email")),
					},
					errors: {
						form: [error.response.error.message],
					},
				};
			}
		}

		throw error;
	}
}
