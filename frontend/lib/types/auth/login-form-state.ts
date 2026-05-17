export type LoginFormState = {
	defaultValues?: {
		email?: string;
	};
	errors?: {
		form?: string[];
		fieldErrors?: Record<string, string[]>;
	};
};
