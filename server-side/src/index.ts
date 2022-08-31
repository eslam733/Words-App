import express, { Express, Request, Response } from "express";
import cors from "cors";
import testData from "./TestData.json";

const app: Express = express();
const port = process.env.PORT || 3200;

app.use(express.json());
app.use(cors());

// type of speech
enum WordType {
  adverb = "adverb",
  verb = "verb",
  noun = "noun",
  adjective = "adjective",
}

interface Words {
  id: number;
  word: string;
  pos: WordType;
}

// retuen 10 words include at least 1 adjective, 1 adverb, 1 noun, and 1 verb.
app.get("/words", (req: Request, res: Response) => {
  let words: Words[] = [];

  while (
    words.filter((word: Words) => word.pos === WordType.adjective).length ===
      0 ||
    words.filter((word: Words) => word.pos === WordType.adverb).length === 0 ||
    words.filter((word: Words) => word.pos === WordType.verb).length === 0 ||
    words.filter((word: Words) => word.pos === WordType.noun).length === 0
  ) {
    words = testData.wordList
      .sort(() => Math.random() - Math.random())
      .slice(0, 10) as Words[];
  }
  res.json(words);
});

// request score and response Rank%
// Rank% = (number of values below score) ÷ (total number of scores) x 100
app.post("/rank", (req: Request, res: Response) => {
  const score: number = req.body.score;
  const belowScroe: number = testData.scoresList.filter(
    (el) => el < score
  ).length;

  const rank = Number(
    ((belowScroe / testData.scoresList.length) * 100).toFixed(2)
  );
  res.json({
    rank: rank,
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
