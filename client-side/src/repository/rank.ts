import axios from "axios";

export async function getUserRank(score: number) {
  const { data } = await axios.post("/rank", { score });
  return data;
}
