"use server";

import { cookies } from "next/headers";
import { NICKNAME_KEY } from "./@keys";

export const saveNickname = async (nickname: string): Promise<void> => {
  const cookiesStore = await cookies();

  cookiesStore.set(NICKNAME_KEY, nickname);
};
