import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AnimeService from "@/requests";
import { animeDataType, updateAnimeVariable } from "@/types";

const useGetUserMediaData = ({ data }: { data: updateAnimeVariable }) => {
    const [localTempData, setLocalTempData] =
        useState<updateAnimeVariable | null>(null);
    const fetchUserMediaData = async () => {
        const k = await AnimeService.updateMedia({ mediaId: data.mediaId });
        const tempData = {
            mediaId: data.mediaId,
            score: k?.SaveMediaListEntry?.score,
            status: k?.SaveMediaListEntry?.status,
            progress: k?.SaveMediaListEntry?.progress,
            repeat: k?.SaveMediaListEntry?.repeat,
            startedAt: k?.SaveMediaListEntry?.startedAt,
            completedAt: k?.SaveMediaListEntry?.completedAt,
        } as updateAnimeVariable;
        setLocalTempData(tempData);
        const animeData = {
            title:
                k?.SaveMediaListEntry?.media?.title?.english === null
                    ? k?.SaveMediaListEntry?.media?.title?.romaji
                    : k?.SaveMediaListEntry?.media?.title?.english,
            bannerImage: k?.SaveMediaListEntry?.media.bannerImage,
            coverImage: k?.SaveMediaListEntry?.media.coverImage.medium,
            description: k?.SaveMediaListEntry?.media.description,
            stats: {
                statusDistribution:
                    k?.SaveMediaListEntry?.media?.stats?.statusDistribution,
                scoreDistribution:
                    k?.SaveMediaListEntry?.media?.stats?.scoreDistribution,
            },
        } as animeDataType;
        return { tempData, animeData };
    };

    const {
        data: result,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["getUserMediaData", data.mediaId],
        queryFn: fetchUserMediaData,
        enabled: data.mediaId !== 0,
        retry: 1,
    });

    return {
        animeData: result?.animeData,
        tempData: localTempData,
        setTempData: setLocalTempData,
        isLoading,
        isError,
    };
};

export default useGetUserMediaData;
