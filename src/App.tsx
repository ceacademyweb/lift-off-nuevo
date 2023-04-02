import {useFetchVideos} from "./hooks/useVideos";
import {useVideosStore} from "./store/videos";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {videosFases} from "./utils/videosFases";
import {useFasesStore} from "./store/VideosFases";
import {useUserStore} from "./store/user";

  // const setVideos = useVideosStore(state => state.setVideos);
function App() {
  let error = false;
  const { data, isLoading } = useFetchVideos();
  const videos = useVideosStore(state => state.videos);
  // setVideos(videosFases(videos,6))
  const videosFases = useFasesStore(state => state.videos)
  console.log(videosFases(videos,6))
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">

      <h2>videos:</h2>
      {
        !data.error ?
        data.map((video:any) => (
          <div key={video._id}>
            <Link to={`/video/${video._id}`}>
              <p>{video.name}</p>
            </Link>
          </div>
        ))
        : <p className={'bar error'}>Lo sentimos, ha ocurrio un error, por favor vuelva a intentarlo mas tarde</p>
      }
    </div>
  )
}

export default App
