class FaseObj {
  fase :number
  videos: any
  constructor(fase:number,videos:any) {
    this.fase = fase
    this.videos = videos
  }
}
export const fasesGen = (videos:any,total:number) => {
  const fases = []
  fases.push(new FaseObj(1, videos.filter((video:any) => !video.fase)))
  for (let i = 2; i <= total; i++) {
    fases.push(new FaseObj(i, videos.filter((video:any) => video.fase == i)))
  }
  return fases
}
