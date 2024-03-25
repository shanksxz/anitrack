import { useState } from "react";
import { userMediaListResponse, mediaStatus } from "@/types";
import AnimeService from "@/requests";

// zustand
import { useUserStore } from "@/app/store";

// pre-defined components
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

import { Triangle } from "react-loader-spinner";
import TooltipComp from "@/components/Tooltip";

// components
import MyMediaCard from "@/components/MyMediaCard";
import { RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SelectComp from "@/components/Select";

const MyAnime = ({ MediaType }: { MediaType: "ANIME" | "MANGA" }) => {
    
    const { userId } = useUserStore();
    const [status, setStatus] = useState<mediaStatus>("CURRENT");

    const { data: userAnimeData, isLoading: loading, refetch: fetchUserData } = useQuery({
        queryKey: ["userMediaList", userId, status, "UPDATED_TIME_DESC", MediaType],
        queryFn: () => AnimeService.userMediaList( userId, status, "UPDATED_TIME_DESC", MediaType ),
        enabled: true,
        retry: 1,
    });
    
    console.log(loading, "loading");

    return (
        <section className="bg-primary_bg max-h-full relative p-6 text-primary_text">
            <h1 className="font-bold text-[2rem]">
                My {MediaType === "ANIME" ? "Anime" : "Manga"}{" "}
            </h1>

            <div className="mt-2">
                <div className="flex justify-between items-center">
                    <SelectComp
                        value={status}
                        width="w-[180px]"
                        onValueChange={(value) => setStatus(value as mediaStatus)}
                        options={[
                            { value: "CURRENT", label: "Current" },
                            { value: "COMPLETED", label: "Completed" },
                            { value: "PLANNING", label: "Planning" },
                            { value: "DROPPED", label: "Dropped" },
                        ]}
                    />
                     {/* <Select
                        value={status}
                        onValueChange={(value) =>
                            setStatus(value as mediaStatus)
                        }
                    >
                        <SelectTrigger className="p-2 w-[180px] border border-white outline-none appearance-none text-primary_text bg-secondary_bg h-[40px] rounded-sm">
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="CURRENT">Current</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="PLANNING">Planning</SelectItem>
                            <SelectItem value="DROPPED">Dropped</SelectItem>
                        </SelectContent>
                    </Select> */}
                    <RefreshCw
                        id="refresh"
                        size={35}
                        className="hover:cursor-pointer hover:bg-secondary_bg p-1 hover:rounded-sm"
                        onClick={() => fetchUserData()}
                    />
                    <TooltipComp content="Refresh" anchorSelect="#refresh" />
                </div>
                {loading ? (
                    <div className="h-[450px] flex justify-center items-center">
                        <Triangle color="#02a9ff" height={50} width={50} />
                    </div>
                ) : (
                    <div className="mt-5 max-h-[450px] w-full flex flex-col gap-2 overflow-y-scroll scrollbar scrollbar-thumb-purple scrollbar-w-3">
                        {userAnimeData?.Page?.mediaList.map(
                            (anime: userMediaListResponse) => (
                                <MyMediaCard key={anime.id} MyAnime={anime} />
                            )
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyAnime;
