import { useTheme } from "@/hooks/useTheme";

const theme = [
    { color: "#0b1622", modeC: "dark", id: 1 },
    { color: "white", modeC: "light", id: 2 },
];

const Switch = ({ color, accent, onClick, className }: { color: string, accent: boolean, className?: string, onClick: () => void }) => {
    return (
        <span style={{ backgroundColor: color }} className={`inline-block w-8 h-8 mr-2 rounded-md hover:cursor-pointer ${accent ? className : ""}`} onClick={onClick}></span>
    )
}

const ThemeSwitch = () => {
   const { mode, setMode } = useTheme();

    const changeMode = (newMode: "light" | "dark") => {
        setMode(newMode);
    };

    return (
        <div className="flex items-center">
            {theme.map(({ color, modeC, id }) => (
                <Switch
                    className={`border-2 ${id === 1 ? "border-white" : "border-black"}`}
                    key={id}
                    color={color}
                    accent={modeC === mode}
                    onClick={() => changeMode(modeC as "light" | "dark")}
                />
            ))}
        </div>
    )
}

export default ThemeSwitch;
