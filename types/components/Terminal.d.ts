import React from "react";
interface TerminalProps {
    onThemeChange: (theme: string) => void;
    onPoseChange: (pose: "sitting") => void;
    onAnimationToggle: () => void;
    onGlitch: () => void;
    currentTheme: string;
    currentPose: "sitting";
    isAnimating: boolean;
}
declare const Terminal: React.FC<TerminalProps>;
export default Terminal;
