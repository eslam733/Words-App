import React, { useEffect, useState } from "react";
import "./App.css";
import { WordModel } from "./Models/WordsModels";
import { Practice } from "./Pages/Practice";
import { RankResult } from "./Pages/RankResult";
import { getWordsList } from "./repository/words";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { getUserRank } from "./repository/rank";

function App() {
  const [scoreState, setScoreState] = React.useState<number | null>(null);
  const [data, setData] = useState<WordModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWords();
  }, []);

  const getWords = async () => {
    setScoreState(null); // when try again reset score

    const data = await getWordsList();

    setIsLoading(false);
    setData(data);
  };

  if (isLoading) {
    return (
      <div className="h-screen m-auto flex-col  flex justify-center">
        <CgSpinnerTwoAlt
          data-testid="loading"
          className={`animate-spin text-5xl m-auto`}
        />
      </div>
    );
  }

  if (scoreState) return <RankResult tryAgain={getWords} score={scoreState} />;
  return <Practice setScoreState={setScoreState} words={data} />;
}

export default App;
