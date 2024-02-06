import MyMedia from "./MyMedia"
import SearchPage from "./Search"
import Settings from "./Settings"
import SideBar from "./SideBar"

import {
  currentUI
} from "@/app/store"

const Home = () => {

  const {
    currentTab
  } = currentUI();


  return (
    <main className='flex w-[600px] h-[600px]'>
        <section className='bg-[#1a1a1a] w-[calc(90%)]'>
            {
              currentTab === 'SEARCH'?
              <SearchPage/> : 
              currentTab === 'MYANIME'? 
              <MyMedia MediaType="ANIME" /> : 
              currentTab !== 'MYMANGA'? <Settings/> : 
              <MyMedia MediaType="MANGA"/>
            }
        </section>
        <section className='w-[calc(10%)]'>
            <SideBar />
        </section>
    </main>
  )
}

export default Home