import { ApiClientError } from "@/lib/api/api-client-error";
import { Forbidden } from "./forbidden";
import { NotFound } from "./not-found";
import { GeneralError } from "./general";
import { NavActions } from "../../header/nav-actions";

type Props = {
	error: unknown;
	retry: () => void;
};

export function Error({ error, retry }: Props) {
	const status = error instanceof ApiClientError ? error.status : null;

	return (
		<div className="flex-1 flex flex-col min-h-0 bg-white">
			<header className="w-full flex justify-end px-6 py-4 border-b border-gray-200">
				<NavActions />
			</header>
			<div className="flex-1 flex flex-col min-h-0 justify-center">
				{status === 404 ? (
					<NotFound />
				) : status === 403 ? (
					<Forbidden />
				) : (
					<GeneralError retry={retry} />
				)}
			</div>
		</div>
	);
}
