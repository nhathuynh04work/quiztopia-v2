export type Action = {
	title: string;
	href: string;
};

export type DialogActions = {
	primary: Action;
	secondary: Action;
	tertiary?: Action;
};
