import MyMedia from "./MyMedia";
import SearchPage from "./Search";
import Settings from "./Settings";
import SideBar from "./SideBar";
import { currentUI } from "@/app/store";

const renderTabContent = (currentTab : string) => {
  switch (currentTab) {
    case "SEARCH":
      return < SearchPage/>;
    case "MYANIME":
      return <MyMedia MediaType="ANIME" />;
    case "MYMANGA":
      return <MyMedia MediaType="MANGA" />;
    default:
      return <Settings />;
  }
};

const Home = () => {
  const { currentTab } = currentUI();

  return (
    <main className="flex font-text w-[600px] h-[600px]">
      <section className="bg-primary_bg w-[90%]">
        {renderTabContent(currentTab)}
      </section>
      <section className="w-[10%]">
        <SideBar />
      </section>
    </main>
  );
};

export default Home;