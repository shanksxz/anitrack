
import MyAnime from "./MyAnime"
import MyManga from "./MyManga"
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
        <section className='bg-[#1a1a1a] w-[calc(88%)]'>
            {
              currentTab === 'SEARCH'?
              <SearchPage/> : currentTab === 'MYANIME'? <MyAnime/> : currentTab === 'SETTINGS'? <Settings/> : <MyManga/>
            }
        </section>
        <section className='w-[calc(12%)]'>
            <SideBar />
        </section>
    </main>
  )
}

export default Home