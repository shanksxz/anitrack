import useGetUserMediaData from "@/hooks/useGetUserMediaData";
import { Triangle } from "react-loader-spinner";
import useUpdateUserMedia from "@/hooks/useUpdateUserMedia";
import SelectComp from "./Select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useForm, SubmitHandler } from "react-hook-form"

//TODO: Clean this mess
type mediaStatus =
    | "CURRENT"
    | "PLANNING"
    | "COMPLETED"
    | "DROPPED"
    | "PAUSED"
    | "REPEATING";

// have to change date type from object to string
type updateAnimeVariable = {
    mediaId: number;
    status?: mediaStatus;
    score?: number;
    progress?: number;
    repeat?: number;
    startedAt?: string;
    completedAt?: string;
};

type UpdateModalDetailsProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mediaId: number;
};


export default function UpdateModalDetails({ isOpen, setIsOpen, mediaId }: UpdateModalDetailsProps){
    
    const { animeData, tempData, isLoading } = useGetUserMediaData({ mediaId });
    const { mutateAsync, response, status, error } = useUpdateUserMedia();

    const {
        register,
        handleSubmit,
    } = useForm<updateAnimeVariable>({
        values: {
            mediaId: 21,
            status: tempData?.status || "CURRENT",
            score: tempData?.score || 0,
            progress: tempData?.progress || 0,
            repeat: tempData?.repeat || 0,
            startedAt: tempData?.startedAt?.year ? `${tempData?.startedAt?.year}-${tempData?.startedAt?.month?.toString()
                .padStart(2, "0")}-${tempData?.startedAt?.day?.toString().padStart(2, "0")}` : "",
            completedAt: tempData?.completedAt?.year ? `${tempData?.completedAt?.year}-${tempData?.completedAt?.month?.toString()
                .padStart(2, "0")}-${tempData?.completedAt?.day?.toString().padStart(2, "0")}` : "",
        }
    })

    const onSubmit: SubmitHandler<updateAnimeVariable> = async (data) => {
        // convert date to object
        const startedAt = data.startedAt ? {
            year: Number(data.startedAt.split("-")[0]),
            month: Number(data.startedAt.split("-")[1]),
            day: Number(data.startedAt.split("-")[2]),
        } : undefined

        const completedAt = data.completedAt ? {
            year: Number(data.completedAt.split("-")[0]),
            month: Number(data.completedAt.split("-")[1]),
            day: Number(data.completedAt.split("-")[2]),
        } : undefined

        try {
            await mutateAsync({
                ...data,
                startedAt,
                completedAt,
            })
            // print response
            console.log({ response, status, error })
        } catch (error) {
            console.log("error in updating data")
        }
    }

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogContent className="p-0 rounded-none">
                {isLoading ? (
                    <div className="p-10 flex justify-center items-center">
                        <Triangle height={50} width={50} color="#02a9ff" />
                    </div>
                ) : (
                    <div className="relative">
                        <div className="relative h-[120px]">
                            <img
                                src={animeData?.bannerImage}
                                alt=""
                                className="w-full h-full opacity-30 object-cover"
                            />
                            <div className="absolute top-5 left-5 flex items-center">
                                <img
                                    src={animeData?.coverImage}
                                    alt=""
                                    className="rounded-sm"
                                />
                                <p className="text-[1.2rem] text-primary_text font-bold ml-2">
                                    {animeData?.title}
                                </p>
                            </div>
                        </div>
                        <form className="mt-[4rem] mb-5 grid grid-cols-3 items-end gap-2 px-5" onSubmit={handleSubmit(onSubmit)} >
                            {/* //TODO: Add input validation here */}
                            <Label>
                                Status
                                <SelectComp
                                    {...register("status")}
                                    options={[
                                        { value: "CURRENT", label: "Current" },
                                        { value: "COMPLETED", label: "Completed" },
                                        { value: "PLANNING", label: "Planning" },
                                        { value: "DROPPED", label: "Dropped" },
                                    ]}
                                    value="CURRENT"
                                />
                            </Label>
                            <Label>
                                Score
                                <Input
                                    type="number"
                                    step={0.1}
                                    {...register("score")}
                                />
                            </Label>
                            <Label>
                                Episodes
                                <Input
                                    type="number"
                                    {...register("progress")}
                                />
                            </Label>
                            <Label>
                                Repeat
                                <Input
                                    type="number"
                                    {...register("repeat")}
                                />
                            </Label>
                            <Label>
                                Started At
                                <Input
                                    type="date"
                                    {...register("startedAt")}
                                />
                            </Label>
                            <Label>
                                Completed At
                                <Input
                                    type="date"
                                    {...register("completedAt", {
                                        setValueAs: (v) => {
                                            // return new Date(v).toISOString()
                                            // return in object format like this { year: 2021, month: 10, day: 10 }
                                            return v
                                        }
                                    })}
                                />
                            </Label>
                            <Button type="submit">
                                Update
                            </Button>
                            <Button type="button" onClick={() => console.log("cancel")}>
                                Cancel
                            </Button>
                        </form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

