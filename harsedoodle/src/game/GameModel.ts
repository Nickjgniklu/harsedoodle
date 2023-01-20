import Player from "./player.js";
import ResourceLoader from "./ResourceLoader.js";
import XY from "./XY.js";
class GameModel {
    ResourceLoader:ResourceLoader
    Start:number;
    PlayerScore:number = 0;
    TimeStart:number|null = null;
    TimeSinceStart:number = 0;
    TimeSinceStartSeconds:number|null = null;
    Self:Player;
    Score = 0;
    Paused = false;
    WORLDSIZE = 10240;
    VIEWPORTSIZE = 2048;
    PLAYAREASIZE = 1300;
    XTILECOUNT = 20;
    YTILECOUNT = 20;
    TILEWIDTH = 128;
    // TILEWIDTH=this.WORLDSIZE/this.VIEWPORTSIZE;
    ViewPortCenter = { x: this.WORLDSIZE / 2, y: this.WORLDSIZE / 2 }

    SHIPSIZE = 200;


    ASTEROID_DEFAULT_SIZE = 200;
    ASTEROID_START_COUNT = 100;
    Asteroids = {};

    UFO_DEFAULT_SIZE = 400;
    UFO_START_COUNT = 5;
    UFOs = {}

    MISSLE_DEFAULT_SIZE = 100;
    Missles = []
    NewMissles = []

    Grid:  string[][] =[];

    CountDown = 0;
    size = 4;
    Moves = 0;

    OtherPlayers = [];


    getPlayAreaLimits() {
        let padding = (this.VIEWPORTSIZE - this.PLAYAREASIZE) / 2;

        let l = (this.ViewPortCenter.x - (this.VIEWPORTSIZE / 2)) + padding;
        let r = (this.ViewPortCenter.x + (this.VIEWPORTSIZE / 2)) - padding;
        let t = (this.ViewPortCenter.y - (this.VIEWPORTSIZE / 2)) + padding;
        let b = (this.ViewPortCenter.y + (this.VIEWPORTSIZE / 2)) - padding;
        return { left: l, right: r, top: t, bottom: b };

    }
    getWorldLimits() {
        let padding = (this.VIEWPORTSIZE - this.PLAYAREASIZE) / 2;

        let l = 0 + padding;
        let r = this.WORLDSIZE - padding;
        let t = 0 + padding;
        let b = this.WORLDSIZE - padding;
        return { left: l, right: r, top: t, bottom: b };

    }

    constructor(resources:ResourceLoader) {
        this.ResourceLoader = resources;
        this.Start = performance.now();

        

        this.PrepTiles();


        let playerImg =this.ResourceLoader.Images.get("player.png");
        if(playerImg){
        this.Self =new Player(100,playerImg,this.WORLDSIZE,this,this.WORLDSIZE/2,100);
        }else{
            console.log("uh oh player sprite not loaded")
        this.Self =new Player(100,new Image(),this.WORLDSIZE,this,this.WORLDSIZE/2,100);

        }
    }


    PrepTiles() {
        this.Grid = [];
        let count = 0;
        for (let i = 0; i < this.XTILECOUNT; i++) {
            this.Grid.push([]);
            for (let j = 0; j < this.YTILECOUNT; j++) {

                this.Grid[i].push(`tile-${count}.jpg`);
                count++;
            }
        }
    }
    // GenerateAsteroids(ServerRoids) {
    //     for (let i in ServerRoids) {
    //         this.Asteroids[ServerRoids[i].ID]=(
    //             new Asteroid(
    //                 this.ASTEROID_DEFAULT_SIZE,
    //                 this.ResourceLoader.Images["asteroid.png"],
    //                 this.WORLDSIZE,
    //                 this,
    //                 ServerRoids[i].X,
    //                 ServerRoids[i].Y,
    //                 ServerRoids[i].VelocityX,
    //                 ServerRoids[i].VelocityY,
    //                 ServerRoids[i].ID


    //             )
    //         );
    //     }
    // }
    // GenerateUFOs() {
    //     for (let i = 0; i < this.UFO_START_COUNT; i++) {
    //         this.UFOs.push(
    //             new UFO(
    //                 this.UFO_DEFAULT_SIZE,
    //                 this.ResourceLoader.Images["ufo.png"],
    //                 this.WORLDSIZE,
    //                 this

    //             )
    //         );
    //     }
    // }
    angleBetweenObjects(obj1:XY, obj2:XY) {
        return Math.atan2(obj2.Y - obj1.Y, obj2.X - obj1.X);
    }
    distanceBetweenObjects(obj1:XY, obj2:XY) {
        let x1 = obj1.X;
        let x2 = obj2.X;
        let y1 = obj1.Y;
        let y2 = obj2.Y;

        let xs = x2 - x1;
        let ys = y2 - y1;

        xs *= xs;
        ys *= ys;

        return Math.sqrt(xs + ys);

    }
    objectsCollided(obj1:XY, obj2:XY) {
        let boundary = obj1.Size / 2 + obj2.Size / 2;
        let dist = this.distanceBetweenObjects(obj1, obj2);
        if (dist <= boundary) {
            return true;
        } else {
            return false;
        }

    }
    xWorldToViewPort(worldCordx:number) {
        let left = (this.ViewPortCenter.x - (this.VIEWPORTSIZE / 2));
        return worldCordx - left;

    }
    yWorldToViewPort(worldCordy:number) {
        let top = (this.ViewPortCenter.y - (this.VIEWPORTSIZE / 2));
        return worldCordy - top;

    }
}
export default GameModel;

