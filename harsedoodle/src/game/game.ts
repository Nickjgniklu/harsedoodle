import Keyboard from "./keyboard";
//import GameModel from "./gamemodel.js";
import ResourceLoader, { LoadableImage } from "./ResourceLoader";
//import HighScores from "./highscores.js";
//import ControlSetup from "./controlsetup.js";
import React from "react"
//import { Button, TextField } from "@material-ui/core";
//import PSystemManager from "./PSystemManager";
//import Physics from "./Physics";
//import sshot from "../images/screenshot.png";
//import io from "socket.io-client";
//import NetworkIds from "../NetworkIds.js";
//import Queue from "../queue.js";
//import Missle from "./missle.js";
//import Asteroid from "./asteroid.js";
import Player from "./player";
import { Persistence } from "./persistance";
import GameModel from "./GameModel";
const e = React.createElement;
class Game extends React.Component {
    canvas:HTMLCanvasElement|null = null;
    context:CanvasRenderingContext2D|null = null;
    Loaded=false;
    ResourceLoader:ResourceLoader = new ResourceLoader();
    Persistence:Persistence = new Persistence();
    Keyboard:Keyboard = new Keyboard();
    //Physics:Physics = new Physics();
    GameModel:GameModel = new GameModel(this.ResourceLoader)
    constructor(props:any) {
        super(props);
        this.state = { screen: "menu", username: "" };
    }


    render() {//this render is used by react see renderGame for gameLoop render function

            return (e('div', { className: "centerContainer", style: { "flexDirection": "column" } },
                e("canvas",
                    { id: "canvas-main", width: `${2048}`, height: `${2048}`, style: { width: "60%", height: "60%" } }
                ),
                e("p", { id: "score-p" }, ""),
                e("p", { id: "time-p" }, ""),
            ));
        }

    
    
    renderBackground(context:CanvasRenderingContext2D) {

        let left = this.GameModel.ViewPortCenter.x - (this.GameModel.VIEWPORTSIZE / 2);
        let right = left + this.GameModel.VIEWPORTSIZE;
        let top = this.GameModel.ViewPortCenter.y - (this.GameModel.VIEWPORTSIZE / 2);
        let bottom = top + this.GameModel.VIEWPORTSIZE;

        // this.GameModel.WORLDSIZE/this.GameModel.TILEWIDTH
        // let leftTile=(left/this.GameModel.WORLDSIZE)*this.GameModel.XTILECOUNT;
        // let topTile=(top/this.GameModel.WORLDSIZE)*this.GameModel.YTILECOUNT;
        // let leftTileIndex=Math.floor((left/this.GameModel.WORLDSIZE)*this.GameModel.XTILECOUNT);
        // let leftTileStart=((left/this.GameModel.WORLDSIZE)*this.GameModel.XTILECOUNT)-leftTileIndex;
        // let leftWidthStart=this.GameModel.XTILECOUNT-(((left/this.GameModel.WORLDSIZE)*this.GameModel.XTILECOUNT)-leftTileIndex);
        let Xindex = Math.floor((left / this.GameModel.WORLDSIZE) * this.GameModel.XTILECOUNT);
        let Yindex = Math.floor((top / this.GameModel.WORLDSIZE) * this.GameModel.YTILECOUNT);
        let minXIndex = Xindex;
        let minYIndex = Yindex;

        let XtilePercentage = 1 - (((left / this.GameModel.WORLDSIZE) * this.GameModel.XTILECOUNT) - Xindex);
        let YtilePercentage = 1 - (((top / this.GameModel.WORLDSIZE) * this.GameModel.YTILECOUNT) - Yindex);

        let XtileWidth = (this.GameModel.TILEWIDTH * XtilePercentage);
        let YtileWidth = (this.GameModel.TILEWIDTH * YtilePercentage);


        let XtileStart = this.GameModel.TILEWIDTH - XtileWidth;
        let YtileStart = this.GameModel.TILEWIDTH - YtileWidth;

        

        let currentX = 0;
        let currentY = 0;
        // let tilewidth= this.GameModel.VIEWPORTSIZE-leftWidthStart;
        let tilesinviewport = (this.GameModel.VIEWPORTSIZE / this.GameModel.WORLDSIZE) * this.GameModel.XTILECOUNT;

        let tilesizeinviewport = this.GameModel.VIEWPORTSIZE / tilesinviewport;

        let XtileWidthViewport = (tilesizeinviewport * XtilePercentage);
        let YtileWidthViewport = (tilesizeinviewport * YtilePercentage);

        while (currentY < this.GameModel.VIEWPORTSIZE) {
            while (currentX < this.GameModel.VIEWPORTSIZE) {

                
                if (minXIndex == Xindex && minYIndex == Yindex) {
                    context.drawImage(this.ResourceLoader.Images.get(this.GameModel.Grid[Yindex][Xindex]) as LoadableImage, XtileStart, YtileStart, XtileWidth, YtileWidth, currentX, currentY, XtileWidthViewport, YtileWidthViewport);

                } else {
                    if (minYIndex == Yindex) {
                        context.drawImage(this.ResourceLoader.Images.get(this.GameModel.Grid[Yindex][Xindex]) as LoadableImage, 0, YtileStart, this.GameModel.TILEWIDTH, YtileWidth, currentX, currentY, tilesizeinviewport, YtileWidthViewport);


                    } else if (minXIndex == Xindex) {
                        context.drawImage(this.ResourceLoader.Images.get(this.GameModel.Grid[Yindex][Xindex]) as LoadableImage, XtileStart, 0, XtileWidth, this.GameModel.TILEWIDTH, currentX, currentY, XtileWidthViewport, tilesizeinviewport);


                    } else {
                        context.drawImage(this.ResourceLoader.Images.get(this.GameModel.Grid[Yindex][Xindex]) as LoadableImage, 0, 0, this.GameModel.TILEWIDTH, this.GameModel.TILEWIDTH, currentX, currentY, tilesizeinviewport, tilesizeinviewport);

                    }


                }
                if (currentX == 0) {
                    currentX += XtileWidthViewport;
                } else {
                    currentX += tilesizeinviewport;
                }


                //XtileWidthViewport=(tilesizeinviewport);
                //tilewidth=this.GameModel.VIEWPORTSIZE;
                Xindex += 1
            }

            Xindex = Math.floor((left / this.GameModel.WORLDSIZE) * this.GameModel.XTILECOUNT);
            currentX = 0;
            if (currentY == 0) {
                currentY += YtileWidthViewport;
            } else {
                currentY += tilesizeinviewport;
            }
            YtileWidthViewport = (tilesizeinviewport);

            Yindex += 1

        }


        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, this.GameModel.VIEWPORTSIZE);
        context.lineTo(this.GameModel.VIEWPORTSIZE, this.GameModel.VIEWPORTSIZE);
        context.lineTo(this.GameModel.VIEWPORTSIZE, 0);
        context.lineTo(0, 0);
        context.closePath();
        //context.fillStyle = "white";
        //context.fill();
        context.stroke();
    }




    // renderPauseMenu() {
    //     this.context.font = "40px Arial";
    //     this.context.fillStyle = '#ffffff'

    //     this.context.fillText("Press Shift to quit or Control to continue.", 10, this.GameModel.COORD_SIZE - 20);

    // }

    renderScores(context:CanvasRenderingContext2D){
        let players=this.GameModel.OtherPlayers;
        context.font = "50px Arial";
        let loc=50;
        context.fillStyle = '#00FF00'
        context.fillText(`score `+this.GameModel.Self.Score,30,loc);
        context.fillStyle = '#0000FF'

    }
    renderGame() {
        let context = this.context
        if(context){
        this.context?.clearRect(0, 0, this.canvas?.width??0, this.canvas?.height??0);
        this.renderBackground(context);
        this.GameModel.Self.Render(context);
        // for (let i in this.GameModel.Asteroids) {
        //     this.GameModel.Asteroids[i].Render(this.context);
        // }
        this.renderScores(context);
    }
        //this.ExplosiveParticleSystem.render()

        //this.renderGrid(this.context);
        //this.renderMovingTile(this.context);

        //if(this.GameModel.PlayState!="lost"){
        //this.ThrustParticleSystem.render();

        // this.renderLander(this.context);
        // }
        // this.renderStatus()
        // if (this.GameModel.Paused) {
        //     this.renderPauseMenu();s
        // }
        // if(this.Mouse.IsPressed){
        //     this.context.drawImage(this.ResourceLoader.Images.lander, this.Mouse.X - (this.GameModel.LANDER_SIZE / 2), this.Mouse.Y - (this.GameModel.LANDER_SIZE / 2), this.GameModel.LANDER_SIZE, this.GameModel.LANDER_SIZE);

        // }

        //this.renderScoreAndTime();
    }

    processInput() {

        this.Keyboard.Handle();

        //this.Mouse.Handle();
    }
    LastFrameTime = 0;
    update(elapsedTime:number) {



        if (this.LastFrameTime != null) {
            if (this.GameModel.TimeStart == null) {
                this.GameModel.TimeStart = elapsedTime;

            } else {
                this.GameModel.TimeSinceStart = elapsedTime - this.GameModel.TimeStart;


            }
            this.GameModel.TimeSinceStartSeconds = Math.floor(this.GameModel.TimeSinceStart / 1000)

            if (!this.GameModel.Paused) {
                if (this.GameModel.CountDown > 0) {
                    this.GameModel.CountDown -= (elapsedTime - this.LastFrameTime) / 1000;

                }

                // this.updateShip(elapsedTime - this.LastFrameTime);
            }
        }

        
        this.updateSelf(elapsedTime - this.LastFrameTime);
       
        // for (let i in this.GameModel.Asteroids) {
        //     //console.log(this.GameModel.Asteroids[i].X)
        //     //console.log(this.GameModel.Asteroids[i].Y)

        //     if (!this.GameModel.Asteroids[i].Update(elapsedTime - this.LastFrameTime, this.GameModel.Missles)) {
        //         delete this.GameModel.Asteroids[i];
        //     }
        // }
        
        this.LastFrameTime = elapsedTime
        //this.didWin();


    }
    updateSelf(elapsedTime:number) {
        if (this.Keyboard.CommandBuffer.get("jump")) {
            //console.log("trust");
            this.GameModel.Self.Jump(elapsedTime);
        }
        if (this.Keyboard.CommandBuffer.get("left")) {

            this.GameModel.Self.StrafeLeft(elapsedTime);
        }
        if (this.Keyboard.CommandBuffer.get("right")) {
            
            this.GameModel.Self.StrafeRight(elapsedTime);
        }
        if (this.Keyboard.CommandBuffer.get("fire")) {

            //this.GameModel.Self.Fire(elapsedTime, this.GameModel)
        }

        let limits = this.GameModel.getWorldLimits();
        //console.log(limits);
        if (this.GameModel.Self.X < limits.left) {
            this.GameModel.Self.X = limits.left;
        }
        if (this.GameModel.Self.X > limits.right) {
            this.GameModel.Self.X = limits.right;
        }
        if (this.GameModel.Self.Y < limits.top) {
            this.GameModel.Self.Y = limits.top;
        }
        if (this.GameModel.Self.Y > limits.bottom) {
            this.GameModel.Self.Y = limits.bottom;
        }
        this.updateWindow();
        this.GameModel.Self.Update(elapsedTime);

    }
    updateWindow() {
        //console.log(this.GameModel.Self);

        let limits = this.GameModel.getPlayAreaLimits();
        // console.log(limits);

        if (this.GameModel.Self.X < limits.left) {
            this.GameModel.ViewPortCenter.x -= limits.left - this.GameModel.Self.X;
            console.log(limits.left - this.GameModel.Self.X)
            // console.log(limits);
            // console.log(this.GameModel.Self);

        }
        if (this.GameModel.Self.X > limits.right) {
            this.GameModel.ViewPortCenter.x -= limits.right - this.GameModel.Self.X;
            //console.log(limits);
            //console.log(this.GameModel.Self);


        }
        if (this.GameModel.Self.Y < limits.top) {
            this.GameModel.ViewPortCenter.y -= limits.top - this.GameModel.Self.Y;
            //console.log(limits);
            //console.log(this.GameModel.Self);


        }
        if (this.GameModel.Self.Y > limits.bottom) {
            this.GameModel.ViewPortCenter.y -= limits.bottom - this.GameModel.Self.Y;
            //console.log(limits);
            //console.log(this.GameModel.Self);


        }

    }
    gameLoop(elapsedTime:number) {
        this.processInput();
        this.update(elapsedTime);


            this.renderGame();
            requestAnimationFrame(this.gameLoop.bind(this));
        
        
    }
    // handleClick(loc:XY) {
    //     let i = Math.floor(loc.X / (this.GameModel.COORD_SIZE / this.GameModel.size));
    //     let j = Math.floor(loc.Y / (this.GameModel.COORD_SIZE / this.GameModel.size));
    //     let scale = (this.GameModel.COORD_SIZE / this.GameModel.size);
    //     if ((this.GameModel.Grid[i] && this.GameModel.Grid[i][j]) == null) {
    //         return;
    //     }
    //     console.log(this.GameModel.Grid);
    //     if ((this.GameModel.Grid[i + 1] && this.GameModel.Grid[i + 1][j]) === null) {
    //         this.beginMoveTile(this.GameModel.Grid[i][j], { X: i * scale, Y: j * scale }, { X: (i + 1) * scale, Y: j * scale }, this.GameModel.Grid[i + 1][j]);
    //         this.GameModel.Grid[i][j] = null;
    //         this.GameModel.Moves++;


    //     } else
    //         if ((this.GameModel.Grid[i - 1] && this.GameModel.Grid[i - 1][j]) === null) {
    //             this.beginMoveTile(this.GameModel.Grid[i][j], { X: i * scale, Y: j * scale }, { X: (i - 1) * scale, Y: j * scale }, this.GameModel.Grid[i - 1][j]);
    //             this.GameModel.Grid[i][j] = null;
    //             this.GameModel.Moves++;

    //         } else
    //             if ((this.GameModel.Grid[i][j + 1]) === null) {
    //                 this.beginMoveTile(this.GameModel.Grid[i][j], { X: i * scale, Y: j * scale }, { X: (i) * scale, Y: (j + 1) * scale }, this.GameModel.Grid[i][j + 1]);

    //                 this.GameModel.Grid[i][j] = null;
    //                 this.GameModel.Moves++;

    //             } else
    //                 if ((this.GameModel.Grid[i][j - 1]) === null) {

    //                     let start = { X: i * scale, Y: j * scale };
    //                     let end = { X: (i) * scale, Y: (j - 1) * scale }


    //                     this.beginMoveTile(this.GameModel.Grid[i][j], start, end, this.GameModel.Grid[i][j - 1]);
    //                     this.GameModel.Grid[i][j] = null;
    //                     this.GameModel.Moves++;

    //                 }



    // }



    initialize() {
        
        
        this.LastFrameTime = 0;
        //this.Counting = false;
        console.log("starting")
        
        let serverModel={};
        
        this.GameModel = new GameModel(this.ResourceLoader);
        console.log(this.GameModel)

        this.Keyboard = new Keyboard();
        this.Keyboard.EmptyBuffer();

        let canvas =document.getElementById('canvas-main') as HTMLCanvasElement
        if(canvas){
            this.canvas=canvas;
            this.context = this.canvas.getContext('2d');
        }else{
            console.log("canvas strap up failed no rendering possible")
        }
        //this.Mouse = new Mouse(this.canvas);
        //this.Mouse.ClickFunctions.push(this.handleClick.bind(this))
        requestAnimationFrame(this.gameLoop.bind(this));

    }
    componentDidMount() {
        this.initialize();
    }

}
export default Game;