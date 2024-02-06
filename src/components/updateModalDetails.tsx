import { RxCross2 } from "react-icons/rx"
import { updateAnimeVariable } from "../types"

import useGetUserMediaData from "@/hooks/useGetUserMediaData";

import {
    Triangle
} from 'react-loader-spinner'
import useUpdateUserMedia from "@/hooks/useUpdateUserMedia";

type UpdateModalDetailsProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mediaId: number
}

const UpdateModalDetails = ({ isOpen, setIsOpen, mediaId }: UpdateModalDetailsProps) => {

    const { animeData, tempData, status, setTempData } = useGetUserMediaData({ data: { mediaId } })
    const { updateUserMedia, Toaster } = useUpdateUserMedia({ data: tempData as updateAnimeVariable })

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await updateUserMedia();

    }

    return (
        <div
            //overlay bg-black
            className='absolute top-0 left-0 w-full h-full bg-black/30'
        >
        <Toaster position="top-center" containerStyle={{width : 'calc(88/100 * 600px)', height : '600px'}}/>
        <section
            className={`${isOpen ? 'block' : 'hidden'}
            border-2 border-white/25
            absolute top-1/2 left-1/2 w-[95%] h-[95%] bg-[#1a1a1a]
            transform -translate-x-1/2 -translate-y-1/2
            rounded-sm 
            text-white`
            }>
            {
                status === 'loading' ?
                    <div className='w-full h-full flex justify-center items-center'>
                        <Triangle
                            height={50}
                            width={50}
                            color="white"
                        />
                    </div>
                    : (
                        <div className='relative z-10'>
                                <div className='p-1 absolute right-0 z-10'>                                  
                                    <RxCross2
                                        className='hover:cursor-pointer z-3'
                                        onClick={() => setIsOpen(!isOpen)}
                                        size={25}
                                    />
                                </div>
                            <div className='relative h-[120px] '>
                                <img
                                    src={animeData?.bannerImage}
                                    alt=""
                                    className='w-full h-full opacity-50 object-cover'
                                />
                                <div className='absolute top-8 left-5 flex items-center'>
                                    <img 
                                        src={animeData?.coverImage}
                                        alt="" 
                                        className='rounded-sm'
                                    />
                                    <p className='text-sm ml-2'>
                                        {animeData?.title}
                                    </p>
                                </div>
                            </div>
                            <form
                                onSubmit={submitHandler}
                                className='mt-[5rem] flex flex-wrap justify-center items-center gap-2'>
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

                                <button className='mt-2 w-[125px] bg-[#7330e6] p-1 rounded-sm'>
                                    Update
                                </button>
                            </form>
                        </div>
                    )
            }
        </section>
        </div>
    )
}

export default UpdateModalDetails