
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

type State = {
  JournalsStr:any;
}

type Actions = {
  setJournalsStr:(journals:any)=>void;
  logoutJournalsStr:(journals:any)=>void;
}


// export const useVideosStore = create<State & Actions>(
//   (set)=>({
//     JournalsStr:null,
//     setJournalsStr:(JournalsStr:any)=>set((state)=>({
//       JournalsStr,
//     })),
//     logoutJournalsStr: ()=> set(state=>({
//       JournalsStr:null
//     }))
//   })
// );

export const useJournalsStore = create(persist<State & Actions>(
  (set)=>({
    JournalsStr:null,
    setJournalsStr:(JournalsStr:any)=>set((state)=>({
      JournalsStr,
    })),
    logoutJournalsStr: ()=> set(state=>({
      JournalsStr:null
    }))
  }),{
    name:"JournalsStr",
    storage: createJSONStorage(() => sessionStorage)
  }
));
