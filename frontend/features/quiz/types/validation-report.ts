export type ValidationErrors = {
	title?: string;
	questionsGlobal?: string;
	questions: Record<string, string[]>;
};

export type ValidationReport = {
	isValid: boolean;
	errors: ValidationErrors | null;
};
