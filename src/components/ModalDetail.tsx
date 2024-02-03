// import { RxCross2 } from "react-icons/rx"
// // import useStore from "../app/store"
// import { ModalDetailProps } from "../types"
// import { motion } from "framer-motion"

// const ModalDetail = ({isOpen, setIsOpen} : ModalDetailProps) => {

//     const {
//         mediaType,
//         setMediaType,
//         setAccessToken
//     } = useStore()

//     const mediaTypeChangeHandler = () => {
//         if(mediaType === 'ANIME') {
//             setMediaType('MANGA')
//             localStorage.setItem('mediaType', 'MANGA')
//         } else {
//             setMediaType('ANIME')
//             localStorage.setItem('mediaType', 'ANIME')
//         }
//     }

//     const LogoutHandler = () => {
//         localStorage.removeItem('accessToken')
//         localStorage.removeItem('mediaType')
//         setAccessToken('')
//         // window.location.reload() // does we need to reload the page?
//     }

//   return (
//         <motion.section 
//             initial={{ opacity: 0, y: -100 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ ease: 'easeOut', duration: 0.5 }}
//             // exit={{ opacity: 0}}
//             className="font-roboto_mono m-3 p-2 flex flex-col bg-black text-white rounded-sm">
//             <div className="px-2 p-1 flex justify-between items-center">
//                 <h1 className='font-bold'>Settings</h1>
//                 <RxCross2 
//                     className='hover:cursor-pointer' 
//                     onClick={() => setIsOpen(!isOpen)} 
//                     size={25}
//                     />
//             </div>
//             <div>
//                 <div className='mt-1 px-2 py-1 flex justify-between items-center hover:border-2 hover:border-purple-600 rounded-sm'>
//                     <h1 className='font-bold'>Search</h1>
//                     <button onClick={mediaTypeChangeHandler} className='outline-none px-2 p-1 rounded-sm bg-white text-black hover:border-2 hover:border-purple-700'>{mediaType}</button>
//                 </div>
//                 <p className='font-roboto mt-1 px-2 p-1'>
//                     You can change the search filter to either anime or manga by clicking on above button,
//                     and then re-search for your favorite anime or manga.
//                 </p>
//                 <button onClick={LogoutHandler} className="ml-2 mb-2 mt-2 rounded-sm py-1 w-[100px] bg-white text-black hover:border-2 hover:border-purple-700" >Logout</button>
//             </div>

//         </motion.section>
//   )
// }

// export default ModalDetail