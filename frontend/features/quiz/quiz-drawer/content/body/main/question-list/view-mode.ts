import { ValueOf } from "@/lib/utils/value-of";
import { LayoutGrid, LayoutList, StretchHorizontal } from "lucide-react";

export const VIEW_MODE = {
	LIST: "LIST",
	GRID: "GRID",
	COMPACT: "COMPACT",
} as const;

export const VIEW_MODE_CONFIG = {
	[VIEW_MODE.LIST]: {
		Icon: StretchHorizontal,
		description: "Show items in a list",
	},
	[VIEW_MODE.GRID]: {
		Icon: LayoutGrid,
		description: "Show items in a grid",
	},
	[VIEW_MODE.COMPACT]: {
		Icon: LayoutList,
		description: "Show items in a compact list",
	},
};

export type ViewMode = ValueOf<typeof VIEW_MODE>;
