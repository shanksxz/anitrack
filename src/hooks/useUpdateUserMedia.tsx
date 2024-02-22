import { useMutation } from "@tanstack/react-query";
import AnimeService from "@/requests";
import { updateAnimeVariable } from "@/types";
import toast, { Toaster } from "react-hot-toast";

const errorToast = () => toast.error("Error in updating data");
const loadingToast = () => toast.loading("Updating...");
const dismissToast = () => toast.dismiss();
const successToast = () => toast.success("Updated Successfully");

const useUpdateUserMedia = () => {
    const mutation = useMutation({
        mutationFn: (data: updateAnimeVariable) =>
            AnimeService.updateMedia({ ...data }),
        onMutate: () => {
            loadingToast();
        },
        onError: () => {
            dismissToast();
            errorToast();
        },
        onSuccess: (res) => {
            dismissToast();
            if (res?.SaveMediaListEntry === null) {
                throw new Error("Error in updating data");
            }
            successToast();
        },
    });

    return {
        updateUserMedia: mutation.mutateAsync,
        Toaster,
    };
};

export default useUpdateUserMedia;
