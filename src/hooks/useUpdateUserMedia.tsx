import AnimeService from "@/requests";
import { updateAnimeVariable } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateUserMedia() {
    const {
        mutateAsync,
        data: response,
        error,
        status
    } = useMutation({
        mutationKey: ["updateMedia"],
        mutationFn: (data: updateAnimeVariable) => AnimeService.updateMedia({ ...data }),
        onSuccess: () => { }
    })


    return {
        mutateAsync,
        response,
        error,
        status
    }
};

