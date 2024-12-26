import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/global.scss";
import { ToastProvider } from "@/components/Toast/hooks/useToast";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--default-font-family",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sailer Messenger",
  description: "Messenger to you and your friends talk to each other",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.variable} light`} lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
