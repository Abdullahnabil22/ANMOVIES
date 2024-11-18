import "./globals.css";
import { Inter, Audiowide } from "next/font/google";
import { LoggedProvider } from "../Context/logged";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { useLocale } from "next-intl";
import Providers from "@/Components/Providers";

const inter = Inter({ subsets: ["latin"] });
const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "AN MOVIES",
  description: "AN MOVIES",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.className} ${audiowide.className}`}
        suppressHydrationWarning
        style={{ scrollBehavior: "smooth" }}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <LoggedProvider>{children}</LoggedProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
