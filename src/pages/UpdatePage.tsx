import { Triangle } from "react-loader-spinner";
import {updateAnimeVariable } from "@/types";
import { useStore } from "@/app/store";

// hook
import useGetUserMediaData from "@/hooks/useGetUserMediaData";
import useUpdateUserMedia from "@/hooks/useUpdateUserMedia";


import { IoIosArrowBack } from "react-icons/io";



const UpdatePage = () => {


    const {
        animeId,
        setAnimeId
    } = useStore()

    const { animeData, tempData, status, setTempData } = useGetUserMediaData({ data: { mediaId: animeId } })
    const { updateUserMedia, Toaster } = useUpdateUserMedia({ data: tempData as updateAnimeVariable })


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await updateUserMedia();
    }

  return (
    <div>
         {
            status === 'loading' ?
                    <div className='h-[600px] flex justify-center items-center'>
                        <Triangle
                            height={50}
                            width={50}
                            color="white"
                        />
                    </div>
                    : (
                        <div className='w-full h-full relative z-10'>
                                <Toaster position="top-center" containerStyle={{width : 'calc(88/100 * 600px)', height : '600px'}}/>
                                <div className='p-1 absolute right-0 z-10'>                                  
                                <IoIosArrowBack
                                    color="white"
                                    size={30}
                                    className='p-1 hover:cursor-pointer'
                                    onClick={() => setAnimeId(0)}
                                />
    
                                </div>
                            <div className='relative h-[120px] bg-gradient-to-b from-transparent to-black'>
                                <img
                                    src={animeData?.bannerImage}
                                    alt=""
                                    className='w-full max-h-[120px] opacity-5 object-cover'
                                />
                                <div className='absolute top-8 left-5 flex items-center'>
                                    <img 
                                        src={animeData?.coverImage}
                                        alt="" 
                                        className='rounded-sm'
                                    />
                                    <p className='text-white text-sm ml-2'>
                                        {animeData?.title}
                                    </p>
                                </div>
                            </div>
                            <form
                                onSubmit={submitHandler}
                                className='mt-[5rem] px-4 flex flex-wrap justify-center items-center gap-2'>
                                <label className='update-label'>
                                    <p>Status</p>
                                    <select
                                        className='label-element'
                                        value={tempData?.status}
                                        onChange={
                                            (e) => {
                                                const value = e.target.value;
                                                if (value === 'COMPLETED') {
                                                    setTempData((init) => {
                                                        if (init) return {
                                                            ...init,
                                                            completedAt: {
                                                                year: new Date().getFullYear(),
                                                                month: new Date().getMonth() + 1,
                                                                day: new Date().getDate()
                                                            } as updateAnimeVariable['completedAt'],
                                                            status: value as updateAnimeVariable['status']
                                                        }
                                                        return null;
                                                    })
                                                } else {
                                                    setTempData((init) => {
                                                        if (init) return {
                                                            ...init,
                                                            status: value as updateAnimeVariable['status']
                                                        }

                                                        return null;

                                                    })
                                                }
                                            }
                                        }>
                                        <option value="CURRENT">CURRENT</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                        <option value="PLANNING">PLANNING</option>
                                        <option value="DROPPED">DROPPED</option>
                                        <option value="PAUSED">PAUSED</option>
                                        <option value="REPEATING">REPEATING</option>
                                    </select>
                                </label>
                                <label className='update-label'>
                                    <p>Score</p>
                                    <input
                                        type="number"
                                        className='label-element inputSpinner'
                                        value={
                                            tempData?.score
                                        }
                                        onChange={
                                            (e) => {
                                                let value = e.target.valueAsNumber;
                                                if (!value) value = 0;
                                                if (value < 0) value = 0;
                                                if (value > 10) value = 10;
                                                setTempData((init) => {
                                                    if (init) return { ...init, score: value };
                                                    return null;
                                                });
                                            }
                                        }
                                    />
                                </label>
                                <label className='update-label'>
                                    <p>Progress</p>
                                    <input
                                        type="number"
                                        className='label-element'
                                        value={
                                            tempData?.progress
                                        }
                                        onChange={
                                            (e) => {
                                                let value = e.target.valueAsNumber;
                                                if (!value) value = 0;
                                                if (value < 0) value = 0;
                                                if (value > 10000) value = 10000;
                                                setTempData((init) => {
                                                    if (init) return { ...init, progress: value };
                                                    return null;
                                                });
                                            }
                                        }
                                    />
                                </label>
                                <label className='update-label'>
                                    <p>Repeat</p>
                                    <input type="number"
                                        className='label-element'
                                        value={
                                            tempData?.repeat
                                        }
                                        onChange={
                                            (e) => {
                                                let value = e.target.valueAsNumber;
                                                if (!value || value < 0) value = 0;
                                                if (value > 10000) value = 10000;
                                                setTempData((init) => {
                                                    if (init) return { ...init, repeat: value };
                                                    return null;
                                                });
                                            }
                                        }
                                    />
                                </label>
                                <label className='update-label'>
                                    <p>StartedAt</p>
                                    <input
                                        type='date'
                                        className='label-element'
                                        value={
                                            !tempData?.startedAt?.year
                                            ? ""
                                                : `${tempData.startedAt.year}-${tempData.startedAt.month
                                                    ?.toString()
                                                    .padStart(2, "0")}-${tempData.startedAt.day
                                                        ?.toString()
                                                        .padStart(2, "0")}`
                                                    }
                                                    onChange={
                                            (e) => {
                                                const value = e.target.value;
                                                const [year, month, day] = value.split("-");
                                                setTempData((init) => {
                                                    if (init)
                                                    return {
                                                ...init,
                                                            startedAt: {
                                                                year: parseInt(year),
                                                                month: parseInt(month),
                                                                day: parseInt(day),
                                                            },
                                                        };
                                                    return null;
                                                });
                                            }
                                        }
                                    />
                                </label>
                                <label className='update-label'>
                                    <p>CompletedAt</p>
                                    <input
                                        className='label-element'
                                        type='date'
                                        value={
                                            !tempData?.completedAt?.year
                                            ? ""
                                            : `${tempData.completedAt.year}-${tempData.completedAt.month
                                                    ?.toString()
                                                    .padStart(2, "0")}-${tempData.completedAt.day
                                                        ?.toString()
                                                        .padStart(2, "0")}`
                                                    }
                                                    onChange={
                                            (e) => {
                                                const value = e.target.value;
                                                const [year, month, day] = value.split("-");
                                                setTempData((init) => {
                                                    if (init)
                                                        return {
                                                    ...init,
                                                            completedAt: {
                                                                year: parseInt(year),
                                                                month: parseInt(month),
                                                                day: parseInt(day),
                                                            },
                                                        };
                                                    return null;
                                                });
                                            }
                                        }
                                    />
                                </label>

                                <button className='mt-2 w-[125px] text-white bg-[#7330e6] p-1 rounded-sm'
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    )
            }
    </div>
  )
}

export default UpdatePage