import { useEffect, useState } from "react";
import { searchAnimeResponse, MediaType } from "../types";
import MediaCard from "../components/MediaCard";


import { searchAnime } from "../requests/index";

// shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Triangle
} from 'react-loader-spinner'
import { useStore } from "@/app/store";
import Update from "./Update";


const SearchPage = () => {

  const [search, setSearch] = useState<string>("");
  const [mediaType, setMediaType] = useState<MediaType>("ANIME");
  const [animeDataResponse, setAnimeDataResponse] = useState<searchAnimeResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    animeId,
  } = useStore();

  const fetchMediaData = async () => {
    try {
      setLoading(true);
      const k = await searchAnime({ search, mediaType });
      setAnimeDataResponse(k.data.Page.media);
      setLoading(false);
    } catch (error) {
      throw new Error("Error in fetching data");
    }
  }

  useEffect(() => {
    if (search === "") {
      return;
    };
    let k = setTimeout(() => {
      fetchMediaData();
    }, 2000);
    return () => clearTimeout(k);
  }, [search, mediaType]);


  return (
      (animeId === 0)? (
        <div
        className='bg-[#1a1a1a] w-full h-full relative'
      >
        <div className="p-6 flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className='w-[300px] h-[40px] text-white bg-[#262626] p-2 rounded-sm outline-none border border-input'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            value={mediaType}
            onValueChange={(value) => setMediaType(value as MediaType)}
          >
            <SelectTrigger className='p-2 w-[180px] text-white bg-[#262626] h-[40px] rounded-sm'>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ANIME">Anime</SelectItem>
              <SelectItem value="MANGA">Manga</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {
          loading ? (
            <div className='flex h-[500px] justify-center items-center'>
              <Triangle
                height={50}
                width={50}
                color="white"
              />
            </div>
          ) :
            (
              <div className='m-6 mt-0 flex flex-col max-h-[500px] overflow-y-scroll scrollbar scrollbar-thumb-[#7330e6] scrollbar-w-3 gap-2'>
                {animeDataResponse.map((animeData) => (
                  <MediaCard
                    key={animeData.id}
                    anime={animeData}
                  />
                ))}
              </div>
            )
        }
  
      </div>
      ) : (
        <Update />
      )
  );
};

export default SearchPage;
