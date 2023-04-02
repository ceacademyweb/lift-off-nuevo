
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

type State = {
  videosStr:any;
}

type Actions = {
  setVideosStr:(videos:any)=>void;
  logoutVidStr:(videos:any)=>void;
}


// export const useVideosStore = create<State & Actions>(
//   (set)=>({
//     videosStr:null,
//     setVideosStr:(videosStr:any)=>set((state)=>({
//       videosStr,
//     })),
//     logoutVidStr: ()=> set(state=>({
//       videosStr:null
//     }))
//   })
// );

export const useVideosStore = create(persist<State & Actions>(
  (set)=>({
    videosStr:null,
    setVideosStr:(videosStr:any)=>set((state)=>({
      videosStr,
    })),
    logoutVidStr: ()=> set(state=>({
      videosStr:null
    }))
  }),{
    name:"videosStr",
    storage: createJSONStorage(() => sessionStorage)
  }
));
