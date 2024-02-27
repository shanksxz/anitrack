//? return if the media is completed or not,
//? if the media is completed, return the completed media progress
// import {
//     useQuery,
// } from "@tanstack/react-query";
// import { MediaType } from "@/types";
// import AnimeService from "@/requests";

// const useProgress = ({ mediaType, mediaId } : { mediaType: MediaType, mediaId: number }) => {
   
//     const {
//         data : progressData,
//         isLoading,
//         isError,
//         error,
//     } = useQuery({
//         queryFn: () => AnimeService.searchMedia({
//             mediaType,
//             mediaId
//         }),
//         queryKey: ["progress"],
//     })

//     // 
//     const isCompleted = progressData?.media?.status === "COMPLETED"
//     let currentProgress = isCompleted && progressData?.media?.progress

//     const isAiring = progressData?.media?.status === "RELEASING"
//     currentProgress = isAiring && progressData?.media?.nextAiringEpisode?.episode

//     return {
//         isCompleted,
//         isAiring,
//         currentProgress
//     }
    
// }

// export default useProgress