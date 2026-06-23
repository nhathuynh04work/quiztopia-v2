import { Avatar } from "@/components/ui/avatar";

type Props = {
	author: { name: string; avatar: string | null };
};

export function AuthorInfo({ author }: Props) {
	return (
		<div className="flex items-center gap-3">
			<Avatar url={author.avatar} name={author.name} />
			<span className="text-lg font-medium text-black-soft">{author.name}</span>
		</div>
	);
}
