import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseList} from '../../components/ExpenseList';
import expenses from '../dummy data/expenses';

test('should render expense list with expense', ()=>{
    const wrapper = shallow(<ExpenseList expenses = {expenses}/>)
    expect(wrapper).toMatchSnapshot();
});
test('should render ExpenseList with empty message',()=>{
    const wrapper = shallow(<ExpenseList expenses = {[]}/>)
    expect(wrapper).toMatchSnapshot();
})