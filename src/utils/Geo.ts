

export type  positionType = {longitude:number, latitude:number}|null

export const getPosition = (callback:(e:positionType)=> void) => {
   navigator.geolocation.getCurrentPosition((e)=>{
      let {longitude, latitude} = e.coords
      if(longitude && latitude) {
         callback({longitude, latitude})
      } else {
         callback(null)
      }
   })



}