import {
    userMediaListResponse,
} from "@/types";
import { timeStampsToRemainingTime } from "@/utils";


import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import UpdateModalDetails from "./updateModalDetails";

import useUpdateUserMedia from "@/hooks/useUpdateUserMedia";

const MyMediaCard = (
    { MyAnime }: { MyAnime: userMediaListResponse }
) => {


    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(MyAnime?.progress);

    const {
        updateUserMedia,
        Toaster
    } = useUpdateUserMedia({
        data: {
            mediaId: MyAnime.mediaId,
            progress: progress
        }
    });
    
    const handleIncrement = async() => {
        setProgress((prev) => prev + 1);
        try {
            await updateUserMedia();
        } catch (error) {
            setProgress((prev) => prev - 1);
            throw new Error('Error in updating data')
        }
    }

    return (
        <div className='bg-[#262626] p-1 flex max-h-[100px] gap-2 justify-between items-end rounded-sm'>
            <div className='flex gap-2'>

                <img
                    className='w-[50px] h-[75px] rounded-sm object-cover'
                    src={MyAnime?.media?.coverImage?.medium}
                    alt={MyAnime?.media?.title?.english}
                />
                <div className=''>
                    <div className='flex gap-2'>
                        <p>
                            {
                                MyAnime?.media?.title?.userPreferred?.trim().length > 40 ? 
                                MyAnime?.media?.title?.userPreferred?.trim().substring(0,40) + '...' :
                                MyAnime?.media?.title?.userPreferred?.trim()
                            }
                        </p>

                        {
                            (MyAnime?.status === 'CURRENT' && MyAnime?.media?.status === 'RELEASING' && MyAnime?.media?.type === 'ANIME') ?
                                <p className='font-bold'>
                                    {MyAnime?.media?.nextAiringEpisode?.episode} airing in {timeStampsToRemainingTime(MyAnime?.media?.nextAiringEpisode?.timeUntilAiring)}
                                </p> : ''
                        }

                    </div>
                    <p>
                        {
                            MyAnime?.media?.type === 'ANIME' && MyAnime?.status !== 'PLANNING' ?
                                `Episodes: ${progress}` :
                                MyAnime?.media?.type === 'MANGA' && MyAnime?.status !== 'PLANNING' ?
                                    `Chapters: ${MyAnime?.progress}` : ''
                        }
                    </p>

                    <div className='mt-2 flex justify-between'>
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

            <button 
                onClick={handleIncrement}
                className='m-1 px-1 rounded-sm bg-[#7330e6]'>
                +1
            </button>
            <Toaster />
        </div>
    )
}

export default MyMediaCard