import { LayoutGrid, LayoutList } from "lucide-react";

export const VIEW_MODE = {
	CARD: "CARD",
	LIST: "LIST",
} as const;

export const VIEW_MODE_CONFIG = {
	[VIEW_MODE.CARD]: {
		Icon: LayoutGrid,
	},
	[VIEW_MODE.LIST]: {
		Icon: LayoutList,
	},
};
