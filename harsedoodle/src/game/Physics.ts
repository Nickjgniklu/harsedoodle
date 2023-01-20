// import XY from "./XY";

// class Physics{
//     checkIntersection(crashpath:[],landpath:[][],center:XY,radius:number) {
//         let intersected = false;
//         let safe = false;
//         for (let i = 0; i < crashpath.length - 1; i++) {
//             intersected = this._lineCircleIntersection(crashpath[i], crashpath[i + 1], center,radius);
//             if (intersected) {
//                 for (let j = 0; j < landpath.length; j++) {
//                     if (landpath[j][0].x == crashpath[i].x &&
//                         landpath[j][0].y == crashpath[i].y &&
//                         landpath[j][1].x == crashpath[i + 1].x &&
//                         landpath[j][1].y == crashpath[i + 1].y
    
//                     ) {
//                         safe = true;
//                     }
//                 }
//                 break;
//             }
    
    
//         }
//         return { hit: intersected, safe: safe };
//     }
//     _lineCircleIntersection(pt1, pt2, shipState,radius) {
//         let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
//         let v2 = { x: pt1.x - shipState.x, y: pt1.y - shipState.y };
//         let b = -2 * (v1.x * v2.x + v1.y * v2.y);
//         let c = 2 * (v1.x * v1.x + v1.y * v1.y);
//         let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - radius * radius));
//         if (isNaN(d)) { // no intercept
//             return false;
//         }
//         // These represent the unit distance of point one and two on the line
//         let u1 = (b - d) / c;
//         let u2 = (b + d) / c;
//         if (u1 <= 1 && u1 >= 0) {  // If point on the line segment
//             return true;
//         }
//         if (u2 <= 1 && u2 >= 0) {  // If point on the line segment
//             return true;
//         }
//         return false;
//     }
//     }
//     export default Physics;