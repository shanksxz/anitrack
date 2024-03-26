import { currentUI, useUserStore } from "@/app/store";
import { useStore } from "@/app/store";
import { jwtDecode } from "jwt-decode";
import { convertExp } from "@/utils";
import SelectComp from "@/components/Select";
import { FormEvent,  useLayoutEffect, useState } from "react";
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

}

let decoded;
let exp : {
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
    ampm: string;
}  = {
    day: 0,
    month: 0,
    year: 0,
    hour: 0,
    minute: 0,
    ampm: ""
}


const Settings = () => {


    const { setCurrentTab } = currentUI();
    const { accessToken, setAccessToken } = useStore();
    const { userName } = useUserStore();
    const [inputAccessToken, setInputAccessToken] = useState<string>("");
    const [errors, setErrors] = useState<string>("");

    const [value, setValue] = useState<string>(
        localStorage.getItem("defaultTab") || ""
    );


    useLayoutEffect(() => {
        if(!accessToken) {
            console.log("No access token available");
        } else {
            try {
                decoded = jwtDecode(accessToken);
                exp = convertExp(decoded.exp as number);
                console.log("Decoded JWT:", decoded);
                console.log("Expiration time:", exp);
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }
    }, [accessToken]);

    const logoutHandler = () => {
        setAccessToken(""); 
        localStorage.clear(); 
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (inputAccessToken === "") {
            setErrors("Please enter a token");
            return;
        }

        if (!isValidToken(inputAccessToken)) {
            setErrors("Invalid Token");
            return;
        }

        localStorage.setItem("accessToken", inputAccessToken);
        setAccessToken(inputAccessToken);
        localStorage.setItem("mediaType", "ANIME");
    };

    return (
        <Authenticated 
            fallback = {
                <div className="p-5 relative h-full flex flex-col items-start justify-center">
                        <h1 className="text-4xl font-bold">You are not logged in</h1>
                        <p className="my-2">Please login to access the settings</p>
                        <Dialog>
                            <DialogTrigger className="px-2 py-1 bg-[#02a9ff] text-[1.2rem] font-bold rounded-sm">Login</DialogTrigger>
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
                                className="p-2 rounded-sm bg-black text-white"
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
                                    <ThemeSwitch />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <p className="mt-2 font-bold text-[1.5rem]">Links</p>
                <div className="mt-2 bg-secondary_bg p-2 rounded-sm flex items-center">
                    <FaGithub className="hover:cursor-pointer" size={30} />
                    <p className="ml-2 font-bold">Github</p>
                </div>
                <p className="mt-2 text-[1.5rem] font-bold">About</p>
                <div className="mt-2 bg-secondary_bg p-2 rounded-sm">
                    <p>
                        it's a simple chrome extension that allows you to search for
                        anime and manga on Anilist and add them to your list.
                    </p>
                </div> */}
            </section>
        </Authenticated>
    );
};

export default Settings;
