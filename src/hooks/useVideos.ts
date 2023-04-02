import api from "../api/ceacademyApi";
import {useQuery} from "@tanstack/react-query";


async function fetchVideos() {
  console.log("fetching videos")
  try{
    const { data } = await api.get(`/videos`);
    return data;
  }catch (err) {
    console.log(err);
    return {
      error: true
    }
  }
}

export function useFetchVideos() {
  return useQuery(["videos"], fetchVideos);
}
