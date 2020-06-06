import {createStore} from 'redux';

// Action generator - function that return action object

const incrementCount = ({incrementBy=1}={}) =>({
        type:'INCREMENT',
        incrementBy
}
);


//Reducers
//1) Reducers are pure fuction
//2) Never change state or action
 const countReducer = (state = { count:0 }, action)=>{
    switch (action.type){
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number'?action.incrementBy:1;
            return {
                count:state.count + incrementBy
            };
        case 'RESET':
            return {
                count : 0
            };
        default:
            return state;
    }
}


const decrementCount = ({decrementBy = 1}={})=>({
    type:'DECREMENT',
    decrementBy
});

const store = createStore(countReducer);

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
});



//ACtion - an object that gets sent to the store
store.dispatch(incrementCount({incrementBy:5}))

//unsubscribe(); - unsubscribe from the changes

store.dispatch(
    {
        type:'RESET'
     }
);
