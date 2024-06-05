import Genre from "./Genre";
import { timeStampsToRemainingTime, formatTime } from "../utils";
import { useState } from "react";
import UpdateModalDetails from "./updateModalDetails";


//? any better way to do this?
const getStatusText = (media: searchMediaResponse) => {
    if (media?.status === "RELEASING" && media?.type === "ANIME") {
        return (
            <>
                <p className="">
                    {" "}
                    Episode {media?.nextAiringEpisode?.episode} airing in{" "}
                </p>
                <p className="font-bold">
                    {timeStampsToRemainingTime(
                        media?.nextAiringEpisode?.timeUntilAiring
                    )}
                </p>
            </>
        );
    } else if (media?.status === "FINISHED" && media?.format === "TV") {
        return (
            <>
                <p className="font-bold">
                    <span>{media?.startDate?.year}</span>-
                    <span>{media?.endDate?.year}</span>
                </p>
                <p>{media?.episodes} episodes</p>
            </>
        );
    } else if (media?.status === "NOT_YET_RELEASED") {
        return (
            <>
                <p className="text-sm">TBA</p>
            </>
        );
    } else {
        return <p>{media?.status}</p>;
    }
};

const getFormatText = (media: searchMediaResponse) => {
    if (media?.format === "TV") {
        return `${media?.format} Show`;
    } else if (media?.format === "MOVIE") {
        return `${media?.format} ${formatTime(media?.duration)}`;
    } else if (media?.status === "NOT_YET_RELEASED") {
        return "Not Yet Released";
    } else {
        return media?.format;
    }
};

const MediaCard = ({ media }: { media: searchMediaResponse }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="bg-secondary_bg flex hover:cursor-pointer w-full h-[400px]"
        >
            <div className="relative w-[200px]">
                <img
                    alt=""
                    src={media.coverImage.medium}
                    className="object-cover w-full h-full rounded-tl-sm rounded-bl-sm"
                />

                <div className="absolute bottom-0 w-full p-2 bg-black/50 text-dark_text font-bold">
                    <p className="text-[1rem]">
                        {media.title.english
                            ? media.title.english
                            : media.title.romaji
                                ? media.title.romaji
                                : media.title.native}
                    </p>
                </div>
            </div>
            <div className="px-2 flex flex-col gap-1 justify-between w-full text-primary_text"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="p-2  h-[calc(80%)]">
                    <div className="text-[1.2rem]">
                        {getStatusText(media)}
                        {getFormatText(media)}
                    </div>
                    <p className="text-sm mt-2">
                        {media?.description?.trim() !== null &&
                            media?.description?.trim().length > 150
                            ? media?.description
                                ?.trim()
                                .substring(0, 150)
                                .replace(/<[^>]*>?/gm, "") + "..."
                            : media?.description
                                ?.trim()
                                .replace(/<[^>]*>?/gm, "")}
                        {media?.description === null
                            ? "No description available"
                            : ""}
                    </p>
                </div>
                <div className="p-2 text-sm h-[calc(20%)]">
                    {media.genres.slice(0, 2).map((genre) => (
                        <Genre key={genre} genre={genre} />
                    ))}
                </div>
            </div>

            {isOpen && (
                <UpdateModalDetails
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    mediaId={media?.id}
                />
            )
            }
        </div>
    );

};

export default MediaCard;
