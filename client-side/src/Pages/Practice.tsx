import React, { useEffect } from "react";
import { Button } from "../components/Buttons";
import { WordModel } from "../Models/WordsModels";
export interface PracticeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  words: WordModel[];
  setScoreState: any;
}

// type of speech
enum WordType {
  adverb = "adverb",
  verb = "verb",
  noun = "noun",
  adjective = "adjective",
}

export const Practice: React.FC<PracticeProps> = ({ words, setScoreState }) => {
  const [indexState, setIndexState] = React.useState<number>(0);
  const [revision, setRevision] = React.useState<boolean | null>(null);

  const checkAnswer = (answer: string) => {
    if (answer === words[indexState].pos) {
      words[indexState].answer = true;
      setRevision(true);
    } else {
      words[indexState].answer = false;
      setRevision(false);
    }

    setTimeout(() => {
      // if last question
      if (indexState === words.length - 1) {
        setScoreState(
          (words.filter((word) => word.answer === true).length / words.length) *
            100
        );
        return;
      }
      setRevision(null);
      setIndexState(indexState + 1);
    }, 1000);
  };

  return (
    <div className="flex-col  flex justify-center h-screen">
      <h3 className=" mx-auto mt-10 text-cyan-800 text-lg font-bold">
        Progress: {(indexState / words.length) * 100}%
      </h3>
      <h2 className="mx-auto mt-10  text-6xl font-bold">
        {words[indexState].word}
      </h2>

      {revision !== null ? (
        revision === true ? (
          <h4 className=" mx-auto mt-10  text-lg font-bold text-green-400">
            Correct
          </h4>
        ) : (
          <h4 className=" mx-auto mt-10  text-lg font-bold text-red-500">
            Wrong
          </h4>
        )
      ) : (
        ""
      )}

      <div className="mt-10  flex flex justify-center">
        <Button
          label="adjective"
          onClick={() => checkAnswer(WordType.adjective)}
        />
        <Button label="adverb" onClick={() => checkAnswer(WordType.adverb)} />
        <Button label="noun" onClick={() => checkAnswer(WordType.noun)} />
        <Button label="verb" onClick={() => checkAnswer(WordType.verb)} />
      </div>
    </div>
  );
};
