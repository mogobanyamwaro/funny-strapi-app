import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchJoke = async () => {
  const { data } = await axios.get("http://localhost:1337/api/joke/generate");
  return data.joke;
};

export const useJoke = () => {
  return useQuery({
    queryKey: ["dadJoke"],
    queryFn: fetchJoke,
    enabled: false,
  });
};
