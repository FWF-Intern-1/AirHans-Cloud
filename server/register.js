const http = require('http')
const incode = require('./mail.js')
const user = require("./User")
const bcrypt = require("bcryptjs")

http.createServer((req,res)=>{
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end',async () => {
        data=JSON.parse(data)
        console.log(data)
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8',"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods": "POST"});
        var right_code = incode.sharecode().yzcode;
        console.log(`验证码是:${right_code}`)
        if(data.captcha == right_code){
                await user.User.create({
                account:data.account,
                email:data.email,
                avatar_url:"../img/img_"+Math.ceil(Math.random()*10)+".jpg", 
                password:bcrypt.hashSync(data.password,5)
            })
            res.end("注册成功")
        }
        else{
            res.end("user_code is wrong, please write again")
        }
    })
    
}).listen(5555,()=>{
    console.log('register.js listing 5555')
})