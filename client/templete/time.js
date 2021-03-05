function startTime(){
    var time =new Date();
    var h=time.getHours();
    var m=time.getMinutes();
    var s=time.getSeconds();
    m=checktime(m);
    s=checktime(s);
    document.getElementById("aa").innerHTML=h+":"+m+":"+s;
 }
function checktime(i){
    if (i<=9){
        i="0"+i
    }
    return i;
}