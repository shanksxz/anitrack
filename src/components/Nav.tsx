import { IoSettings } from 'react-icons/io5'

import { NavProps } from '../types'

export default function({isOpen, setIsOpen} : NavProps) {
  return (
    <nav className='p-2 font-roboto_mono flex justify-between items-center bg-black'>
        <h1 className='text-white font-bold text-[1.5rem]'>AniTrack</h1>
        <IoSettings 
            size={40}
            color='white'
            className=' hover:bg-[#282828] p-1 hover:rounded-sm hover:cursor-pointer'
            onClick={() => setIsOpen(!isOpen)}
        />
    </nav>
  )
}

