import { createContext, useContext, useEffect, useState } from "react";

type modeType = "light" | "dark";

type ThemeContextType = {
    mode: modeType;
    setMode: (mode: modeType) => void;
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
        (localStorage.getItem("theme") as modeType) || "dark"
    );

    const changeTheme = (mode: modeType) => {
        const oldThemes = ["light", "dark",];
        changeClass(document.documentElement, mode, oldThemes);
        localStorage.setItem("theme", mode);
    };


    useEffect(() => {
        changeTheme(mode);
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ mode, setMode}}>
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
