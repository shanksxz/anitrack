import { useEffect,useState } from "react";
import {
    userDetails,
} from "../requests/index";
import { ViewerQueryResponse } from "@/types";


import { MdLiveTv } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";


// zustand
import {
    useUserStore,
} from "@/app/store";

import {
    currentUI
} from "@/app/store";



const SideBar = () => {
    const {
        setUserId,
        setUserName
    } = useUserStore();

    const {
        setCurrentTab
    } = currentUI();

    const [userData, setUserData] = useState<ViewerQueryResponse>(
        JSON.parse(localStorage.getItem('userDetail') || '{}')
    );

    const fetchUserData = async () => {
        try {
            const k = await userDetails();
            setUserId(k?.Viewer.id);
            setUserData(k);
            localStorage.setItem('userDetail', JSON.stringify(k));
        } catch (error) {
            throw new Error("Error in fetching data");
        }
    };

    useEffect(() => {
        if(localStorage.getItem('userDetail')){
            const data = JSON.parse(localStorage.getItem('userDetail') || '{}')
            if(!data){
                return;
            }
            setUserId(data?.Viewer.id)
            setUserName(data?.Viewer.name)
            return;
        }
        fetchUserData();
    }, []);


    return (
        <section className='bg-[#7330e6] h-full pt-3 flex flex-col items-center justify-between'>
            <div className='p-1 flex flex-col items-center'>
                <a
                    href={userData?.Viewer?.siteUrl}
                    target='_blank'
                >
                    <img 
                        alt="User Avatar" 
                        src={userData?.Viewer?.avatar?.large}
                        height={72}
                        width={72}
                        className='p-1 rounded-full border-2 border-white hover:bg-black hover:cursor-pointer'
                    /> 
                </a>
                <div className='hover:cursor-pointer'>
                    <FaSearch
                        onClick={() => setCurrentTab('SEARCH')}
                        size={30} 
                        className='mt-[2rem] text-white text-2xl hover:cursor-pointer'
                    />
                </div>

                <MdLiveTv
                    onClick={() => setCurrentTab('MYANIME')}
                    size={40} 
                    className='mt-[2rem] text-white text-2xl hover:cursor-pointer'
                />
                <FaBookBookmark
                    size={30} 
                    className='mt-[2rem] text-white text-2xl hover:cursor-pointer'
                    onClick={() => setCurrentTab('MYMANGA')}
                />
            </div>

            {/* <button
                ref = {refs.setReference} {...getReferenceProps()}
                onClick={
                    () => setCurrentTab('SETTINGS')
                }
            > */}
                <IoMdSettings
                    size={40} 
                    className='text-white text-2xl hover:cursor-pointer mb-[1rem]'
                    onClick={
                        () => setCurrentTab('SETTINGS')
                    }
                />
            {/* </button> */}
            {/* {isOpen && <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                Tooltip
            </div>} */} 
        </section>
    )
}

export default SideBar