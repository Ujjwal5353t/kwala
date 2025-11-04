import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { StarknetProvider } from "@/components/providers/Starknet"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div vaul-drawer-wrapper="" className="bg-background">
          <StarknetProvider>
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <SidebarInset>
                {children}
              </SidebarInset>
            </SidebarProvider>
          </StarknetProvider>
        </div>
      </body>
    </html>
  );
}
