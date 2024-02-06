import { useEffect, useState } from "react"
import { userMediaList } from "@/requests";
import { userMediaListResponse, mediaStatus } from "@/types";

// zustand
import { useUserStore } from "@/app/store";

// pre-defined components
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Triangle
} from "react-loader-spinner";

// components
import MyMediaCard from "@/components/MyMediaCard";



const MyAnime = (
    {MediaType} : {MediaType: 'ANIME' | 'MANGA'}
) => {

    const { userId } = useUserStore();
    const [userAnimeData, setUserAnimeData] = useState<userMediaListResponse[]>();
    const [loading , setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<mediaStatus>('CURRENT');

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const result = await userMediaList(userId,status,'UPDATED_TIME_DESC',MediaType);
            setUserAnimeData(result?.Page?.mediaList);
            setLoading(false);
        } catch (error) {
            console.log(error);
            throw new Error("Error in fetching data");
        }
    };

    useEffect(() => {   
        fetchUserData();
    }, [status,MediaType]);


    return (
        <section className='max-h-full relative p-6 text-white'>
            <h1 className='font-bold text-[2rem]'>My {
                MediaType === 'ANIME' ? 'Anime' : 'Manga'
            } </h1>

            <div className='mt-2'>
                <Select 
                    value={status}
                    onValueChange={(value) => setStatus(value as mediaStatus)}
                >
                    <SelectTrigger className='p-2 w-[180px] text-white bg-secondary_gray h-[40px] rounded-sm'>
                        <SelectValue placeholder="Select a type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="CURRENT">Current</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="PLANNING">Planning</SelectItem>
                        <SelectItem value="DROPPED">Dropped</SelectItem>
                    </SelectContent>
                </Select>
                {
                    loading ? 
                    <div className='h-[450px] flex justify-center items-center'>
                        <Triangle 
                            color='white'
                            height={50}
                            width={50}
                        />
                    </div> :
                    <div className='mt-5 max-h-[450px] w-full flex flex-col gap-2 overflow-y-scroll scrollbar scrollbar-thumb-purple scrollbar-w-3'>
                        {
                            userAnimeData?.map((anime : userMediaListResponse) => (
                                <MyMediaCard
                                    key={anime.id}
                                    MyAnime={anime}
                                />
                            ))   
                        }
                    </div>
                }
            </div>

        </section>
    )
}

export default MyAnime