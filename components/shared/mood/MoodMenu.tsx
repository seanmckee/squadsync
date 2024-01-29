"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect } from "react";
import { moods } from "@/lib/Moods";
import MoodIcon from "./MoodIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMood, setMood } from "@/lib/actions/user.actions";

// ... (previous imports)

const MoodMenu = () => {
  const selectMood = async (mood: any, index: number) => {
    try {
      await setMood(mood);
    } catch (error) {
      console.error(error);
    }
  };

  let [currentMoodIndex, setCurrentMoodIndex] = React.useState<number | null>(
    null
  );

  useEffect(() => {
    const getCurrentMood = async () => {
      try {
        const mood = await getMood();
        const moodIndex = moods.findIndex((m) => m.mood === mood);
        setCurrentMoodIndex(moodIndex);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentMood();
  }, []);

  return (
    <div className="text-white shadow-lg rounded-full bg-blue-600 hover:bg-blue-500 p-8 h-10 w-10 flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {currentMoodIndex !== null && (
            <MoodIcon icon={moods[currentMoodIndex].icon} size="2em" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-center max-h-full overflow-y-auto">
          {moods.map((mood, index) => (
            <div
              onClick={() => {
                setMood(mood.mood);
                setCurrentMoodIndex(index);
              }}
              className="p-1"
              key={index}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <DropdownMenuItem>
                      <MoodIcon icon={mood.icon} size="2em" />
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent>{mood.mood}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MoodMenu;
