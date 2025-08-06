import React, { useEffect } from "react";
import startScraping from "./utils/scraper";
import checkRecord from "./utils/checkRecord";
import Header from "./components/Header";
import Client from "./components/Client";
import Footer from "./components/Footer";
import Member from "./components/Member";
// import Alert from "./components/Alert"; // Optional error display component
import { useAppContext } from "./context/AppContext";
import Matter from "./components/Matter";

const App: React.FC = () => {
  const { clientInfo, saved, setErrorMessage } = useAppContext();

  useEffect(() => {startScraping()}, []);
  useEffect(() => {if (clientInfo.email) checkRecord(clientInfo)}, [clientInfo, saved]);

  // Sync error messages from content script via chrome.storage.local
  // only applied for bark
  useEffect(() => {
    // Initial read
    chrome.storage.local.get("errorMessage", (result) => {
      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
        chrome.storage.local.remove("errorMessage");
      }
    });

    // Real-time listener
    const handleChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === "local" && changes.errorMessage) {
        const newValue = changes.errorMessage.newValue;
        if (newValue) {
          setErrorMessage(newValue);
          chrome.storage.local.remove("errorMessage");
        }
      }
    };

    // Cleanup on unmount
    chrome.storage.onChanged.addListener(handleChange);
    return () => chrome.storage.onChanged.removeListener(handleChange);
  }, [setErrorMessage]);

  return (
    <main className="w-[450px]">
      <Header />
      <Client />
      <Matter/>
      <Member />
      <Footer />
    </main>
  );
};

export default App;
