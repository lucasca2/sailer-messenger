"use server";

import { cookies } from "next/headers";
import { NICKNAME_KEY } from "./@keys";

export const getNickname = async (): Promise<string | undefined> => {
  const cookiesStore = await cookies();

  const storedTheme = cookiesStore.get(NICKNAME_KEY);

  return storedTheme?.value;
};
