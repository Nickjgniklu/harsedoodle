import GameObject from "./GameObject";
import GameModel from "./GameModel"
import { render } from "@testing-library/react";

export default class Platform implements GameObject{
 X:number;
 Y:number;
 Rotation:number=0;
 Length:number=500;
 Size:number =500;
 GameModel:GameModel;

 constructor(X:number,Y:number,GameModel:GameModel){
    this.X=X;
    this.Y=Y;
    this.GameModel=GameModel;
 }

 Render(context:CanvasRenderingContext2D){
    let x = this.GameModel.xWorldToViewPort(this.X);
    let y = this.GameModel.yWorldToViewPort(this.Y);
    context.save();
    context.translate(x, y);
    context.rotate(this.Rotation);
    context.translate(-x, -y);
    let playerImg = this.GameModel.ResourceLoader.Images.get("BadCloud.png")
    if(playerImg && playerImg.isReady){
    context.drawImage(playerImg, x - (this.Length / 2), y - (this.Length / 2), this.Length, this.Length);
    }
    context.restore();
 }
 Update(elapsedTime:number){

    
}
}