import React, { useEffect } from "react";
import startScraping from "./utils/scraper";
import checkRecord from "./utils/checkRecord";
import Header from "./components/Header";
import Client from "./components/Client";
// import Matter from "./components/Matter";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Member from "./components/Member";
// import Alert from "./components/Alert";

const App: React.FC = () => {
  const { clientInfo, saved } = useAppContext();

  // scraping & checking
  // prettier-ignore
  useEffect(() => { startScraping()}, []);
  useEffect(() => {
    clientInfo.email && checkRecord(clientInfo);
  }, [clientInfo, saved]);

  return (
    <main className="w-[450px]">
      <Header />
      <Client />
      {/* <Alert/> */}
      <Member />
      {/* <Matter /> */}
      <Footer />
    </main>
  );
};

export default App;
