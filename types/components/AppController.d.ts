import React from 'react';
interface AppControllerContextType {
    currentTheme: string;
    setTheme: (theme: string) => void;
    currentPose: 'sitting';
    setPose: (pose: 'sitting') => void;
    isAnimating: boolean;
    setIsAnimating: (animating: boolean) => void;
    toggleAnimation: () => void;
    isGlitching: boolean;
    triggerGlitch: () => void;
}
export declare const useAppController: () => AppControllerContextType;
export declare const AppControllerProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
