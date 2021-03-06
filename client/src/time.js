function startTime(){
    var time =new Date();
    var h=time.getHours();
    var m=time.getMinutes();
    //var s=time.getSeconds();
    m=checktime(m);
    //s=checktime(s);
    //document.getElementById("aa").innerHTML=h+":"+m+":"+s;
    document.getElementById("aa").innerHTML=h+":"+m;
 }
function checktime(i){
    if (i<=9){
        i="0"+i
    }
    return i;
}


const checkDate = (date)=> {
    //获取timeNow
    //循环调用printTimeEver，并拉取过去消息对应的时间
}

const printTimeEver = (timeRecord) => {
    //timeNow 在这个函数外部给出
    let dayDifference = parseInt(timeNow - timeRecord) / 86400000;
    switch (dayDifference) {
        case 0:
            //只输出h和m
            break;
        case 1:
            //增加输出昨天
            break;
        case 2:
            //增加输出前天
            break;
        default:
            //输出m,d,h,m
    }

}

const isRecent = (timeLast) => {
    let timeNow = new Date();
    if (timeNow - timeLast > 300000)  {   //5min

        startTime();    //输出现在的时间
    }
    else {
        console.log("距离上次收发消息未到5min");
    }
    timeLast = new Date();
    console.log(timeLast);
}

export { isRecent }