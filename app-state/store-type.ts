export interface Accident {
    ID: string,
    involvedCars: Array<{
        car: Car,
        user: {
            name?: string,
            ID?: number
        }
    }>
}

export interface Car {
    pictures: Array<{
        side: string,
        photo: string
    }>,
    platNumber?: string,
    modelName?: string,
    type?:string,
    crashPoints?:Array<{x:number, y:number, ID:string}>
}
export interface StoreType {
    accidents?: Array<Accident>,
    activeAccident: {
        ID?:string,
        activeCarIndex?: number
    }
};
