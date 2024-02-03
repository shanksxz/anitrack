import {
    userMediaListResponse,    
} from "@/types";
import { timeStampsToRemainingTime } from "@/utils";


import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import UpdateModalDetails from "./updateModalDetails";
    

const MyAnimeCard = (
    {MyAnime} : {MyAnime: userMediaListResponse}
) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
            <div className='bg-[#262626] p-1 flex max-h-[200px] gap-2 rounded-sm'>
                <img 
                    className='rounded-sm object-cover'
                    src={MyAnime?.media?.coverImage?.medium} 
                    alt={MyAnime?.media?.title?.english}
                />
                <div className=''>
                    <p>{MyAnime?.media?.title?.userPreferred}</p>

                    {
                        (MyAnime?.status === 'CURRENT' && MyAnime?.media?.status === 'RELEASING' && MyAnime?.media?.type === 'ANIME') ? 
                        <p className='font-bold'>
                            {MyAnime?.media?.nextAiringEpisode?.episode} airing in {timeStampsToRemainingTime(MyAnime?.media?.nextAiringEpisode?.timeUntilAiring)}
                        </p> : ''
                    }

                    <p>
                        {
                            MyAnime?.media?.type === 'ANIME' && MyAnime?.status !== 'PLANNING' ?
                            `Episodes: ${MyAnime?.progress}` :
                            MyAnime?.media?.type === 'MANGA' && MyAnime?.status !== 'PLANNING' ?
                            `Chapters: ${MyAnime?.progress}` : ''
                        }
                    </p>

                    <div className='mt-2'>
                        <FaEdit 
                            size={20}
                            className='hover:cursor-pointer'
                            onClick={() => setIsOpen(!isOpen)}
                            />
                    </div>

                    {isOpen && <UpdateModalDetails
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        mediaId={MyAnime.mediaId}
                    />}

                </div>
            </div>
  )
}

export default MyAnimeCard