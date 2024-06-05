import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Triangle } from "react-loader-spinner";
import MediaCard from "../components/MediaCard";
import AnimeService from "../requests/index";
import SelectComp from "@/components/Select";
import { useQuery } from "@tanstack/react-query";

export default function SearchPage() {

    const [search, setSearch] = useState<string>("");
    const [mediaType, setMediaType] = useState<MediaType>("ANIME");
    const debouncedSearch = useDebounce(search, 1500); // debouncing the search input

    const {
        data : mediaDataResponse,
        isLoading: loading,
    } = useQuery({
        queryKey : ["searchMedia", { debouncedSearch, mediaType }],
        queryFn: () => AnimeService.searchMedia({ search : debouncedSearch, mediaType }),
        enabled : !!debouncedSearch,
        select : (data) => data.Page.media,
    });

    return (
        <div className="bg-primary_bg w-full h-full relative">
            <div className="p-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[300px] text-[1.2rem] h-[40px] text-primary_text bg-secondary_bg p-2 rounded-sm outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <SelectComp
                    width="w-[180px]"
                    value={mediaType}
                    onValueChange={(value) => setMediaType(value as MediaType)}
                    options={[
                        { value: "ANIME", label: "Anime" },
                        { value: "MANGA", label: "Manga" },
                    ]}
                />
            </div>
            {loading ? (
                <div className="flex h-[500px] justify-center items-center">
                    <Triangle height={50} width={50} color="white" />
                </div>
            ) : (
                <div className="m-6 mt-0 flex flex-col max-h-[500px] overflow-y-scroll scrollbar scrollbar-thumb-purple scrollbar-w-3 gap-2">
                    {mediaDataResponse?.map(
                        (animeData: searchMediaResponse) => (
                            <MediaCard key={animeData.id} media={animeData} />
                        )
                    )}
                </div>
            )}
        </div>
    )
};

