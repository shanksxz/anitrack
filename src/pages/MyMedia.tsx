import { useState } from "react";
import AnimeService from "@/requests";
import { useUserStore } from "@/app/store";
import { Triangle } from "react-loader-spinner";
import TooltipComp from "@/components/Tooltip";
import MyMediaCard from "@/components/MyMediaCard";
import { RefreshCw } from "lucide-react";
import SelectComp from "@/components/Select";
import { useQuery } from "@tanstack/react-query";

const MyAnime = ({ MediaType }: { MediaType: "ANIME" | "MANGA" }) => {
    
    const { user } = useUserStore();
    const [status, setStatus] = useState<mediaStatus>("CURRENT");

    const {
        data : userAnimeData,
        isLoading: loading,
        // refetch : fetchUserData,
    } = useQuery({
        queryKey : ["userMediaList", { user, status, MediaType }],
        queryFn: () => AnimeService.userMediaList(user.id, status, "UPDATED_TIME_DESC", MediaType),
        enabled : !!user,
        select : (data) => data.Page.mediaList,
    });

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
                    <RefreshCw
                        id="refresh"
                        size={35}
                        className="hover:cursor-pointer hover:bg-secondary_bg p-1 hover:rounded-sm"
                        //TODO: fix this
                        // onClick={() => fetchUserData()}
                    />
                    <TooltipComp content="Refresh" anchorSelect="#refresh" />
                </div>
                {loading ? (
                    <div className="h-[450px] flex justify-center items-center">
                        <Triangle color="#02a9ff" height={50} width={50} />
                    </div>
                ) : (
                    <div className="mt-5 max-h-[450px] w-full flex flex-col gap-2 overflow-y-scroll scrollbar scrollbar-thumb-purple scrollbar-w-3">
                        {userAnimeData?.map(
                            anime => (
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
