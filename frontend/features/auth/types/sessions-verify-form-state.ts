export type SessionsVerifyFormState = {
	defaultValues?: {
		email?: string;
	};
	errors?: {
		form?: string[];
		fieldErrors?: Record<string, string[]>;
	};
};
