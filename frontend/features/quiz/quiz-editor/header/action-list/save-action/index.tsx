import { Button } from "@/components/button";
import { useQuizEditorStore } from "../../../hooks/use-quiz-editor-store";
import * as Dialog from "@radix-ui/react-dialog";
import { usePublishQuiz } from "../../../hooks/mutations/use-publish-quiz";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ValidationError } from "./validation-error";
import { ValidResult } from "./valid-result";
import { Loading } from "./loading";

export function SaveAction() {
	const quiz = useQuizEditorStore((s) => s.quiz);
	const isPersisted = useQuizEditorStore((s) => s.isPersisted);
	const {
		mutate: publish,
		isPending,
		isSuccess,
		data,
	} = usePublishQuiz(quiz.id);

	if (!isPersisted) {
		return (
			<Button
				disabled
				className="py-3 px-6 bg-gray-400 hover:bg-gray-500 font-bold text-lg rounded-sm text-white cursor-not-allowed"
			>
				Save
			</Button>
		);
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button
					onClick={() => publish()}
					className="py-3 px-6 bg-kahoot-blue-light hover:bg-kahoot-blue-dark font-bold text-lg rounded-sm text-white"
				>
					Save
				</Button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="bg-overlay fixed inset-0" />
				<Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
					<VisuallyHidden asChild>
						<Dialog.Description>
							Showing the result of validating and publishing the current quiz
						</Dialog.Description>
					</VisuallyHidden>
					<VisuallyHidden asChild>
						<Dialog.Title>Publishing quiz result</Dialog.Title>
					</VisuallyHidden>

					{isPending && <Loading />}
					{isSuccess && !data.errors && <ValidResult />}
					{isSuccess && data.errors && (
						<ValidationError errors={data.errors} retry={publish} />
					)}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
