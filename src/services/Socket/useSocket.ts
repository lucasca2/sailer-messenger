import { useEffect } from "react";
import { Socket } from "./Socket";

type UseSocketProps = {
  url: string;
};

const useSocket = (props: UseSocketProps) => {
  const { url } = props || {};
  const socket = new Socket();

  useEffect(() => {
    if (url) {
      socket.connect(url);

      return () => {
        socket.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { socket };
};

export default useSocket;
