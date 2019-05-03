
function convertDepartment(number){
    let ret = ""; 
    if(number == 1){
        ret = "ĐA KHOA";
        return ret;
    }
    else if (number == 2){
        console.log("Đã vào conver Dep:" )
        ret = "NHA KHOA";
        return ret;
    }
    else if (number == 3){
        ret = "TIM MẠCH";
        return ret;
    }
    else if (number == 4){
        ret = "TAI MŨI HỌNG";
        return ret;
    }
    else{
        return null;
    }
    
}

module.exports = convertDepartment;