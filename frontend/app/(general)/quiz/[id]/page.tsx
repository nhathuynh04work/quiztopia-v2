type Props = {
	params: Promise<{ id: string }>;
};

export default async function QuizDetails({ params }: Props) {
	const { id } = await params;

	return <div>{id}</div>;
}
