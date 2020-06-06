import { createStore, combineReducers } from  'redux';
import uuid from 'uuid';
//Actions that can be done ->
//1) ADD_EXPENSE
const addExpense = (
    { 
        description='', 
        note='', 
        amount=0, 
        createdAt=0  
    })=>({
    type:'ADD_EXPENSE',
    expense:{
        id:uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//2) REMOVE_EXPENSE
const removeExpense = (id)=>({
    type:'REMOVE_EXPENSE',
    id
});
//3) EDIT_EXPENSE
const editExpense=(id, updates)=>({
    type:'EDIT_EXPENSE',
    id,
    updates
})
//4) SET_TEXT_FILTER
const setTextFilter = (text ='')=>({
    type:'SET_TEXT_FILTER',
    text
});
//5) SORT_BY_DATE
const sortByAmount=()=>({
    type:'SORT_BY_AMOUNT'
});
//6) SORT_BY_AMOUNT
const sortByDate=()=>({
    type:'SORT_BY_DATE'
});
//7) SET_START_DATE
const setStartDate=(startDate = 0)=>({
    type:'SET_START_DATE',
    startDate
});
//8) SET_END_DATE
const setEndDate=(endDate = 0)=>({
    type:'SET_END_DATE',
    endDate
});
// THESE ARE TOO MANY ACTIONS FOR A SINGLE REDUCER TO HANDLE
// SO WE WILL MAKE DIFFERENT REDUCERS AND THEN COMBINE THEM

//====================
//    Expenses Reducers
//====================

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
     switch (action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=>{
                return id !== action.id;
            });
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(action.id === expense.id){
                    return {
                        ...expense,
                        ...action.updates
                    };
                }else{
                    return expense;
                }
            });
        default :
           return state;
     }
};

//====================
//    Filters Reducers
//====================

const filterReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
};

const filterReducers = (state=filterReducerDefaultState, action)=>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text:action.text
            };
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy:'amount'
            };
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy:'date'
            };
        case 'SET_START_DATE':
            return{
                ...state,
                startDate:((action.startDate)?action.startDate:undefined)
            };
        case 'SET_END_DATE':
            return{
                ...state,
                endDate:((action.endDate)?action.endDate:undefined)
            };    
        default:
            return state;
    }
};

//=================================
//      GET VISIBLE EXPENSES
//=================================
const getVisibleExpenses=(expenses, { text, sortBy, startDate, endDate })=>{
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >=startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <=endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b)=>{
        if(sortBy==='date'){
            return a.createdAt<b.createdAt? 1: -1;
        }
        if(sortBy==='amount'){
            return a.amount<b.amount?1:-1;
        }
    });
};




//======================================
//          Store Creation
//======================================

const store = createStore(
    combineReducers({
        expenses:expensesReducer,
        filters:filterReducers
    })
);
store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description:'Rent', amount:100, createdAt: 1000}))
const expenseTwo = store.dispatch(addExpense({description:'Coffee', amount:300, createdAt:-10000}))

// store.dispatch(removeExpense(expenseOne.expense.id))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount:500 }));

store.dispatch(setTextFilter('rent'));
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
store.dispatch(setStartDate(-12500));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());

const demoState = {
    expenses:[{
        id:'sdfefwerwe',
        description:'Jan Rent',
        note:'dfjjhfkdjfhhfioehjioejjfsfgdsf',
        amount: 54547,
        createdAt: 0
    }],
    filters:{
        text:'rent',
        sortBy:'amount', //date or amount
        startDate:undefined,
        endDate:undefined
    }
};


// const user={
//     name:'hjadsh',
//     age:45
// };

// console.log({
//     ...user
// })