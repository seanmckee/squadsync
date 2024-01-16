import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Boxes } from "lucide-react";

export default function Home() {
  return (
    // <main className="flex flex-col gap-y-10 items-center justify-center h-screen">
    //   <div className="animate-bounce duration-3000">
    //     <Boxes size={150} />
    //   </div>

    //   <div className="flex flex-col lg:flex-row sm:w-[95%] max-w-[75%] gap-5 items-center">
    //     <div className="flex-1 text-right text-9xl font-bold">
    //       Squad <br /> Sync
    //     </div>
    //     <div className="flex-1 text-3xl flex flex-col items-start gap-20">
    //       <p>Stay Connected, Sync Up, Squad Up!</p>
    //       <p>Where Moods Meet Moments and Friendship Finds its Rhythm</p>
    //     </div>
    //   </div>
    //   <Button className="text-white text-lg py-7 rounded-2xl" size="lg">
    //     Get Started!
    //   </Button>
    // </main>
    <main className="flex flex-col gap-y-10 items-center justify-center h-screen text-center">
      <div className="animate-bounce duration-3000">
        <Boxes size={150} />
      </div>

      <div className="flex flex-col  sm:w-[95%] max-w-[75%] gap-5 items-center">
        <div className="flex-1  text-9xl font-bold">
          Squad <br /> Sync
        </div>
        <div className="flex-1 text-3xl flex flex-col items-start">
          <p>Stay Connected, Sync Up, Squad Up!</p>
        </div>
        <p className="text-lg">
          Where Moods Meet Moments and Friendship Finds its Rhythm
        </p>
      </div>

      <Button className="text-white text-lg py-7 rounded-2xl" size="lg">
        Get Started!
      </Button>
    </main>
  );
}
