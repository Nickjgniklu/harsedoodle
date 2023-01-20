//import Random from "./random.js";
import { LoadableImage } from "./ResourceLoader";
import GameModel from "./GameModel"
import GameObject from "./GameObject"
import Platform from "./Platform";
class Player implements GameObject{
    Speed=.4;
    JumpSpeed=.90;
    Gravity=.001;
    Score=0;
    FireLimit=200;
    TimeSinceLastFire=0;
    Size:number;
    Image:LoadableImage;
    WorldSize:number;
    X:number;
    Y:number;
    GameModel:GameModel;
    VelocityX:number=0;
    VelocityY:number=0;
    Rotation:number=0;
    RotationRate:number=2 * Math.PI / 3000;;
    State="LIVE";
    constructor(size:number,image:LoadableImage,WorldSize:number,GameModel:GameModel,X:number,Y:number){
        this.Size=size;
        this.Image=image;
        this.WorldSize=WorldSize;
        this.X=X;
        this.Y=Y;
        this.GameModel=GameModel;
    }

    Render(context:CanvasRenderingContext2D){
        let x = this.GameModel.xWorldToViewPort(this.X);
        let y = this.GameModel.yWorldToViewPort(this.Y);
        if(this.State=="LIVE"){
        context.save();
        context.translate(x, y);
        context.rotate(this.Rotation);
        context.translate(-x, -y);
        let playerImg = this.GameModel.ResourceLoader.Images.get("player.png")
        if(playerImg && playerImg.isReady){
        context.drawImage(playerImg, x - (this.Size / 2), y - (this.Size / 2), this.Size, this.Size);
        }
        context.restore();
        }else if(this.State=="EXPLODING"){
        }else if(this.State=="EXPLODED"){
            
        }
    }
    
    Thrust(elapsedTime:number){
        this.VelocityY += -Math.cos(this.Rotation) * this.Speed * elapsedTime;
        this.VelocityX += Math.sin(this.Rotation) * this.Speed * elapsedTime;
    }
    Jump(elapsedTime:number){
        let limits = this.GameModel.getWorldLimits();

        if(this.Collided(this.GameModel.Platforms)||this.GameModel.Self.Y >= limits.bottom){
        this.VelocityY = -this.JumpSpeed
        }

    }
    StrafeRight(elapsedTime:number){
        this.X += this.Speed*elapsedTime;

    }
    StrafeLeft(elapsedTime:number){
        this.X -= this.Speed*elapsedTime;
    }
    RotateRight(elapsedTime:number){
        this.Rotation += this.RotationRate * elapsedTime;

    }
    RotateLeft(elapsedTime:number){
        this.Rotation -= this.RotationRate * elapsedTime;
    }
    Jumped=false
    Update(elapsedTime:number){
        this.Y += this.VelocityY * elapsedTime;
        this.X += this.VelocityX * elapsedTime;
        this.VelocityY += this.Gravity * elapsedTime
        this.TimeSinceLastFire+=elapsedTime;
        // if(this.Collided(colidables)&&this.State=="LIVE"){
        //     //this.Size+=10;
        //     this.VelocityY=0;
        //     this.VelocityX=0;
        //     console.log(`Exploded at x${this.X} y:${this.Y}`)
        //     this.State="EXPLODING";
        //     this.Score-=100;
        // }
        
    }
    Collided(colidables:GameObject[]){
        for(let i in colidables){
            if(this.GameModel.objectsCollided(this,colidables[i])){
                return true;
            }
            
        }
        return false;
        
    }
}
export default Player;