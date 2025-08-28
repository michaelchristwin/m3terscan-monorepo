
// import type { Metadata } from "next";
import React, { PropsWithChildren } from "react";

import "./global.css";

// export const metadata: Metadata = {
//    title: "M3terScan",
//    description: "The M3tering Explorer",
// };

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="en">
         <body>
            { children }
         </body>
      </html>
   );
}
