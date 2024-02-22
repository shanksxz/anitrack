import { createContext, useContext, useEffect, useState } from "react";

type modeType = "light" | "dark" | "ani";
type accent = "accent-blue" | "accent-green" | "accent-purple" | "accent-orange";

type ThemeContextType = {
    mode: modeType;
    accent: accent;
    setMode: (mode: modeType) => void;
    setAccent: (accent: accent) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const changeClass = (
    element: HTMLElement,
    newClass: string,
    oldClasses: string[]
) => {
    oldClasses.forEach((oldClass) => {
        element.classList.remove(oldClass);
    });
    element.classList.add(newClass);
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<modeType>(
        (localStorage.getItem("theme") as modeType) || "ani"
    );

    const [accent, setAccent] = useState<accent>(
        (localStorage.getItem("accent") as accent) || "accent-purple"
    );

    const changeTheme = (mode: modeType) => {
        const oldThemes = ["light", "dark", "ani"];
        changeClass(document.documentElement, mode, oldThemes);
        // if (import.meta.env.DEV) {
            localStorage.setItem("theme", mode);
        // } else {
            // chrome.storage.local.set({ theme: mode });
        // }
    };


    const changeAccent = (accent: accent) => {
        const oldAccents = ["accent-blue", "accent-green", "accent-purple", "accent-orange"];
        changeClass(document.documentElement, accent, oldAccents);
        // if (import.meta.env.DEV) {
            localStorage.setItem("accent", accent);
        // } else {
            // chrome.storage.local.set({ accent: accent });
        // }
    };

    useEffect(() => {
        changeTheme(mode);
    }, [mode]);

    useEffect(() => {
        changeAccent(accent as accent);
    }, [accent]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const savedAccent = localStorage.getItem("accent");
        if (savedTheme) {
            changeTheme(savedTheme as modeType);
        }
        if (savedAccent) {
            changeAccent(savedAccent as accent);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ mode, setMode, accent, setAccent }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
