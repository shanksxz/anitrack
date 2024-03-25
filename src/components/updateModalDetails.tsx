import { RxCross2 } from "react-icons/rx";
import { updateAnimeVariable } from "../types";
import useGetUserMediaData from "@/hooks/useGetUserMediaData";
import { Triangle } from "react-loader-spinner";
import useUpdateUserMedia from "@/hooks/useUpdateUserMedia";
import SelectComp from "./Select";

type UpdateModalDetailsProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mediaId: number;
};

const UpdateModalDetails = ({ isOpen, setIsOpen, mediaId }: UpdateModalDetailsProps) => {
    const { animeData, tempData, setTempData, isLoading } = useGetUserMediaData({ data: { mediaId }});
    const { updateUserMedia, Toaster } = useUpdateUserMedia();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateUserMedia({ ...tempData, mediaId });
        } catch (error) {
            throw Error("Error in updating data");
        }
    };

    // console.log("Loading: ", isLoading)/

    return (
        <div className="absolute top-0 z-10 left-0 w-full h-full bg-black/80">
            <Toaster
                position="top-center"
                containerStyle={{
                    width: "calc(88/100 * 600px)",
                    height: "600px",
                }}
            />
            <section
                className={`
                    ${isOpen ? "block" : "hidden"}
                    border-2 border-white/25
                    absolute top-1/2 left-1/2 w-[95%] h-[65%] bg-primary_bg
                    transform -translate-x-1/2 -translate-y-1/2
                    rounded-sm 
                `}>
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <Triangle height={50} width={50} color="#02a9ff" />
                    </div>
                ) : (
                    <div className="relative z-10">
                        <div className="p-1 absolute right-0 z-10">
                            <RxCross2
                                className="hover:cursor-pointer text-primary_text"
                                onClick={() => setIsOpen(!open)}
                                size={25}
                            />
                        </div>
                        <div className="relative h-[120px] ">
                            <img
                                src={animeData?.bannerImage}
                                alt=""
                                className="w-full h-full opacity-30 object-cover"
                            />
                            <div className="absolute top-8 left-5 flex items-center">
                                <img
                                    src={animeData?.coverImage}
                                    alt=""
                                    className="rounded-sm"
                                />
                                <p className="text-[1.5rem] text-primary_text  font-bold ml-2">
                                    {animeData?.title}
                                </p>
                            </div>
                        </div>

                        <form
                            onSubmit={submitHandler}
                            className="mt-[5rem] flex items-center justify-center gap-2 flex-wrap"
                        >
                            <label className="update-label">
                                <p>Status</p>
                                <SelectComp 
                                    value={tempData?.status as string}
                                    onValueChange={(value) => {
                                        if (value === "COMPLETED") {
                                            setTempData((prev) => {
                                                if (prev)
                                                    return {
                                                        ...prev,
                                                        completedAt: {
                                                            year: new Date().getFullYear(),
                                                            month:
                                                                new Date().getMonth() +
                                                                1,
                                                            day: new Date().getDate(),
                                                        } as updateAnimeVariable["completedAt"],
                                                        status: value as updateAnimeVariable["status"],
                                                    };
                                                return null;
                                            });
                                        } else {
                                            setTempData((prev) => {
                                                if (prev)
                                                    return {
                                                        ...prev,
                                                        status: value as updateAnimeVariable["status"],
                                                    };

                                                return null;
                                            });
                                        }
                                    }}
                                    options={[
                                        { value: "CURRENT", label: "CURRENT" },
                                        { value: "COMPLETED", label: "COMPLETED" },
                                        { value: "PLANNING", label: "PLANNING" },
                                        { value: "DROPPED", label: "DROPPED" },
                                        { value: "PAUSED", label: "PAUSED" },
                                        { value: "REPEATING", label: "REPEATING" },
                                    ]}
                                    width="w-[100px]" 
                                />
                                {/* <select
                                    className="label-element"
                                    value={tempData?.status}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "COMPLETED") {
                                            setTempData((prev) => {
                                                if (prev)
                                                    return {
                                                        ...prev,
                                                        completedAt: {
                                                            year: new Date().getFullYear(),
                                                            month:
                                                                new Date().getMonth() +
                                                                1,
                                                            day: new Date().getDate(),
                                                        } as updateAnimeVariable["completedAt"],
                                                        status: value as updateAnimeVariable["status"],
                                                    };
                                                return null;
                                            });
                                        } else {
                                            setTempData((prev) => {
                                                if (prev)
                                                    return {
                                                        ...prev,
                                                        status: value as updateAnimeVariable["status"],
                                                    };

                                                return null;
                                            });
                                        }
                                    }}
                                >
                                    <option value="CURRENT">CURRENT</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                    <option value="PLANNING">PLANNING</option>
                                    <option value="DROPPED">DROPPED</option>
                                    <option value="PAUSED">PAUSED</option>
                                    <option value="REPEATING">REPEATING</option>
                                </select> */}
                            </label>
                            <label className="update-label">
                                <p>Score</p>
                                <input
                                    type="number"
                                    className="label-element inputSpinner"
                                    value={tempData?.score}
                                    onChange={(e) => {
                                        let value = e.target.valueAsNumber;
                                        if (value < 0) value = 0;
                                        if (value > 10) value = 10;
                                        setTempData((prev) => {
                                            if (prev)
                                                return {
                                                    ...prev,
                                                    score: value,
                                                };
                                            return null;
                                        });
                                    }}
                                />
                            </label>
                            <label className="update-label">
                                <p>Progress</p>
                                <input
                                    type="number"
                                    className="label-element"
                                    value={tempData?.progress}
                                    onChange={(e) => {
                                        let value = e.target.valueAsNumber;
                                        if (value < 0) value = 0;
                                        if (value > 10000) value = 10000;
                                        setTempData((prev) => {
                                            if (prev)
                                                return {
                                                    ...prev,
                                                    progress: value,
                                                };
                                            return null;
                                        });
                                    }}
                                />
                            </label>
                            <label className="update-label">
                                <p>Repeat</p>
                                <input
                                    type="number"
                                    className="label-element"
                                    value={tempData?.repeat}
                                    onChange={(e) => {
                                        let value = e.target.valueAsNumber;
                                        if (value > 10000) value = 10000;
                                        setTempData((prev) => {
                                            if (prev)
                                                return {
                                                    ...prev,
                                                    repeat: value,
                                                };
                                            return null;
                                        });
                                    }}
                                />
                            </label>
                            <label className="update-label">
                                <p>StartedAt</p>
                                <input
                                    type="date"
                                    className="label-element"
                                    value={
                                        !tempData?.startedAt?.year
                                            ? ""
                                            : `${tempData.startedAt.year}-${tempData.startedAt.month
                                                  ?.toString()
                                                  .padStart(
                                                      2,
                                                      "0"
                                                  )}-${tempData.startedAt.day
                                                  ?.toString()
                                                  .padStart(2, "0")}`
                                    }
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const [year, month, day] =
                                            value.split("-");
                                        setTempData((prev) => {
                                            if (prev)
                                                return {
                                                    ...prev,
                                                    startedAt: {
                                                        year: parseInt(year),
                                                        month: parseInt(month),
                                                        day: parseInt(day),
                                                    },
                                                };
                                            return null;
                                        });
                                    }}
                                />
                            </label>
                            <label className="update-label">
                                <p>CompletedAt</p>
                                <input
                                    className="label-element"
                                    type="date"
                                    value={
                                        !tempData?.completedAt?.year
                                            ? ""
                                            : `${tempData.completedAt.year}-${tempData.completedAt.month
                                                  ?.toString()
                                                  .padStart(
                                                      2,
                                                      "0"
                                                  )}-${tempData.completedAt.day
                                                  ?.toString()
                                                  .padStart(2, "0")}`
                                    }
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const [year, month, day] =
                                            value.split("-");
                                        setTempData((prev) => {
                                            if (prev)
                                                return {
                                                    ...prev,
                                                    completedAt: {
                                                        year: parseInt(year),
                                                        month: parseInt(month),
                                                        day: parseInt(day),
                                                    },
                                                };
                                            return null;
                                        });
                                    }}
                                />
                            </label>

                            <button className="mt-8 w-[100px] bg-accent_bg text-primary_text px-2 py-1 rounded-sm">
                                Update
                            </button>
                            {/* {error && <p className="text-red-500">{error}</p>} */}
                        </form>
                    </div>
                )}
            </section>
        </div>
    );
};

export default UpdateModalDetails;
