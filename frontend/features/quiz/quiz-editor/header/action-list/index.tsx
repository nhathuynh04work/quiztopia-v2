import { ExitAction } from "./exit-action";
import { SaveAction } from "./save-action";

export function ActionList() {
	return (
		<div className="flex items-center gap-2">
			<ExitAction />
			<SaveAction />
		</div>
	);
}
