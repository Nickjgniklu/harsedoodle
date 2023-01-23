// ------------------------------------------------------------------
//
// This is a random number generation object.  It provides a handful
// of different ways to generate random numbers.  It is written as a
// Singleton so that there is only one of these throughout the program.
//
// ------------------------------------------------------------------
 class Random {

     nextDouble() {
        return Math.random();
    }

     nextRange(min:number, max:number) {
        let range = max - min;
        return Math.floor((Math.random() * range) + min);
    }

     nextCircleVector() {
        let angle = Math.random() * 2 * Math.PI;
        return {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };
    }

    //
    // This is used to give a small performance optimization in generating gaussian random numbers.
     usePrevious = false;
     y2=1;

    //
    // Generate a normally distributed random number.
    //
    // NOTE: This code is adapted from a wiki reference I found a long time ago.  I originally
    // wrote the code in C# and am now converting it over to JavaScript.
    //
     nextGaussian(mean:number, stdDev:number) {
        let x1 = 0;
        let x2 = 0;
        let y1 = 0;
        let z = 0;

        if (this.usePrevious) {
            this.usePrevious = false;
            return mean + this.y2 * stdDev;
        }

        this.usePrevious = true;

        do {
            x1 = 2 * Math.random() - 1;
            x2 = 2 * Math.random() - 1;
            z = (x1 * x1) + (x2 * x2);
        } while (z >= 1);
        
        z = Math.sqrt((-2 * Math.log(z)) / z);
        y1 = x1 * z;
        this.y2 = x2 * z;
        
        return mean + y1 * stdDev;
    }
}
export default new Random()