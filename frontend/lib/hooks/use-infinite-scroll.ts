import { useEffect, useRef } from "react";

export function useInfiniteScroll(
	loadMoreFn: () => void,
	shouldLoadMore: boolean,
) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && shouldLoadMore) {
					loadMoreFn();
				}
			},
			{
				threshold: 0.1,
			},
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [shouldLoadMore, loadMoreFn]);

	return ref;
}
