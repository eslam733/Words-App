import axios from "axios";

export async function getWordsList() {
  const { data } = await axios.get("/words");
  return data;
}