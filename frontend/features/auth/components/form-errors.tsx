type Props = {
	errors: string[];
};

export function FormErrors({ errors }: Props) {
	return (
		<div className="border border-red-500 bg-red-50 p-4 rounded-sm">
			{errors.map((error) => (
				<p key={error} className="text-red-700 front-semibold text-lg">
					{error}
				</p>
			))}
		</div>
	);
}
