const moment =  require("moment");
function shiftConvert(date, shifting){
    var shift = {
        startDate: null,
        endDate: null
    }
    switch(shifting){
        case 1: // 7h-8h
            console.log(moment(date).add(7, "hours").toDate());
            shift.startDate = moment(date).add(7, "hours");
            shift.endDate = moment(date).add(8, "hours");
            break;
        case 2: // 8h-9h
            shift.startDate = moment(date).add(8, "hours");
            shift.endDate = moment(date).add(9, "hours") ;
            break;
        case 3: // 9h-10h
            shift.startDate = moment(date).add(9, "hours");
            shift.endDate = moment(date).add(10, "hours") ;
            break;
        case 4: // 10h-11h
            shift.startDate = moment(date).add(10, "hours");
            shift.endDate = moment(date).add(11, "hours") ;
            break;
        case 5: // 13h-14h
            shift.startDate = moment(date).add(13, "hours");
            shift.endDate = moment(date).add(14, "hours") ;
            break;
        case 6: // 14-15h
            shift.startDate = moment(date).add(14, "hours");
            shift.endDate = moment(date).add(15, "hours") ;
            break;
        case 7: // 15h-16h
            shift.startDate = moment(date).add(15, "hours");
            shift.endDate = moment(date).add(16, "hours") ;
            break;
        case 8: // 16h-17h
            shift.startDate = moment(date).add(16, "hours");
            shift.endDate = moment(date).add(17, "hours") ;
            break;
    }
    return shift;
}

module.exports = shiftConvert;