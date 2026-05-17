export type SignupFormState = {
	defaultValues?: {
		email?: string;
		name?: string;
	};
	errors?: {
		form?: string[];
		fieldErrors?: Record<string, string[]>;
	};
};
