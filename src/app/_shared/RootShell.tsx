import "@/app/globals.css";
import { poppins } from "@/app/ui/fonts";
import ClientLayoutWrapper from "@/app/ClientLayout";

export default function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <body className={`${poppins.className} antialiased bg-black text-white`}>
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
    </body>
  );
}

