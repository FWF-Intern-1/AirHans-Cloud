const http = require('http')
const createpeople = require('./cre_obj.js')
const incode = require('./mail.js')
http.createServer((req,res)=>{
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        data=JSON.parse(data)
        console.log(data)
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8',"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods": "POST"});
        var right_code = incode.sharecode().yzcode;
        console.log(`验证码是:${right_code}`)
        if(data.captcha == right_code){
            res.end("注册成功")
            createpeople.createpeople(data.account,data.password,data.email)
            // createpeople.createpeople('11211@qq.com','ss2s','33332')
        }
        else{
            res.end("user_code is wrong, please write again")
        }
    })
    
}).listen(5555,()=>{
    console.log('register.js listing 5555')
})