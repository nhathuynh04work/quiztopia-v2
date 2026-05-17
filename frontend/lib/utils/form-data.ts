export function formDataToObject(formData: FormData) {
	return Object.fromEntries(formData.entries());
}

export function formDataEntryToString(
	entry: FormDataEntryValue | null,
): string {
	return typeof entry === "string" ? entry : "";
}
