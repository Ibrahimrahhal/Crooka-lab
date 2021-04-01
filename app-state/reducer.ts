import { Accident, Car, StoreType } from './store-type';
import Action, { actionTypes } from "./action-type"

const initialStatue:StoreType = {
    accidents: [],
    activeAccident: { }
}
export default (state=initialStatue, action:Action) => {
    if(!action)
        return state;
    let stateToSend;
    switch (action.type) {
        case actionTypes.addCarPictures:
            let car:any = getActiveCar(state);
            car.pictures = [...car.pictures, action.data]
            stateToSend = state;
            break;
        
        case actionTypes.initAccident: 
            let ID =  Date.now().toString();
            let accidents:any = state.accidents;
            state.accidents = [...accidents, {
                ID,
                involvedCars: []
            }];
            (state.activeAccident as  any).ID = ID;
            stateToSend = state;
            break;        
        case actionTypes.setCarModel:
            (getActiveCar(state) as any).modelName = action.data;
            stateToSend = state;
            break;
        case actionTypes.setCarType:
            (getActiveCar(state) as any).type = action.data;
            stateToSend = state;
            break;
        case actionTypes.setCarPlateNumber:
            (getActiveCar(state) as any).platNumber = action.data;
            stateToSend = state;
            break;
        case actionTypes.initNewCar:
            let accid:any = (getActiveAccident(state) as Accident);
            accid.involvedCars = [...accid.involvedCars, {
                car: {
                    pictures: [],
                },
                user: {
                }
            }];
            (state.activeAccident as any ).activeCarIndex = (getActiveAccident(state) as Accident).involvedCars.length - 1;
            stateToSend = state;
            break;    

        case actionTypes.addCrashPoint: 
            let actionCar:any = getActiveCar(state) || {};
            let carPoint:any = actionCar.crashPoints || [];
            carPoint.push(action.data);
            actionCar.crashPoints = carPoint;
            stateToSend = state;
            break;

        case actionTypes.removeCrashPoint:
            let actCar:any = getActiveCar(state) || {};
            let carPoints:any = actCar.crashPoints || [];
            carPoints = carPoints.filter((point)=>{
                return point.ID !== action.data
            })
            actionCar.crashPoints = carPoints;
            stateToSend = state;
            break;
        }

        let strigi = JSON.stringify(stateToSend)
        return strigi?JSON.parse(JSON.stringify(stateToSend)):state
}

function getActiveAccident (state:StoreType): Accident| undefined {
    return (state.accidents || []).find((acc)=>{
        return acc.ID === ( state.activeAccident || {} ).ID;
    });
}

function getActiveCar (state:StoreType): Car | undefined {
    return getActiveAccident(state)?.involvedCars[(state.activeAccident || {}).activeCarIndex || 0].car;
}
