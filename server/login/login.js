const http = require('http')
const createpeople = require('./cre_obj.js')
const incode = require('./mail.js')
http.createServer((req,res)=>{
    let data = '';
    var right_code = incode.sharecode();
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        data=JSON.parse(data)
        console.log(data)
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8',"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods": "POST"});
        
        // if(data.user_code === right_code){
            res.end(`${data.email}已注册`)
            createpeople.createpeople(data.account,data.password,data.email)
            // createpeople.createpeople('11211@qq.com','ss2s','33332')
        // }
        // else{
        //     res.end(0,"user_code is wrong, please write again")
        // }
    })
    
}).listen(6666,()=>{
    console.log('listing 6666')
})