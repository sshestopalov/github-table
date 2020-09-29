import React, { useRef, useEffect } from "react";

export type Props = React.PropsWithChildren<{
  onFetchMore: () => void;
}>;

export const InfiniteScroll = ({ children, onFetchMore }: Props) => {
  const loadMoreRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    if (loadMoreRef.current) {
      const loadMoreNode = loadMoreRef.current;

      const onObserve: IntersectionObserverCallback = (entities) => {
        const [target] = entities;
        if (target.isIntersecting) {
          onFetchMore();
        }
      };
      // initialize IntersectionObserver and attaching to load more div
      const observer = new IntersectionObserver(onObserve, options);
      if (loadMoreRef.current) {
        observer.observe(loadMoreNode);
      }

      return () => {
        observer.unobserve(loadMoreNode);
      };
    }
  }, [onFetchMore]);

  return (
    <>
      {children}
      <div ref={loadMoreRef} />
    </>
  );
};
