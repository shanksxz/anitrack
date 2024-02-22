//? idk tried react-hook-form

// import { updateAnimeVariable } from "@/types";
// import useGetUserMediaData from "./useGetUserMediaData";
// import useUpdateUserMedia from "./useUpdateUserMedia";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useEffect } from "react";

// const UseFormUpdate = ({ mediaId }: { mediaId: number }) => {
//     const { tempData } = useGetUserMediaData({ data: { mediaId } });
//     const { updateUserMedia } = useUpdateUserMedia();

//     console.log(tempData);

//     const {
//         register,
//         handleSubmit,
//         // formState: { errors },
//         reset,
//     } = useForm<updateAnimeVariable>();

//     useEffect(() => {
//         if (tempData) {
//             reset({
//                 ...tempData,
//                 mediaId: mediaId,
//             });
//         }
//     }, [tempData]);

//     const submitHandler: SubmitHandler<updateAnimeVariable> = async (data) => {
//         try {
//             await updateUserMedia(data as updateAnimeVariable);
//         } catch (error) {
//             throw Error("Error in updating data");
//         }
//     };

//     return (
//         <form
//             onSubmit={handleSubmit(submitHandler)}
//             className="mt-[5rem] flex flex-wrap justify-center items-center gap-2"
//         >
//             <label className="update-label">
//                 <p>Status</p>
//                 <select
//                     className="label-element"
//                     {...register("status", {
//                         required: true,
//                     })}
//                 >
//                     <option value="CURRENT">CURRENT</option>
//                     <option value="COMPLETED">COMPLETED</option>
//                     <option value="PLANNING">PLANNING</option>
//                     <option value="DROPPED">DROPPED</option>
//                     <option value="PAUSED">PAUSED</option>
//                     <option value="REPEATING">REPEATING</option>
//                 </select>
//             </label>
//             <label className="update-label">
//                 <p>Score</p>
//                 <input
//                     type="number"
//                     className="label-element inputSpinner"
//                     {...register("score", {
//                         required: true,
//                         min: 0,
//                         max: 10,
//                         valueAsNumber: true,
//                     })}
//                 />
//             </label>
//             <label className="update-label">
//                 <p>Progress</p>
//                 <input
//                     type="number"
//                     className="label-element"
//                     {...register("progress", {
//                         required: true,
//                         min: 0,
//                         max: 10000,
//                         valueAsNumber: true,
//                     })}
//                 />
//             </label>
//             <label className="update-label">
//                 <p>Repeat</p>
//                 <input
//                     type="number"
//                     className="label-element"
//                     {...register("repeat", {
//                         required: true,
//                         min: 0,
//                         max: 10000,
//                         valueAsNumber: true,
//                     })}
//                 />
//             </label>
//             <label className="update-label">
//                 <p>StartedAt</p>
//                 <input
//                     type="date"
//                     className="label-element"
//                     {...register("startedAt", {
//                         required: true,
//                     })}
//                 />
//             </label>
//             <label className="update-label">
//                 <p>CompletedAt</p>
//                 <input
//                     className="label-element"
//                     type="date"
//                     {...register("completedAt", {
//                         required: true,
//                     })}
//                 />
//             </label>

//             <button className="mt-2 w-[125px] bg-[#7330e6] p-1 rounded-sm">
//                 Update
//             </button>
//         </form>
//     );
// };

// export default UseFormUpdate;
