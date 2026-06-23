import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
};

export function ShowAnswerToggle({ show, setShow }: Props) {
	const text = show ? "Hide answers" : "Show answers";
	const Icon = show ? EyeOff : Eye;

	return (
		<Button
			onClick={() => setShow((s) => !s)}
			className="flex items-center gap-2 py-4 px-4 hover:bg-gray-100 text-kahoot-gray rounded-md"
		>
			<Icon size={20} className="stroke-[1.5] " />
			<span className="text-lg font-medium">{text}</span>
		</Button>
	);
}
