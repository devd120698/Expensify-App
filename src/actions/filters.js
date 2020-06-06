//4) SET_TEXT_FILTER
export const setTextFilter = (text ='')=>({
    type:'SET_TEXT_FILTER',
    text
});
//5) SORT_BY_DATE
export const sortByAmount=()=>({
    type:'SORT_BY_AMOUNT'
});
//6) SORT_BY_AMOUNT
export const sortByDate=()=>({
    type:'SORT_BY_DATE'
});
//7) SET_START_DATE
export const setStartDate=(startDate = 0)=>({
    type:'SET_START_DATE',
    startDate
});
//8) SET_END_DATE
export const setEndDate=(endDate = 0)=>({
    type:'SET_END_DATE',
    endDate
});
