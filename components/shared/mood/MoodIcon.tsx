import React, { ComponentType, ReactElement } from "react";
import { IconContext } from "react-icons";

interface MoodIconProps {
  icon: ComponentType;
  size?: string;
}

const MoodIcon: React.FC<MoodIconProps> = ({ icon, size = "1.5em" }) => {
  return (
    <IconContext.Provider value={{ size }}>
      {React.createElement(icon)}
    </IconContext.Provider>
  );
};

export default MoodIcon;
