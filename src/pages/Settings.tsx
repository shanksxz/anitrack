import { currentUI, useUserStore } from "@/app/store";
import { useStore } from "@/app/store";
import { jwtDecode } from "jwt-decode";
import { convertExp } from "@/utils";
import SelectComp from "@/components/Select";
import { FormEvent, useState } from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import Authenticated from "@/components/Authenticated";


import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"


const isValidToken = (token: string) => {
  try {
    jwtDecode(token);
    return true;
  } catch (error) {
    return false;
  }
};

const Settings = () => {

    const { setCurrentTab } = currentUI();
    const { accessToken, setAccessToken } = useStore();
    const { user } = useUserStore();
    const [inputAccessToken, setInputAccessToken] = useState<string>("");
    const [errors, setErrors] = useState<string>("");

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

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();

        if (!isValidToken(inputAccessToken)) {
            setErrors("Invalid Token");
            return;
        }

        localStorage.setItem("accessToken", inputAccessToken);
        setAccessToken(inputAccessToken);
    };

    return (
        <Authenticated 
            fallback = {
                <div className="p-5 relative h-full flex flex-col items-start justify-center">
                        <h1 className="text-4xl text-primary_text font-bold">You are not logged in</h1>
                        <p className="my-2 text-primary_text">Please login to access the settings</p>
                        <Dialog>
                            <DialogTrigger className="px-2 py-1 bg-[#02a9ff] text-primary_text text-[1.2rem] font-bold rounded-sm">Login</DialogTrigger>
                            <DialogContent>
                                <form
                                    className="p-5 text-white rounded-sm flex flex-col gap-2"
                                    onSubmit={handleSubmit}
                                >
                                    <p className="mb-1">
                                        Click{" "}
                                        <span className="rounded-sm underline">
                                            <a
                                                href="https://anilist.co/api/v2/oauth/authorize?client_id=16601&response_type=token"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                here
                                            </a>
                                        </span>{" "}
                                        to start the authorization process. You will be redirected
                                        authorization. After authorization, AniList will give you a
                                        token copy and paste that below to complete the linking.
                                    </p>
                                    <input
                                        placeholder="Enter Token"
                                        type="text"
                                        className="border text-black border-black border-solid p-2 rounded-sm outline-none focus:border-blue-500"
                                        value={inputAccessToken}
                                        onChange={(e) => {
                                            setInputAccessToken(e.target.value);
                                            setErrors("");
                                        }}
                                    />
                                    {errors && <span className="text-red-500">{errors}</span>}
                                    <button
                                        type="submit"
                                        className="p-2 rounded-sm bg-[#02a9ff] text-white"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </DialogContent>
                        </Dialog>
                 </div>
            } 
        >
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
        </Authenticated>
    );
};

export default Settings;
