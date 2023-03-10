import GameObject from './game-object'
import Platform from './platform'
import Player from './player'
import ResourceLoader from './resource-loader'
import Random from './random'
class GameModel {
  ResourceLoader: ResourceLoader
  Start: number
  PlayerScore: number = 0
  TimeStart: number | null = null
  TimeSinceStart: number = 0
  TimeSinceStartSeconds: number | null = null
  Self: Player
  Time = 0
  Paused = false
  WORLDSIZE = 10240 * 2
  VIEWPORTSIZE = 2048
  PLAYAREASIZE = 1300
  XTILECOUNT = 40
  YTILECOUNT = 40
  TILEWIDTH = 193
  // TILEWIDTH=this.WORLDSIZE/this.VIEWPORTSIZE;
  ViewPortCenter = { x: this.WORLDSIZE / 2, y: this.WORLDSIZE / 2 }

  Platform_START_COUNT = 500
  Platforms: Platform[] = []

  UFO_DEFAULT_SIZE = 400
  UFO_START_COUNT = 5
  UFOs = {}

  Grid: string[][] = []

  CountDown = 0
  size = 4
  Moves = 0

  OtherPlayers = []
  createRandomPlatforms() {
    for (let i = 0; i < this.Platform_START_COUNT; i++) {
      let x = Random.nextRange(1000, this.WORLDSIZE)
      let y = Random.nextRange(0, this.WORLDSIZE)
      this.Platforms.push(new Platform(x, y, this))
    }
  }

  getPlayAreaLimits() {
    let padding = (this.VIEWPORTSIZE - this.PLAYAREASIZE) / 2

    let l = this.ViewPortCenter.x - this.VIEWPORTSIZE / 2 + padding
    let r = this.ViewPortCenter.x + this.VIEWPORTSIZE / 2 - padding
    let t = this.ViewPortCenter.y - this.VIEWPORTSIZE / 2 + padding
    let b = this.ViewPortCenter.y + this.VIEWPORTSIZE / 2 - padding
    return { left: l, right: r, top: t, bottom: b }
  }
  getWorldLimits() {
    let padding = (this.VIEWPORTSIZE - this.PLAYAREASIZE) / 2

    let l = 0 + padding
    let r = this.WORLDSIZE - padding
    let t = 0 + padding
    let b = this.WORLDSIZE - padding
    return { left: l, right: r, top: t, bottom: b }
  }

  constructor(resources: ResourceLoader) {
    this.ResourceLoader = resources
    this.Start = performance.now()

    this.PrepTiles()

    let playerImg = this.ResourceLoader.Images.get('player.png')
    if (playerImg) {
      this.Self = new Player(
        100,
        playerImg,
        this.WORLDSIZE,
        this,
        50,
        this.WORLDSIZE - 20
      )
    } else {
      console.log('uh oh player sprite not loaded')
      this.Self = new Player(
        100,
        new Image(),
        this.WORLDSIZE,
        this,
        this.WORLDSIZE / 2,
        100
      )
    }
    this.createRandomPlatforms()
  }

  PrepTiles() {
    this.Grid = []
    for (let i = 0; i < this.XTILECOUNT; i++) {
      this.Grid.push([])
      for (let j = 0; j < this.YTILECOUNT; j++) {
        if (i === 0) {
          this.Grid[i].push(`building-1.png`)
        } else if (i === this.YTILECOUNT - 1) {
          this.Grid[i].push(`building-6.png`)
        } else {
          this.Grid[i].push(`building-4.png`)
        }
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
  angleBetweenObjects(obj1: GameObject, obj2: GameObject) {
    return Math.atan2(obj2.Y - obj1.Y, obj2.X - obj1.X)
  }
  distanceBetweenObjects(obj1: GameObject, obj2: GameObject) {
    let x1 = obj1.X
    let x2 = obj2.X
    let y1 = obj1.Y
    let y2 = obj2.Y

    let xs = x2 - x1
    let ys = y2 - y1

    xs *= xs
    ys *= ys

    return Math.sqrt(xs + ys)
  }
  objectsCollided(obj1: GameObject, obj2: GameObject) {
    let boundary = obj1.Size / 2 + obj2.Size / 2
    let dist = this.distanceBetweenObjects(obj1, obj2)
    if (dist <= boundary) {
      return true
    } else {
      return false
    }
  }
  xWorldToViewPort(worldCordx: number) {
    let left = this.ViewPortCenter.x - this.VIEWPORTSIZE / 2
    return worldCordx - left
  }
  yWorldToViewPort(worldCordy: number) {
    let top = this.ViewPortCenter.y - this.VIEWPORTSIZE / 2
    return worldCordy - top
  }
}
export default GameModel
