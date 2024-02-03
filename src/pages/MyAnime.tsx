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
import MyAnimeCard from "@/components/MyAnimeCard";



const MyAnime = () => {

    const { userId } = useUserStore();

    const [userAnimeData, setUserAnimeData] = useState<userMediaListResponse[]>();
    const [loading , setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<mediaStatus>('CURRENT');

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const result = await userMediaList(userId,status,'UPDATED_TIME_DESC','ANIME');
            setUserAnimeData(result?.Page?.mediaList);
            setLoading(false);
        } catch (error) {
            console.log(error);
            throw new Error("Error in fetching data");
        }
    };

    useEffect(() => {
        let k = setTimeout(() => {
            fetchUserData();
        }, 1500);
        return () => clearTimeout(k);
    }, [status]);


    return (
        <section className='max-h-full relative p-6 text-white'>
            <h1 className='font-bold text-[2rem]'>My Anime</h1>

            <div className='mt-2'>
                <Select 
                    value={status}
                    onValueChange={(value) => setStatus(value as mediaStatus)}
                >
                    <SelectTrigger className='p-2 w-[180px] text-white bg-[#262626] h-[40px] rounded-sm'>
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
                    <div className='mt-5 max-h-[450px] flex flex-col gap-2 overflow-y-scroll scrollbar scrollbar-thumb-[#7330e6] scrollbar-w-3'>
                        {
                            userAnimeData?.map((anime : userMediaListResponse) => (
                                <MyAnimeCard
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