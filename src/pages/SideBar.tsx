import { useLayoutEffect, useState } from "react";
import {
    userDetails,
} from "../requests/index";
import { ViewerQueryResponse } from "@/types";

// removed
// import { MdLiveTv } from "react-icons/md";
// import { FaBookBookmark } from "react-icons/fa6";
// import { FaSearch } from "react-icons/fa";
// import { IoMdSettings } from "react-icons/io";


import { Tooltip } from 'react-tooltip';

// lucide react
import {
    BookOpen,
    Search, Settings2, Tv
} from 'lucide-react';


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

    useLayoutEffect(() => {
        if (localStorage.getItem('userDetail')) {
            const data = JSON.parse(localStorage.getItem('userDetail') || '{}')
            if (!data) {
                return;
            }
            setUserId(data?.Viewer.id)
            setUserName(data?.Viewer.name)
            return;
        }
        fetchUserData();
    }, []);


    return (
        <section className='bg-purple border-l-2 border-l-black  h-full pt-3 flex flex-col items-center justify-between'>
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
                <Search
                    size={30}
                    id="search"
                    className='mt-[3rem] text-white text-2xl hover:cursor-pointer'
                    onClick={() => setCurrentTab('SEARCH')}
                    strokeWidth={3}
                />
                <Tooltip
                    anchorSelect="#search"
                    content="Search"
                    place="top"
                    style={{
                        background: 'black',
                        color: 'white',
                        fontSize: '1rem',
                        padding: '0.6rem',
                        borderRadius: '0.2rem',
                    }}
                />

                <Tv
                    strokeWidth={3}
                    id="anime"
                    size={30}
                    className='mt-[2rem] text-white text-2xl hover:cursor-pointer'
                    onClick={() => setCurrentTab('MYANIME')}
                />

                <Tooltip
                    anchorSelect="#anime"
                    content="My Anime"
                    place="left"
                    style={{
                        background: 'black',
                        color: 'white',
                        fontSize: '1rem',
                        padding: '0.6rem',
                        borderRadius: '0.2rem',
                    }}
                />
                <BookOpen
                    id="manga"
                    strokeWidth={3}
                    size={30}
                    color="#fff"
                    className='mt-[2rem] text-white text-2xl hover:cursor-pointer'
                    onClick={() => setCurrentTab('MYMANGA')}
                />
                <Tooltip
                    anchorSelect="#manga"
                    content="My Manga"
                    place="bottom"
                    style={{
                        background: 'black',
                        color: 'white',
                        fontSize: '1rem',
                        padding: '0.6rem',
                        borderRadius: '0.2rem',
                    }}
                />
            </div>

            <Settings2
                id="settings"
                strokeWidth={3}
                size={30}
                className='text-white text-2xl hover:cursor-pointer mb-[1rem]'
                onClick={() => setCurrentTab('SETTINGS')}
            />
            <Tooltip
                anchorSelect="#settings"
                content="Settings"
                place="top"
                style={{
                    background: 'black',
                    color: 'white',
                    fontSize: '1rem',
                    padding: '0.6rem',
                    borderRadius: '0.2rem',
                }}
            />
        </section>
    )
}

export default SideBar