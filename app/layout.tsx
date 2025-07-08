
import type { Metadata } from "next";
import React, { PropsWithChildren } from "react";

import "./global.css";
import Header from "./components/Header";

export const metadata: Metadata = {
   title: "M3terScan",
   description: "The M3tering Explorer",
};

export default function RootLayout({ children }: PropsWithChildren) {

   return (
      <html lang="en">
         <body>
            <Header />
            <main className="scroll-mt-16 md:scroll-mt-20 lg:scroll-mt-24">
               {children}
            </main>
         </body>
      </html>
   );
}
