"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BadgeQuestionMark, LibraryBig, Presentation } from "lucide-react";

const items = [
	{
		title: "Quiz",
		description: "Short trivia questions",
		icon: BadgeQuestionMark,
	},
	{
		title: "Slide",
		description: "Represent with your audience",
		icon: Presentation,
	},
	{
		title: "Course",
		description: "Collection of quizzes, videos and documents",
		icon: LibraryBig,
	},
];

export function CreateMenu() {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className="bg-blue-500 hover:bg-blue-600 py-3 px-8 rounded-sm text-lg text-white font-bold cursor-pointer">
				Create
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					align="end"
					sideOffset={20}
					className="w-sm bg-white shadow-sm font-medium">
					{items.map((item, index) => (
						<DropdownMenu.Item
							key={item.title}
							className={`outline-none flex items-center h-24 py-4 px-6 hover:bg-gray-100 cursor-pointer ${index < items.length && "border-b border-gray-100"}`}>
							<div className="bg-gray-100 p-4 rounded-xl">
								<item.icon className="text-kahoot-purple" />
							</div>
							<div className="flex-1 flex flex-col p-4 justify-center">
								<span className="font-bold">{item.title}</span>
								<span className="font-normal text-sm">{item.description}</span>
							</div>
						</DropdownMenu.Item>
					))}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
