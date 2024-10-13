import { createContext, useContext, useEffect, useState } from "react";
import browser from "webextension-polyfill";

type ModeType = "light" | "dark";

type ThemeContextType = {
    mode: ModeType;
    setMode: (mode: ModeType) => void;
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
    const [mode, setMode] = useState<ModeType>("dark");

    const changeTheme = (newMode: ModeType) => {
        const oldThemes = ["light", "dark"];
        changeClass(document.documentElement, newMode, oldThemes);
        browser.storage.local.set({ theme: newMode });
    };

    useEffect(() => {
        const loadTheme = async () => {
            const result = await browser.storage.local.get("theme");
            const savedTheme = result.theme as ModeType | undefined;
            if (savedTheme) {
                setMode(savedTheme);
            }
        };

        loadTheme();
    }, []);

    useEffect(() => {
        changeTheme(mode);
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
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