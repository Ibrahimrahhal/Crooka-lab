export default interface action{
    type:number,
    data?:any
};

export const actionTypes = {
    addCarPictures: 1,
    setCarType: 2,
    setCarModel: 3,
    setCarPlateNumber: 4,
    initAccident: 5,
    initNewCar: 6,
    addCrashPoint: 7,
    removeCrashPoint: 8
}