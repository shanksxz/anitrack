import { useEffect, useState } from "react";
import AnimeService from "../requests/index";
import { BookOpen, Search, Settings2, Tv } from "lucide-react";
import { useUserStore } from "@/app/store";
import { currentUI } from "@/app/store";
import TooltipComp from "@/components/Tooltip";
import { useQuery } from "@tanstack/react-query";
import browser from "webextension-polyfill";

const SideBar = () => {
    console.log("SideBar Renders");
    const { setUser } = useUserStore();
    const { setCurrentTab } = currentUI();
    const [userData, setUserData] = useState<ViewerQueryResponse | null>(null);

    const {
        data: userDataResponse,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["userDetails"],
        queryFn: () => AnimeService.userDetails(),
        enabled: !userData,
    });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const result = await browser.storage.local.get("userDetail");
                if (result.userDetail) {
                    const parsedData = JSON.parse(result.userDetail as string) as ViewerQueryResponse;
                    setUserData(parsedData);
                    setUser({ id: parsedData.Viewer.id, name: parsedData.Viewer.name });
                }
            } catch (error) {
                console.error("Error loading user details:", error);
            }
        };

        loadUserData();
    }, [setUser]);

    useEffect(() => {
        const saveUserData = async () => {
            if (userDataResponse && !userData?.Viewer) {
                setUser({ id: userDataResponse.Viewer.id, name: userDataResponse.Viewer.name });
                setUserData(userDataResponse);
                try {
                    await browser.storage.local.set({ userDetail: JSON.stringify(userDataResponse) });
                } catch (error) {
                    console.error("Error saving user details:", error);
                }
            }
        };

        saveUserData();
    }, [userDataResponse, userData, setUser]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching user data</div>;

    return (
        <section className="bg-purple border-l-2 border-l-black h-full pt-3 flex flex-col items-center justify-between">
            <div className="p-1 flex flex-col items-center">
                <a href={userData?.Viewer?.siteUrl} target="_blank" rel="noopener noreferrer">
                    <img
                        alt="User Avatar"
                        src={userData?.Viewer?.avatar?.large}
                        className="p-1 mb-[2rem] w-12 h-12 rounded-full border-2 border-white hover:bg-black hover:cursor-pointer"
                    />
                </a>
                <Search
                    size={30}
                    id="search"
                    className="text-white text-2xl hover:cursor-pointer outline-none"
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