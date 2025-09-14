import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { ConvexClientProvider } from "@/providers/convex-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "The Smart Group",
  description: "The Smart Group — Strategy, Communication, Impact",
  icons: {
    icon: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQlsDvobKBmqbis4MSfAvgpRXu7CVQ09Wc51xO",
    shortcut: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQlsDvobKBmqbis4MSfAvgpRXu7CVQ09Wc51xO",
    apple: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQlsDvobKBmqbis4MSfAvgpRXu7CVQ09Wc51xO"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQlsDvobKBmqbis4MSfAvgpRXu7CVQ09Wc51xO" />
        <link rel="apple-touch-icon" href="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQlsDvobKBmqbis4MSfAvgpRXu7CVQ09Wc51xO" />
        <meta name="theme-color" content="#000000" />
        <title>The Smart Group</title>
      </head>
      <body className="antialiased">
        <ConvexClientProvider>
          <AuthProvider>
            <ErrorReporter />
            <Script
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
              strategy="afterInteractive"
              data-target-origin="*"
              data-message-type="ROUTE_CHANGE"
              data-include-search-params="true"
              data-only-in-iframe="true"
              data-debug="true"
              data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
            />
            {children}
            <VisualEditsMessenger />
            <Toaster />
          </AuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}