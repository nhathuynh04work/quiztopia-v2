"use client";

import { useEffect } from "react";
import { useDrawerStore } from "../../quiz-library/stores/use-drawer-store";

export function useSyncDrawerWithUrl() {
	const setId = useDrawerStore((s) => s.setId);

	useEffect(() => {
		const handlePopState = () => {
			const url = new URL(window.location.href);
			const hasDrawer = url.searchParams.has("drawer");
			const match = window.location.pathname.match(/^\/quiz\/([^/]+)$/);
			const idFromUrl = match ? match[1] : null;

			setId(hasDrawer ? idFromUrl : null);
		};

		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, [setId]);
}
