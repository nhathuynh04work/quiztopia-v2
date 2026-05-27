export type SignupFormState = {
	defaultValues?: {
		email?: string;
		firstName?: string;
		lastName?: string;
	};
	errors?: {
		form?: string[];
		fieldErrors?: Record<string, string[]>;
	};
};
