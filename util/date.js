export function getFormettedDate(date) {
   //return  `${date.getFullYear()}-${date.getMonth()+1 }-${date.getDate()}`;
    // или можно так: 
    return date.toISOString().slice(0,10);
}

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}