"use server";

import { apiFetch } from "@/lib/api/api-fetch";
import { ApiClientError } from "@/lib/api/api-client-error";
import { formDataEntryToString, formDataToObject } from "@/lib/utils/form-data";
import { redirect } from "next/navigation";
import { SessionsVerifyFormState } from "../types/sessions-verify-form-state";
import { cookies } from "next/headers";
import { authConstants } from "@/constants/auth";
import { authConfig } from "@/config/auth.config";

export async function getSessionManagementTokenAction(
	_prevState: SessionsVerifyFormState,
	formData: FormData,
): Promise<SessionsVerifyFormState> {
	try {
		const { sessionManagementToken } = await apiFetch<{
			sessionManagementToken: string;
		}>("/auth/session-management-token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formDataToObject(formData)),
		});

		(await cookies()).set(
			authConstants.COOKIE_NAMES.SESSION_MANAGEMENT_TOKEN,
			sessionManagementToken,
			{
				...authConfig.cookie,
				maxAge: authConfig.sessionManagementExpiresMs,
			},
		);

		redirect("/sessions");
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
		}

		throw error;
	}
}
