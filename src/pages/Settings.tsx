import { currentUI, useUserStore } from "@/app/store";
import { useStore } from "@/app/store";
import { jwtDecode } from "jwt-decode";
import { convertExp } from "@/utils";
import SelectComp from "@/components/Select";
import { useState } from "react";
import ThemeSwitch from "@/components/ThemeSwitch";



const Settings = () => {

    const { setCurrentTab } = currentUI();
    const { accessToken, setAccessToken } = useStore();
    const { user } = useUserStore();

    const [value, setValue] = useState(
        localStorage.getItem("defaultTab") || "SEARCH"
    );

    let decoded;
    let exp;

    if(accessToken) {
        decoded = jwtDecode(accessToken);
        exp = convertExp(decoded.exp as number);
    }

    const logoutHandler = () => {
        setAccessToken(""); 
        localStorage.clear();
    };
    
    return (
            <section className="p-6 h-full bg-primary_bg overflow-y-scroll scrollbar scrollbar-thumb-purple scrollbar-w-3 text-primary_text">
                <h1 className="font-bold text-[2rem]">Settings</h1>
                <div className="bg-secondary_bg mt-2 p-2 rounded-sm">
                    <p>
                        Logged in as{" "}
                        <a
                            href={`https://anilist.co/user/${user.name}`}
                            target="_blank"
                            className="text-purple underline font-bold"
                            >
                            {user.name}
                        </a>
                    </p>
                    <p className="mt-1">
                        Your token will expire on{" "}
                        <span className="text-purple font-bold">
                            {exp?.day}/{exp?.month}/{exp?.year}
                        </span>{" "}
                        at {exp?.hour}:{exp?.minute}
                        {exp?.ampm}, You will have to re-login after the token
                        expires.
                    </p>
                    <button
                        className="mt-2 px-3 py-2 rounded-sm bg-purple text-dark_text font-bold"
                        onClick={logoutHandler}
                        >
                        Logout
                    </button>
                </div>
                <p className="mt-2 text-[1.2rem]  font-bold">Default Page</p>
                <div className="bg-secondary_bg mt-2 p-2 rounded-sm">
                    <div className="flex items-center gap-2">
                        <SelectComp
                            width="w-[100px]"
                            value={value}
                            onValueChange={(value) => setValue(value)}
                            options={[
                                { value: "SEARCH", label: "Search" },
                                { value: "MYANIME", label: "My Anime" },
                                { value: "MYMANGA", label: "My Manga" },
                                { value: "SETTINGS", label: "Settings" },
                            ]}
                        />
                        <button
                            className="bg-purple px-3 py-2 rounded-sm font-bold text-dark_text"
                            onClick={() => {
                                setCurrentTab(value);
                                localStorage.setItem("defaultTab", value);
                            }}
                            >
                            Save
                        </button>
                    </div>
                    <p className="mt-2">
                        Set the default page that you want to see whenever you open
                        the extension.
                    </p>
                </div>
                <p className="mt-2 font-bold text-[1.5rem]">Theme</p>
                <div className="mt-2 bg-secondary_bg p-2 rounded-sm  items-center">
                    <div>
                        <div>
                            <p>Primary Color</p>
                            <div className="mt-2">
                                    <ThemeSwitch />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default Settings;
