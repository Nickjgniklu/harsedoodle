// ------------------------------------------------------------------
// 
// Handles Local Storage
//
// ------------------------------------------------------------------
export class ControlMap {
    left = "ArrowLeft"
    right = "ArrowRight"
    jump = " "
}
export class Persistence {
    private prefix = "Nykloo.";
    private ControlsKey = "Controls";
    private Controls: ControlMap = new ControlMap();

    GetControlMap(): ControlMap {
        return this.Controls;
    }
    SetControlMap(mapping: ControlMap) {
        localStorage[this.prefix + this.ControlsKey] = JSON.stringify(mapping);
    };
    constructor() {

        if (localStorage[this.prefix + this.ControlsKey] != null) {
            this.Controls = JSON.parse(localStorage[this.prefix + this.ControlsKey]);
        }

    }
}