import { currentUI, useUserStore } from "@/app/store";
import { useStore } from "@/app/store";
import { jwtDecode } from "jwt-decode";
import { convertExp } from "@/utils";
import SelectComp from "@/components/Select";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import ThemeSwitch from "@/components/ThemeSwitch";




const Settings = () => {

    const { setCurrentTab } = currentUI();
    const { accessToken, setAccessToken } = useStore();
    const { userName } = useUserStore();
    
    const [value, setValue] = useState<string>(
        localStorage.getItem("defaultTab") || ""
    );




    const decoded = jwtDecode(accessToken as string);
    console.log(decoded);
    const exp = convertExp(decoded.exp as number);

    const logoutHandler = () => {
        setAccessToken(""); // does this thing needed ?
        localStorage.clear(); // clear all the data
    };

    return (
        <section className="p-6 h-full bg-primary_bg overflow-y-scroll scrollbar scrollbar-thumb-purple scrollbar-w-3 text-primary_text">
            <h1 className="font-bold text-[2rem]">Settings</h1>
            <div className="bg-secondary_bg mt-2 p-2 rounded-sm">
                <p>
                    Logged in as{" "}
                    <a
                        href={`https://anilist.co/user/${userName}`}
                        target="_blank"
                        className="text-purple underline font-bold"
                    >
                        {userName}
                    </a>
                </p>
                <p className="mt-1">
                    Your token will expire on{" "}
                    <span className="text-purple font-bold">
                        {exp.day}/{exp.month}/{exp.year}
                    </span>{" "}
                    at {exp.hour}:{exp.minute}
                    {exp.ampm}, You will have to re-login after the token
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
                            {/* {theme.map(({ color, modeC, id }) => ( */}
                                <ThemeSwitch
                                    // className={`border-2 ${id === 1 ? "border-white" : "border-black"}`}
                                    // key={id}
                                    // color={color}
                                    // accent={modeC === mode}
                                    // onClick={() => changeMode(modeC as "light" | "dark" | "ani")}
                                />
                            {/* ))} */}
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-2 font-bold text-[1.5rem]">Links</p>
            <div className="mt-2 bg-secondary_bg p-2 rounded-sm flex items-center">
                <FaGithub className="hover:cursor-pointer" size={30} />
                {/* experimental */}
                <p className="ml-2 font-bold">Github</p>
            </div>
            <p className="mt-2 text-[1.5rem] font-bold">About</p>
            <div className="mt-2 bg-secondary_bg p-2 rounded-sm">
                <p>
                    it's a simple chrome extension that allows you to search for
                    anime and manga on Anilist and add them to your list.
                </p>
            </div>
        </section>
    );
};

export default Settings;
