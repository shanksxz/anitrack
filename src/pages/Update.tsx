import { Triangle } from "react-loader-spinner";
// import { updateAnimeVariable } from "@/types";
import { useStore } from "@/app/store";

// hook
import useGetUserMediaData from "@/hooks/useGetUserMediaData";
import useUpdateUserMedia from "@/hooks/useUpdateUserMedia";
import { IoIosArrowBack } from "react-icons/io";
import ScoreDistribution from "@/components/ScoreDistribution";


//modal
// import UpdateModalDetails from "@/components/updateModalDetails";
// import { useState } from "react";  
   
const Update = () => {

    //? state of modal
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);

    const { animeId, setAnimeId } = useStore();
    const { animeData, isLoading } = useGetUserMediaData({
        data: { mediaId: animeId },
    });
    const { Toaster } = useUpdateUserMedia();

    // console.log("Checking ", animeData);

    return (
        <>
            {isLoading ? (
                <div className="max-h-[600px] flex justify-center items-center">
                    <Triangle height={50} width={50} color="white" />
                </div>
            ) : (
                <div className="w-full h-full relative z-10">
                    <Toaster
                        position="top-center"
                        containerStyle={{
                            width: "calc(88/100 * 600px)",
                            height: "600px",
                        }}
                    />
                    <div className="p-1 absolute right-0 z-10">
                        <IoIosArrowBack
                            color="white"
                            size={30}
                            className="p-1 hover:cursor-pointer"
                            onClick={() => setAnimeId(0)}
                        />
                    </div>
                    <div className="relative h-[120px]">
                        <img
                            src={animeData?.bannerImage}
                            alt=""
                            className="w-full max-h-[120px] opacity-35 object-cover"
                        />
                        <div className="absolute top-8 left-5 flex items-center">
                            <img
                                src={animeData?.coverImage}
                                alt=""
                                className="rounded-sm"
                            />
                            <p className="text-white text-[1.2rem] ml-2 mb-2 font-bold">
                                {animeData?.title}
                            </p>
                        </div>
                    </div>
                    <div className='p-5 mt-[4rem] h-[400px] overflow-y-scroll scrollbar scrollbar-thumb-purple'>
                        <p className="text-white">
                            {animeData?.description?.trim().replace(/<[^>]*>?/gm, '')}
                        </p>

                        <div className='mt-4'>
                            <ScoreDistribution
                                statusDistribution={animeData?.stats?.statusDistribution || []}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Update;
