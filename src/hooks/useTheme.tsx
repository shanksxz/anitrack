import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

type modeType = 'light' | 'dark';
type accent = 'accent-blue' | 'accent-green' | 'accent-purple'

type ThemeContextType = {
    mode : modeType;
    accent : accent;
    setMode : (mode: modeType) => void;
    setAccent : (accent: accent) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const changeClass = (element: HTMLElement, newClass: string, oldClasses: string[]) => {
    oldClasses.forEach(oldClass => {
        element.classList.remove(oldClass);
    });
    element.classList.add(newClass);
};

export function ThemeProvider(
    {children} : {children : React.ReactNode}
) {
    const [mode, setMode] = useState<modeType>('light');

    const [accent, setAccent] = useState<accent>(localStorage.getItem('accent') as accent || 'accent-purple');

    const changeTheme = (mode: modeType) => {
        const oldThemes = ['light', 'dark'];
        changeClass(document.documentElement, mode, oldThemes);
        localStorage.setItem('theme', mode);
    };


    const changeAccent = (accent: accent) => {
        const oldAccents = ['accent-blue', 'accent-green', 'accent-purple'];
        changeClass(document.documentElement, accent, oldAccents);
        localStorage.setItem('accent', accent);
    };


    useEffect(() => {
        changeTheme(mode);
    }, [mode]);

    useEffect(() => {
        changeAccent(accent as accent);
    }, [accent]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const savedAccent = localStorage.getItem('accent');
        if (savedTheme) {
            changeTheme(savedTheme as modeType);
        }
        if (savedAccent) {
            changeAccent(savedAccent as accent);
        }
    }, []);
    

    return (
        <ThemeContext.Provider value={{mode, setMode, accent, setAccent}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if(context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}