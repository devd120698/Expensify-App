import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

// const date = new Date();

const now = moment();
console.log(now.format());

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calenderFocused: false,
            error: ''
        };
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    };
    onTextareaChange = (e) => {
        const textarea = e.target.value;
        this.setState(() => ({note: textarea}))
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        // ^\d*(\.\d{0,2})?$ => regular expression
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}))
        }
    }
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({createdAt}))
        }
    }
    onFocusChange = ({focused}) => {
        this.setState(() => ({calenderFocused: focused}))
    }
    onSubmit = (e) => {
        // preventDefault - Prevents the full page refresh
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            //set error state equal to "please provide valid data"
            this.setState(() => ({error: 'Please provide valid data'}))
        } else {
            this.setState(() => ({error: ''}))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }

    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        placeholder='Description'
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type='text'
                        placeholder='Amount'
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calenderFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder='Add a note for your expense(optional)'
                        value={this.state.note}
                        onChange={this.onTextareaChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}