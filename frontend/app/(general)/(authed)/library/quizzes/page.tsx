import { redirect } from "next/navigation";

export default async function Quizzes() {
	return redirect("/library/quizzes/all");
}
