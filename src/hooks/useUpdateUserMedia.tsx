import { updateMedia } from "@/requests"
import { updateAnimeVariable } from "@/types"

import toast, {Toaster} from "react-hot-toast"
const errorToast = () => toast.error('Error in updating data',)
const loadingToast = () => toast.loading('Updating...')
const dismissToast = () => toast.dismiss()
const successToast = () => toast.success('Updated Successfully')


const useUpdateUserMedia = ({data} : {data : updateAnimeVariable}) => {

    const updateUserMedia = async () => {
        try {
            loadingToast();
            const res = await updateMedia({...data})
            if (res?.SaveMediaListEntry === null) {
                throw new Error('Error in updating data')
            }
            dismissToast();
            successToast();
        } catch (error) {
            errorToast()
        }
    }

    return {
        updateUserMedia,
        Toaster
    }
}

export default useUpdateUserMedia