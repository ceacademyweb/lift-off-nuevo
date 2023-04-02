//@ts-nocheck

import {Link, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useVideosStore} from "../../store/videos";
import {useFasesStore} from "../../store/VideosFases";
import VideoShow from "../organisms/VideoShow";
import {useUserStore} from "../../store/user";


const Video = () => {
  const { id } = useParams()
  const user = useUserStore(state => state.user)
  const [videos, setVideos] = useState();
  const [videosFs, setVideosFs] = useState();
  const [currentVideo, setCurrentVideo] = useState();
  const {videosStr} = useVideosStore();
  const {videosFases} = useFasesStore();
  const contenedor = useRef();
  useEffect(() => {
    setVideos(videosStr)
    setVideosFs(videosFases)
    setCurrentVideo(videosStr.find((vid:any)=>vid._id == id))
    console.log(contenedor.current.clientHeight + 'px')
    document.documentElement.style.setProperty('--video-height', contenedor.current.clientHeight + 'px')
  }, [id])
  return(
    <div className={'dgrid col-2 padding'}>
      <section className="section Video" ref={contenedor}>
        <VideoShow url={currentVideo?.url} copy={user?.name} copyBg={currentVideo?.copyBg}/>
        <h1 className="text-center">{currentVideo?.pos}. {currentVideo?.name}</h1>
      </section>
      <section className="video-list-container">
        {
          videosFs?.map((video:any,i:any)=>(
            <div key={i} className={'fase-container-list'} id={`fase${video.fase}`}>
              <h2 className="fase-title-list">Fase: {video.fase}</h2>
              <ul className="video-list">
                {
                  video?.videos.map((vid:any,j:any)=>(
                    <li key={j} className={'video-list__item'}>
                      <Link to={`/video/fase/${video.fase}/${vid._id}`} key={j}>
                          {vid.pos}. {vid.name}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>

          ))
        }
      </section>
    </div>
  )
}

export default Video
