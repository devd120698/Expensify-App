import { addExpense, editExpense, removeExpense } from '../../../src/actions/expenses'
test('should setup remove expense action object',()=>{
    const action = removeExpense({ id : '123abc'});
    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id:'123abc'
    })
})
test('should setup edit expense action object', ()=>{
    const action = editExpense('123abc', {updates:'new update'})
    expect(action).toEqual({
       type:'EDIT_EXPENSE',
       id: '123abc',
       updates:{
           updates:'new update'
       },
    })
} )

test('should setup add expense action object with provided value', ()=>{
    const expenseData = {
        description:'Rent',
        amount:10295,
        createdAt:1000,
        note:'this is last month rent'
    }
    const action=addExpense(expenseData);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id:expect.any(String)
        }
    })
})

test('should setup add expense action object with default value', ()=>{
    const expenseData={
        description:'',
        amount:0,
        createdAt:0,
        note:''
    }
    const action=addExpense(expenseData);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            id:expect.any(String),
            ...expenseData
        }
    })
})