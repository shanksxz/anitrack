import AnimeService from "@/requests";
import { useQuery } from "@tanstack/react-query";

const formatUserMediaData =  (response : updateAnimeResponse): { tempData: updateAnimeVariable; animeData: animeDataType } => {
  //? not needed ig but good for readability, lol idk
  const tempData: updateAnimeVariable = {
    mediaId: response?.SaveMediaListEntry?.id,
    score: response?.SaveMediaListEntry?.score,
    status: response?.SaveMediaListEntry?.status as mediaStatus,
    progress: response?.SaveMediaListEntry?.progress,
    repeat: response?.SaveMediaListEntry?.repeat,
    startedAt: response?.SaveMediaListEntry?.startedAt,
    completedAt: response?.SaveMediaListEntry?.completedAt,
  };

  const animeData: animeDataType = {
    title: response?.SaveMediaListEntry?.media?.title?.english ?? response?.SaveMediaListEntry?.media?.title?.romaji,
    bannerImage: response?.SaveMediaListEntry?.media.bannerImage,
    coverImage: response?.SaveMediaListEntry?.media.coverImage.medium,
    description: response?.SaveMediaListEntry?.media.description,
    stats: {
      statusDistribution: response?.SaveMediaListEntry?.media?.stats?.statusDistribution,
      scoreDistribution: response?.SaveMediaListEntry?.media?.stats?.scoreDistribution,
    },
  };

  return { tempData, animeData };
};

export default function useGetUserMediaData({ mediaId }: { mediaId: number }){
  const {
    data: response,
    isLoading,
  } = useQuery({
    queryKey: ["updateMedia", mediaId],
    queryFn: () => AnimeService.updateMedia({ mediaId }),
  })

  return {
    animeData: response ? formatUserMediaData(response).animeData : null,
    tempData: response ? formatUserMediaData(response).tempData : null,
    isLoading,
  }
};

