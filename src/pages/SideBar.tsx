import { useLayoutEffect, useState } from "react";
import AnimeService from "../requests/index";
import { ViewerQueryResponse } from "@/types";
import { BookOpen, Search, Settings2, Tv } from "lucide-react";
import { useUserStore } from "@/app/store";
import { currentUI } from "@/app/store";
import TooltipComp from "@/components/Tooltip";
import Authenticated from "@/components/Authenticated";
import { useStore } from "@/app/store";


const SideBar = () => {

    const { setUserId, setUserName } = useUserStore();
    const { setCurrentTab } = currentUI();
    const { accessToken } = useStore();
    const [userData, setUserData] = useState<ViewerQueryResponse>(
        JSON.parse(localStorage.getItem("userDetail") || "{}")
    );

    const fetchUserData = async () => {
        try {
            if (!accessToken) {
                return;
            }
            const k = await AnimeService.userDetails();
            setUserId(k?.Viewer.id);
            setUserData(k);
            localStorage.setItem("userDetail", JSON.stringify(k));
        } catch (error) {
            throw new Error("Error in fetching data");
        }
    };

    useLayoutEffect(() => {
        if (localStorage.getItem("userDetail")) {
            const data = JSON.parse(localStorage.getItem("userDetail") || "{}");
            if (!data) {
                return;
            }
            setUserId(data?.Viewer.id);
            setUserName(data?.Viewer.name);
            return;
        }
        fetchUserData();
    }, [accessToken]);

    return (
        <section className="bg-purple border-l-2 border-l-black  h-full pt-3 flex flex-col items-center justify-between">
            <Authenticated>
                <div className="p-1 flex flex-col items-center">
                    <a href={userData?.Viewer?.siteUrl} target="_blank">
                        <img
                            alt="User Avatar"
                            src={userData?.Viewer?.avatar?.large}
                            height={72}
                            width={72}
                            className="p-1 rounded-full border-2 border-white hover:bg-black hover:cursor-pointer"
                            />
                    </a>
                    <Search
                        size={30}
                        id="search"
                        className="mt-[3rem] text-white text-2xl hover:cursor-pointer outline-none"
                        onClick={() => setCurrentTab("SEARCH")}
                        strokeWidth={3}
                        />
                    <TooltipComp content="Search" anchorSelect="#search" />
                    <Tv
                        strokeWidth={3}
                        id="anime"
                        size={30}
                        className="mt-[2rem] text-white text-2xl hover:cursor-pointer outline-none"
                        onClick={() => setCurrentTab("MYANIME")}
                        />

                    <TooltipComp content="My Anime" anchorSelect="#anime" />
                    <BookOpen
                        id="manga"
                        strokeWidth={3}
                        size={30}
                        color="#fff"
                        className="mt-[2rem] text-white text-2xl hover:cursor-pointer outline-none"
                        onClick={() => setCurrentTab("MYMANGA")}
                        />
                    <TooltipComp content="My Manga" anchorSelect="#manga" />
                </div>
            </Authenticated>
            <Settings2
                id="settings"
                strokeWidth={3}
                size={30}
                className="text-white text-2xl hover:cursor-pointer mb-[1rem] outline-none"
                onClick={() => setCurrentTab("SETTINGS")}
            />
            <TooltipComp content="Settings" anchorSelect="#settings" />
        </section>
    );
};

export default SideBar;
