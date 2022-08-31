import { useEffect, useState } from "react";
import { Button } from "../components/Buttons";
import { getUserRank } from "../repository/rank";

export interface RankResultProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  score: number;
  tryAgain: any;
}

export const RankResult: React.FC<RankResultProps> = ({ score, tryAgain }) => {
  const [rank, setRank] = useState<number | null>(null);

  const getRank = async () => {
    const data = await getUserRank(score);
    setRank(data?.rank);
  };

  useEffect(() => {
    getRank();
  }, []);

  return (
    <div className="flex-col  flex justify-center h-screen">
      <h3 className=" mx-auto mt-10 text-cyan-800 text-5xl font-bold">
        Your Rank: {rank}%
      </h3>
      <div className="mt-10  flex flex justify-center">
        <Button label="Try Again" onClick={tryAgain} />
      </div>
    </div>
  );
};
