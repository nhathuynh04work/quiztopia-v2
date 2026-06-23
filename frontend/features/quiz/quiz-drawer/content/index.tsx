import { DialogContent } from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { Metadata } from "./metadata";
import { Header } from "./header";
import { useQuizForDrawer } from "../hooks/use-quiz-for-drawer";
import { Body } from "./body";
import { Loading } from "./state/loading";
import { Error } from "./state/error";

type Props = {
	id: string;
};

export function Content({ id }: Props) {
	const { data, isPending, isError, isSuccess, error, refetch } =
		useQuizForDrawer(id);

	return (
		<DialogContent asChild forceMount>
			<motion.div
				initial={{ y: "100%" }}
				animate={{ y: 0 }}
				exit={{ y: "100%" }}
				transition={{ duration: 0.3, ease: "easeOut" }}
				className="absolute inset-0 z-50 bg-white rounded-t-2xl flex flex-col outline-none overflow-hidden"
			>
				<Metadata id={id} />

				{isPending && <Loading />}

				{isError && <Error error={error} retry={refetch} />}

				{isSuccess && (
					<>
						<Header quiz={data.quiz} />
						<Body quiz={data.quiz} />
					</>
				)}
			</motion.div>
		</DialogContent>
	);
}
