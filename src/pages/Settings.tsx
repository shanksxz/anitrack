import {
  currentUI,
  useUserStore,
} from "@/app/store";

import {
  useStore,
} from "@/app/store";

import {
  jwtDecode 
} from "jwt-decode"

import {
  convertExp
} from "@/utils"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import {
  useTheme
} from "@/hooks/useTheme";

type accentType = 'accent-blue' | 'accent-green' | 'accent-purple';

const Settings = () => {

  const {
    accent,
    setAccent
  } = useTheme();

  
  const changeAccent = (newAccent : accentType) => {
      setAccent(newAccent);
  };

  const {
    setCurrentTab
  } = currentUI();

  const {
    accessToken,
    setAccessToken
  } = useStore();

  const [value, setValue] = useState<string>(    
    localStorage.getItem('defaultTab') || ''
  );  

  
  const decoded = jwtDecode(accessToken as string);
  const exp = convertExp(decoded.exp as number);

  const {
    userName
  } = useUserStore();

  const logoutHandler = () => {
    setAccessToken('');
    localStorage.removeItem('userDetail');
    localStorage.removeItem('accessToken');
  };

  return (
    <section className='p-6 h-full overflow-y-scroll scrollbar scrollbar-thumb-purple scrollbar-w-3 text-white'>
        <h1 className='font-bold text-[2rem]'>Settings</h1>
        <div className='bg-[#262626] mt-2 p-2 rounded-sm'>
          <p>
            Logged in as <a
              href={`https://anilist.co/user/${userName}`}
              target='_blank'
              className='text-purple underline font-bold'>{userName}</a>
          </p>
          <p className='mt-1'>
            Your token will expire on <span className='text-purple font-bold'>{exp.day}/{exp.month}/{exp.year}</span> at {exp.hour}:{exp.minute}{exp.ampm}
            , You will have  to re-login after the token expires.
          </p>
          <button className='mt-2 px-3 py-2 rounded-sm bg-purple font-bold' onClick={logoutHandler}>
            Logout
          </button>
        </div>
        <p className='mt-1 text-[1.2rem] font-bold'>Default Page</p>
        <div className='bg-[#262626] mt-2 p-2 rounded-sm'>
          <div className='flex items-center gap-2'>
          <Select
              value={value}
              onValueChange={(value) => setValue(value)}
            >
              <SelectTrigger className='p-2 w-[100px] text-white bg-secondary_gray h-[40px] rounded-sm'>
                <SelectValue placeholder="Set Tab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SEARCH">Search</SelectItem>
                <SelectItem value="MYANIME">My Anime</SelectItem>
                <SelectItem value="MYMANGA">My Manga</SelectItem>
                <SelectItem value="SETTINGS">Settings</SelectItem>
              </SelectContent>
            </Select>
            <button className='bg-purple px-3 py-2 rounded-sm font-bold'
              onClick={() => {
                setCurrentTab(value);
                localStorage.setItem('defaultTab', value);
              }}
            >
              Save
            </button>
          </div>
          <p className='mt-2'>
            Set the default page that you want to see whenever you open the extension.
          </p>
        </div>
        <p className='mt-2 font-bold text-[1.5rem]'>
            Theme
          </p>
          <div className='mt-2 bg-secondary_gray p-2 rounded-sm  items-center'>
             <div>
              {/* <button className='mt-2 px-3 py-2 rounded-sm bg-purple font-bold' onClick={changeTheme}> Change Theme</button> */}
                <div>
                  <p>Primary Color</p>
                  <div className='mt-2 flex items-center gap-2'>
                    <span className='inline-block w-8 h-8 rounded-md bg-black hover:cursor-pointer'></span>
                    <span className='inline-block w-8 h-8 rounded-md bg-white hover:cursor-pointer'></span>
                  </div>
                </div>
             </div>
               <p className='block mb-2 mt-2'>Accent Color</p>
              <span className={`inline-block w-8 h-8 rounded-md bg-[#30e6e6] hover:cursor-pointer ${accent === 'accent-blue'? 'border-[3px] border-white' : ''}`} onClick={() => changeAccent('accent-blue')}></span>
              <span className={`inline-block w-8 h-8 ml-2 rounded-md bg-[#30e64e] hover:cursor-pointer ${accent === 'accent-green'? 'border-[3px] border-white' : ''}`} onClick={() => changeAccent('accent-green')}></span>
              <span className={`inline-block w-8 h-8 ml-2 rounded-md bg-[#7330e6] hover:cursor-pointer ${accent === 'accent-purple'? 'border-[3px] border-white' : ''}`} onClick={() => changeAccent('accent-purple')}></span>

          </div>
        <p className='mt-2 font-bold text-[1.5rem]'>
          Links
        </p>
          <div className='mt-2 bg-secondary_gray p-2 rounded-sm flex items-center'>
            <FaGithub 
              className="hover:cursor-pointer"
              size={30}
            />
            {/* experimental */}
            <p className='ml-2 font-bold'>Github</p>
          </div>
          <p className='mt-1 text-[1.5rem] font-bold'>About</p>
        <div className='mt-2 bg-secondary_gray p-2 rounded-sm'>
          <p>
            it's a simple chrome extension that allows you to search for anime and manga on Anilist and add them to your list.
          </p>
        </div>
    </section>
  )
}


export default Settings