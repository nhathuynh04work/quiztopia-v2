export function isActivePath(
	pathname: string,
	href: string,
	{ exact = true }: { exact: boolean },
) {
	if (exact) {
		return pathname === href;
	}

	return pathname.startsWith(href);
}
