import { useState } from "react";
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

  const currentPage = pageList[page];

  return currentPage;
}
