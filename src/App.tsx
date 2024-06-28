import { currentUI } from "@/app/store";
import Auth from "@/components/Auth";
import SearchPage from "./pages/Search";
import MyMedia from "./pages/MyMedia";
import SideBar from "./pages/SideBar";
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";

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

export default function App(){
  const { currentTab } = currentUI();
  return (
    <main className="flex font-text w-[600px] h-[600px]">
      <Auth>
        <section className="bg-primary_bg w-[90%]">
          {renderTabContent(currentTab)}
              <Toaster
                  position="top-center"
                  containerStyle={{
                      width: "calc(88/100 * 600px)",
                      height: "600px",
                  }}
              />
        </section>
        <section className="w-[10%] bg-purple">
            <SideBar />
        </section>
      </Auth>
    </main>
  );
};
