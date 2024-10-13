import { currentUI, useUserStore } from "@/app/store";
import { useStore } from "@/app/store";
import { jwtDecode } from "jwt-decode";
import { convertExp } from "@/utils";
import SelectComp from "@/components/Select";
import { useState, useEffect } from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import browser from 'webextension-polyfill';

const Settings = () => {
    const { setCurrentTab } = currentUI();
    const { accessToken, setAccessToken } = useStore();
    const { user } = useUserStore();

    const [value, setValue] = useState("SEARCH");

    useEffect(() => {
        const getDefaultTab = async () => {
            try {
                const result = await browser.storage.local.get("defaultTab");
                setValue(result.defaultTab as string || "SEARCH");
            } catch (error) {
                console.error("Error retrieving default tab:", error);
            }
        };
        getDefaultTab();
    }, []);

    let decoded;
    let exp;

    if(accessToken) {
        decoded = jwtDecode(accessToken);
        exp = convertExp(decoded.exp as number);
    }

    const logoutHandler = async () => {
        setAccessToken(""); 
        try {
            await browser.storage.local.clear();
        } catch (error) {
            console.error("Error clearing storage:", error);
        }
    };
    
    const handleSaveDefaultTab = async () => {
        setCurrentTab(value);
        try {
            await browser.storage.local.set({ defaultTab: value });
        } catch (error) {
            console.error("Error saving default tab:", error);
        }
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
                        onClick={handleSaveDefaultTab}
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