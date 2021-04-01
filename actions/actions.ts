import Action, { actionTypes } from "../app-state/action-type";

export function addCarPictures(picture):Action {
    return {
        type: actionTypes.addCarPictures,
        data: picture
    }
}

export function selectCarType(type):Action {
    return {
        type: actionTypes.setCarType,
        data: type
    }
}

export function selectCarModel(model):Action {
    return {
        type: actionTypes.setCarModel,
        data: model
    }
}

export function setCarPlatnumber(number):Action {
    return {
        type: actionTypes.setCarPlateNumber,
        data: number
    }
}

export function initAccident():Action {
    return {
        type: actionTypes.initAccident
    }
}

export function initNewCar():Action {
    return {
        type: actionTypes.initNewCar
    }
}

export function addPoint(point:{ x:number, y:number, ID:string}):Action {
    return {
        type: actionTypes.addCrashPoint,
        data: point
    };
}

export function removePoint(pointID:string):Action {
    return {
        type: actionTypes.addCrashPoint,
        data: pointID
    };
}
