import {useEffect, useState} from "react";
import { isMobile } from 'react-device-detect';
import api from "../../api/ceacademyApi";
import {useVideosStore} from "../../store/videos";
import {fasesGen} from "../../utils/videosFases";
import {useFasesStore} from "../../store/VideosFases";
import videojs from "video.js";
import any = videojs.any;
import {Link} from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [videosFs, setVideosFs] = useState<any>();
  const {videosStr, setVideosStr} = useVideosStore();
  const {videosFases, setVideosFases} = useFasesStore();
  useEffect(() => {
    api.get('/videos')
      .then(response => {
        console.log(response.data)
        setVideos(response.data);
        setVideosFs(fasesGen(response.data,6))
        setVideosStr(response.data);
        setVideosFases(fasesGen(response.data,6))
      })
  }, []);

  const mouseEnter = (e:any) => {

  }

  const mouseLeave = (e:any) => {

  }

  const mouseClick = (e:any) => {
    const target = e.target;
    target.nextElementSibling.classList.toggle('active')
  }

  return (
    <section className={'section Media'}>
      <div className="dropdown" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        <button className={'dropdown__button'}  onClick={mouseClick}>
          Etapas <i className="fa-solid fa-chevron-down"></i>
        </button>
        <ul className="dropdown__list">
          {
            videosFs?.map((video:any,i:any)=>(
              <li key={i}>
                <a href={`#fase${video.fase}`}>
                  Fase {video.fase}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
      {
        videosFs?.map((video:any,i:any)=>(
          <div key={i} className={'fase-container'} id={`fase${video.fase}`}>
            <h2 className="fase-title">Fase: {video.fase}</h2>
            <ul className="video-container">
              {
                video?.videos.map((vid:any,j:any)=>(
                  <li key={j} className={'video-container__item'}>
                    <Link to={`/video/fase/${video.fase}/${vid._id}`} key={j}>
                      <figure>
                        <img src={'/img/video-fondo.jpg'} alt={vid.name} />
                        <figcaption>{vid.pos}. {vid.name}</figcaption>
                      </figure>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>

        ))
      }
    </section>
  )
}

export default Home
