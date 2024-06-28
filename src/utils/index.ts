import toast from "react-hot-toast"

export const timeStampsToRemainingTime = (timeStamps: number): string => {
    const days = Math.floor(timeStamps / (60 * 60 * 24));
    // const hours = Math.floor((timeStamps % (60 * 60 * 24)) / (60 * 60));

    //? value should not be zero, if it is zero, than dont show it
    return `${days ? `${days} day` : ""}`;
};

export const formatTime = (mins: number): string => {
    if (mins < 60) {
        return `${mins} mins`;
    }
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${hours} hour, ${formattedMinutes} mins`;
};

export function convertExp(exp: number) {
    const date = new Date(exp * 1000);
    const ampm = date.getHours() >= 12 ? "pm" : "am";
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        ampm: ampm,
    };
}

// toasts
export const errorToast = () => toast.error("Error in updating data");
export const loadingToast = () => toast.loading("Updating...");
export const dismissToast = () => toast.dismiss();
export const successToast = () => toast.success("Updated Successfully");



