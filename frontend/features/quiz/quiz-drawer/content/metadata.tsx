import { Description, Title } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
	id: string;
};

export function Metadata({ id }: Props) {
	return (
		<>
			<VisuallyHidden asChild>
				<Title>Details of quiz {id}</Title>
			</VisuallyHidden>
			<VisuallyHidden asChild>
				<Description>
					This is a dialog to show the details of a quiz, including questions,
					play counts, participants,...
				</Description>
			</VisuallyHidden>
		</>
	);
}
