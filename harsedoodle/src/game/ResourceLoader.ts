// import breadcrumbpng from "../images/breadcrumb.png";
// import endpng from "../images/end.png";
// import startpng from "../images/start.png";
// import hinttilepng from "../images/hinttile.png";
// import spacepng from "../images/space.jpg";
// import landerpng from "../images/lander.png";
// import firepng from "../images/fire.png";
// import thrustwav from "../sounds/engine_takeoff.wav"
// import explosionmp3 from "../sounds/explosion.mp3"

export interface LoadableImage extends HTMLImageElement{
    isReady?:boolean
}
class ResourceLoader{
    Images:Map<string,LoadableImage> = new Map();
    Sounds={};
    importAll(r:__WebpackModuleApi.RequireContext){
        let images:Map<string,any>=new Map();
        r.keys().map((item,index)=>{images.set(item.replace('./',''),r(item))});
        return images;
    }
    
    constructor(){
    this.LoadAllImages();
    //this.LoadAllAudio();
    
    }

    // LoadAllAudio(){
    //     this.Sounds.thrust = new Audio();
    //     this.Sounds.thrust.src=thrustwav;
    //     this.Sounds.explosion = new Audio();
    //     this.Sounds.explosion.src=explosionmp3;
        
    // }
    LoadAllImages(){
        let raw=this.importAll(require.context("../images",false,/\.(png|jpe?g|svg)$/));
        console.log(raw)
        let keys=Object.keys(raw); 
        console.log(keys);
        for(let i =0;i<keys.length;i++)
         {
             let img:LoadableImage=new Image();
             img.isReady = false;
            img.onload = function () {
             (this as LoadableImage).isReady = true;
            };
             img.src = raw.get(keys[i]);
            this.Images.set(keys[i],img);
         }
    }
}
export default ResourceLoader;