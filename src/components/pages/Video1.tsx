import {Link, useParams} from "react-router-dom";
import {useVideosStore} from "../../store/videos";
import {useFasesStore} from "../../store/VideosFases";
import {useEffect, useState} from "react";
const Video1 = () => {
  const { id } = useParams()
  const {videosStr} = useVideosStore();
  const [currentVideo, setCurrentVideo] = useState();
  console.log(videosStr)
  useEffect(() => {
    setCurrentVideo(videosStr.find((vid:any)=>vid._id == id))
  },[id])
  return(
    <>
      <h1>{id}</h1>
      <code>
        {JSON.stringify(currentVideo)}
      </code>
    <section>
      <h2>Video list</h2>
      {
      videosStr?.map((video:any,i:any)=>(
        <p>
          <Link to={`/video/fase/${video.fase}/${video._id}`} key={i}>
            {video.name}
          </Link>
        </p>
      ))
      }
    </section>
    </>
  )
}

export default Video1
