import { Car } from "./car";

export class Accident{
    private CarsInvoved:Array<Car>;
    public Notes:Array<string>;
    constructor(){
        this.CarsInvoved = [];
    }

    public addCar(car:Car):void{
        this.CarsInvoved.push(car);
    }

    public getCars():Array<Car>{
        return this.CarsInvoved;
    }
}