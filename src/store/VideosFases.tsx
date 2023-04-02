
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

type State = {
  videosFases:any;
}

type Actions = {
  setVideosFases:(videos:any)=>void;
  logoutFases:(videos:any)=>void;
}

// export const useFasesStore = create<State & Actions>(
//   (set)=>({
//     videos:null,
//     setVideosFases:(videos:any)=>set((state)=>({
//       videos,
//     }))
//   })
// )

export const useFasesStore = create(persist<State & Actions>(
  (set)=>({
    videosFases:null,
    setVideosFases:(videosFases:any)=>set((state)=>({
      videosFases,
    })),
    logoutFases: ()=> set(state=>({
      videosFases:null
    }))
  }),{
    name:"videos-fases",
    storage: createJSONStorage(() => sessionStorage)
  }
));
