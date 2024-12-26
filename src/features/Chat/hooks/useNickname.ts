"use client"
import { useEffect, useState } from "react";
import { getNickname } from "../actions/getNickname";

export const useNickname = () => {
  const [nickname, setNickname] = useState("");

  const fetchNickname = async () => {
    const storagedNickname = await getNickname();

    setNickname(storagedNickname || "");
  };

  useEffect(() => {
    fetchNickname();
  });

  return { nickname };
};
