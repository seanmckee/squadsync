import Sidebar from "@/components/shared/Sidebar";
import MoodMenu from "@/components/shared/mood/MoodMenu";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <SignedIn>
        <Sidebar />
        <div className="fixed bottom-10 right-10">
          <MoodMenu />
        </div>

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
