import { useRef, useEffect } from "react";

export const useScrollToBottom = (
  ref: React.RefObject<HTMLDivElement | null>
) => {
  const isFirstRender = useRef(true);

  const handleScrollToBottom = () => {
    if (!ref.current) return;

    if (!!isFirstRender.current) {
      isFirstRender.current = false;
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
      });

      ref.current.style.visibility = "visible";
      return;
    }

    ref.current.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleScrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { scrollToBottom: handleScrollToBottom };
};
