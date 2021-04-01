import { Accident, StoreType, Car} from './store-type';
import { applyMiddleware, createStore, Store } from 'redux';
import MainReducer from './reducer';
var store:Store = createStore(MainReducer as any);
export default store;

export function getActiveAccident (state:StoreType = store.getState()): Accident| undefined {
    if(!state)
        return undefined;
    return (state.accidents || []).find((acc)=>{
        return acc.ID === ( state.activeAccident || {} ).ID;
    });
}

export function getActiveCar (state:StoreType = store.getState()): Car | undefined {
    if(!state)
        return undefined;
    return getActiveAccident(state)?.involvedCars[(state.activeAccident || {}).activeCarIndex || 0].car;
}
