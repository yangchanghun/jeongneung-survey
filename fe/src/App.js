import { useState, useEffect } from "react";
import TimeBankSurvey from "./TimeBankSurvey";
import SurveyStatistics from "./SurveyStatistics";
import MainPage from "./MainPage";

export default function App() {
  const [page, setPage] = useState(0);

  const pageList = [
    <MainPage setPage={setPage} />,
    <TimeBankSurvey setPage={setPage} />,
    <SurveyStatistics setPage={setPage} />,
  ];
  useEffect(() => {
    if (window.location.pathname === "/admin") {
      setPage(2);
    }
  }, []); // 한 번만 실행되도록 의존성 배열 []

  return pageList[page];
}
