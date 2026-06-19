export default async function FolderDetails({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <div>folder {id} details</div>;
}
