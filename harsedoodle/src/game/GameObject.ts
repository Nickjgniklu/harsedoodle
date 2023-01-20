export default interface GameObject{
 X:number
 Y:number
 Rotation:number
 Update(elapsedTime:number):void
 Render(context:CanvasRenderingContext2D):void
}