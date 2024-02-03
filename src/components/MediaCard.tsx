import {
    searchAnimeResponse,
} from '../types'

import Genre from './Genre'

import {
    timeStampsToRemainingTime,
    formatTime,
} from '../utils'


import {useStore} from '../app/store'
// import { motion } from 'framer-motion'

const MediaCard = ({ anime }: { anime: searchAnimeResponse }) => {



    const {
        setAnimeId
    } = useStore()

    return (
        <div
            onClick={() => setAnimeId(anime.id)}
            className='bg-[#262626] flex rounded-sm hover:border-2 hover:border-purple-700 hover:cursor-pointer'>
            <div
                className='w-[180px]'
            >
                <img
                    alt=""
                    src={anime.coverImage.medium}
                    className='object-cover w-full h-full rounded-tl-sm rounded-bl-sm'
                />

                {/* <div className='absolute bottom-0 w-full p-2 bg-black/70 text-white order-2 border-green-500'>
                    <p className='text-sm'>
                        {anime.title.english ? anime.title.english : anime.title.romaji ? anime.title.romaji : anime.title.native}
                    </p>
                </div> */}
            </div>
            <div className='px-2 flex flex-col gap-1 justify-between w-full text-white'>
                <div className='p-2  h-[calc(80%)]'>
                    <div className=''>
                        {/* <p>{anime?.status}</p> */}
                        {
                            anime?.status === 'RELEASING' ?
                                (
                                    <>
                                        <p className='text-sm'> Episode {anime?.nextAiringEpisode?.episode} aring in </p>
                                        <p className='font-bold'>
                                            {timeStampsToRemainingTime(anime?.nextAiringEpisode?.timeUntilAiring)}
                                        </p>
                                    </>
                                ) :
                                anime?.status === 'FINISHED' && anime?.format === 'TV' ?
                                    (
                                        <>
                                            <p className='font-bold'>
                                                <span>
                                                    {anime?.startDate?.year}
                                                </span>
                                                -
                                                <span>
                                                    {anime?.endDate?.year}
                                                </span>
                                            </p>
                                            <p>
                                                {anime?.episodes} episodes
                                            </p>
                                        </>
                                    ) :

                                    anime?.status === 'NOT_YET_RELEASED' ?
                                        (
                                            <>
                                                <p className='text-sm'>TBA</p>
                                            </>
                                        ) : anime?.status
                        }
                        <p className='text-sm'>
                            {
                                anime?.format === 'TV' ? `${anime?.format} Show` :

                                    anime?.format === 'MOVIE' ? `${anime?.format} ${formatTime(anime?.duration)}` :

                                        anime?.status === 'NOT_YET_RELEASED' ? 'Not Yet Released' : anime?.format

                            }
                        </p>
                    </div>
                    <p className='text-sm mt-2'>
                        {anime.description.trim().length > 150 ?
                            anime.description.trim().substring(0, 150).replace(/<[^>]*>?/gm, '') + "..."
                            : anime.description.trim().replace(/<[^>]*>?/gm, '')
                        }
                    </p>
                </div>
                <div className='p-2 text-sm h-[calc(20%)]'>
                    {anime.genres.slice(0, 2).map((genre) => (
                        <Genre
                            key={genre}
                            genre={genre}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default MediaCard