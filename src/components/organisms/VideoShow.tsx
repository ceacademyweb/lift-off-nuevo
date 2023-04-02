//@ts-nocheck

import { useEffect, useRef, useState } from 'react';
import {useFasesStore} from "../../store/VideosFases";
import {Link} from "react-router-dom";
import {fasesGen} from "../../utils/videosFases";
import api from "../../api/ceacademyApi";
// import {fasesGen} from "../../utils/videosFases";
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const name = 'tino.navarro';
document.documentElement.style.setProperty(
  '--top',
  `${Math.floor(getRandomArbitrary(80, 80))}%`
);
document.documentElement.style.setProperty(
  '--left',
  `${Math.floor(getRandomArbitrary(10, 90))}%`
);
setInterval(() => {
  document.documentElement.style.setProperty(
    '--top',
    `${Math.floor(getRandomArbitrary(20, 80))}%`
  );
  document.documentElement.style.setProperty(
    '--left',
    `${Math.floor(getRandomArbitrary(10, 90))}%`
  );
}, 10000);

function VideoShow({ url, copy, copyBg }) {
  const vidEl = useRef();
  const {videosFases, setVideosFases} = useFasesStore();
  const [videosFs, setVideosFs] = useState<any>();
  const videoContainer = useRef();
  const videoUrl = useState(url);
  // const video = useRef();
  useEffect(() => {
    document.documentElement.style.setProperty('--video-height1', vidEl.current.clientHeight + 'px')
    setVideosFs(fasesGen(videosFases));
    const player = new Playerjs({
      id: `player`,
      file: `${url}`,
      // autoplay: true,
    });
    const videoHeight = videoContainer.current.clientHeight;
    document.documentElement.style.setProperty(
      '--videoHeight',
      `${videoHeight}px`
    );
    const video = document.querySelector('.video-content video');
    // console.log(video.current);
    addEventListener('fullscreenchange', (event) => {
      if (video.classList.contains('FullScreen')) {
        video.classList.remove('FullScreen');
      } else {
        video.classList.add('FullScreen');
      }
    });

    video.parentElement.classList.add('video-parent');
    const layer = document.createElement('div');
    const waterMark = document.createElement('div');
    layer.className = 'layer-apuse show';
    waterMark.className = `waterMark pause ${copyBg}`;
    video.parentElement.insertAdjacentElement('afterBegin', layer);
    video.parentElement.firstChild.insertAdjacentElement('afterEnd', waterMark);
    waterMark.innerText = copy;
    video.addEventListener('pause', function () {
      layer.classList.add('show');
      waterMark.classList.add('pause');
    });
    video.addEventListener('play', function () {
      layer.classList.remove('show');
      waterMark.classList.add('show');
      waterMark.classList.remove('pause');
    });
  }, [url]);
  const resize = (e) => {
  };
  return (
    <div className="video-content" ref={vidEl}>
      <div id="player" onResize={resize} ref={videoContainer}></div>
    </div>
  );
}

export default VideoShow;
