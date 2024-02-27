import { useState } from "react";
import { searchMediaResponse, MediaType } from "../types";
import { useStore } from "@/app/store";
import { useDebounce } from "@/hooks/useDebounce";
import { Triangle } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

import Update from "./Update";
import MediaCard from "../components/MediaCard";
import AnimeService from "../requests/index";

import SelectComp from "@/components/Select";

const SearchPage = () => {
    const [search, setSearch] = useState<string>("");
    const [mediaType, setMediaType] = useState<MediaType>("ANIME");

    const { animeId } = useStore();

    const debouncedSearch = useDebounce(search, 1000);

    
    const { data: mediaDataResponse, isLoading: loading } = useQuery({
        queryKey: ["searchMedia", debouncedSearch, mediaType],
        queryFn: () => AnimeService.searchMedia({ search: debouncedSearch, mediaType }),
        enabled: debouncedSearch !== "",
        retry: 1,
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return animeId === 0 ? (
        <div className="bg-primary_bg w-full h-full relative">
            <div className="p-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[300px] text-[1.2rem] h-[40px] text-primary_text bg-secondary_bg p-2 rounded-sm outline-none border border-input"
                    value={search}
                    onChange={handleSearch}
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
                    {/* overflow-y-scroll scrollbar scrollbar-thumb-purple scrollbar-w-3 */}
                    {mediaDataResponse?.Page.media.map(
                        (animeData: searchMediaResponse) => (
                            <MediaCard key={animeData.id} media={animeData} />
                        )
                    )}
                </div>
            )}
        </div>
    ) : (
        <Update />
    );
};

export default SearchPage;
