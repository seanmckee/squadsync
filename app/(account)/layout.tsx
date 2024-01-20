import Sidebar from "@/components/shared/Sidebar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <SignedIn>
        <Sidebar />
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
