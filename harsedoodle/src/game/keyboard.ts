import { Persistence, ControlMap } from './persistance'

class Keyboard {
  InputBuffer: Map<string, string> = new Map()
  CommandBuffer: Map<string, boolean> = new Map()
  RegisteredFunctions: Map<string, () => void> = new Map()
  ControlMap: ControlMap = new Persistence().GetControlMap()
  constructor() {
    let that = this
    window.addEventListener('keydown', function (event: KeyboardEvent) {
      that.InputBuffer.set(event.key, event.key)
      if (that.ControlMap.jump.includes(event.key)) {
        that.CommandBuffer.set('jump', true)
      }
      if (that.ControlMap.left.includes(event.key) ) {
        that.CommandBuffer.set('left', true)
      }
      if (that.ControlMap.right.includes(event.key) ) {
        that.CommandBuffer.set('right', true)
      }
    })

    window.addEventListener('keyup', function (event: KeyboardEvent) {
      that.InputBuffer.set(event.key, event.key)
      if (that.ControlMap.jump.includes(event.key) ) {
        that.CommandBuffer.set('jump', false)
      }
      if (that.ControlMap.left.includes(event.key) ) {
        that.CommandBuffer.set('left', false)
      }
      if (that.ControlMap.right.includes(event.key) ) {
        that.CommandBuffer.set('right', false)
      }
    })
  }
  AddTrigger(key: string, fn: () => void) {
    this.RegisteredFunctions.set(key, fn)
  }
  RemoveTrigger(key: string) {
    this.RegisteredFunctions.delete(key)
  }
  Handle() {
    for (let input in this.InputBuffer) {
      if (this.RegisteredFunctions.has(input)) {
        let fn = this.RegisteredFunctions.get(input)
        if (fn) {
          fn()
        }
      }
    }
  }
  EmptyBuffer() {
    this.InputBuffer.clear()
    this.CommandBuffer.clear()
  }
}
export default Keyboard
