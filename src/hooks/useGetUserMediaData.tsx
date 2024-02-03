import { updateMedia } from "@/requests"
import { animeDataType, updateAnimeVariable } from "@/types"
import { useEffect, useState } from "react"

const useGetUserMediaData = ({data} : {data : updateAnimeVariable}) => {
        const [tempData, setTempData] = useState<updateAnimeVariable | null>(null)
        const [animeData, setAnimeData] = useState<animeDataType>({} as animeDataType)
        const [status, setStatus] = useState<string>('')

        useEffect(() => {
            const fetchData = async () => {
                try {
                    setStatus('loading')
                    const k = await updateMedia({ mediaId : data.mediaId })
                    setTempData({
                        mediaId: data.mediaId,
                        score: k?.SaveMediaListEntry?.score,
                        status: k?.SaveMediaListEntry?.status,
                        progress: k?.SaveMediaListEntry?.progress,
                        repeat: k?.SaveMediaListEntry?.repeat,
                        startedAt: k?.SaveMediaListEntry?.startedAt,
                        completedAt: k?.SaveMediaListEntry?.completedAt,
                    } as updateAnimeVariable)
                    setAnimeData({
                        title: k?.SaveMediaListEntry?.media?.title?.english === null ? k?.SaveMediaListEntry?.media?.title?.romaji : k?.SaveMediaListEntry?.media?.title?.english,
                        bannerImage: k?.SaveMediaListEntry?.media.bannerImage,
                        coverImage: k?.SaveMediaListEntry?.media.coverImage.medium,
                        description: k?.SaveMediaListEntry?.media.description,
                    } as animeDataType)
                    console.log(k)
                    console.log(animeData)
                    setStatus('success')
                } catch (error) {
                    throw new Error('Error in fetching data')
                }
            }
            fetchData()
        }, [])

        return {
            animeData,
            tempData,
            status,
            setTempData
        }
}

export default useGetUserMediaData