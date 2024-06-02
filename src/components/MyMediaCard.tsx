import { userMediaListResponse } from "@/types";
import { useState } from "react";
import UpdateModalDetails from "./updateModalDetails";
import useUpdateUserMedia from "@/hooks/useUpdateUserMedia";

const MyMediaCard = ({ MyAnime }: { MyAnime: userMediaListResponse }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(MyAnime?.progress);
    const { mutateAsync, response, error, status } = useUpdateUserMedia();

    const handleIncrement = async () => {
        setProgress((prev) => prev + 1);
        try {
            await mutateAsync({
                mediaId: MyAnime.mediaId,
                progress: progress + 1,
            });
            // response
            console.log({ response, status, error });
        } catch (error) {
            setProgress((prev) => prev - 1);
            throw new Error("Error in updating data");
        }
    };

    return (
        <div className="bg-secondary_bg flex max-h-[100px] gap-2 justify-between items-end rounded-sm">
            <div className="w-full flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center justify-center">
                    <img
                        className="p-1 w-[50px] h-full rounded-sm object-cover"
                        src={MyAnime?.media?.coverImage?.medium}
                        alt={MyAnime?.media?.title?.english}
                    />
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <p className="text-[1.2rem] ">
                            {MyAnime?.media?.title?.userPreferred?.trim().length >
                                40
                                ? MyAnime?.media?.title?.userPreferred
                                    ?.trim()
                                    .substring(0, 40) + "..."
                                : MyAnime?.media?.title?.userPreferred?.trim()}
                        </p>
                        <p className="text-[1.2rem]">
                            {/* //? it's a mess */}
                            {MyAnime?.media?.type === "ANIME" &&
                                MyAnime?.status !== "PLANNING"
                                ? MyAnime?.status === "CURRENT" &&
                                    MyAnime?.media?.status === "RELEASING" &&
                                    MyAnime?.media?.type === "ANIME"
                                    ? `Episodes: ${progress}`
                                    : `Episode: ${progress}/${MyAnime?.media.episodes? MyAnime?.media.episodes : 0}`
                                : ""}
                            {MyAnime?.media?.type === "MANGA" &&
                                MyAnime?.status !== "PLANNING"
                                ? MyAnime?.status === "CURRENT" &&
                                    MyAnime?.media?.status === "RELEASING" &&
                                    MyAnime?.media?.type === "MANGA"
                                    ? `Chapter: ${progress}`
                                    : `Chapter: ${progress}/${MyAnime?.media.chapters}`
                                : ""}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleIncrement}
                    className="mr-2 px-2 py-1 rounded-sm bg-accent_bg text-dark_text"
                >
                    +1
                </button>
            </div>
            {isOpen && (
                <UpdateModalDetails
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    mediaId={MyAnime.mediaId}
                />
            )}
        </div>
    );
};

export default MyMediaCard;
