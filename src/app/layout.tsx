import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Blogic",
    default: "Blogic",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}