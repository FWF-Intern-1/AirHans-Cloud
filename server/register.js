const http = require('http')
const createpeople = require('./cre_obj.js')
const incode = require('./mail.js')
// const user = require("./User")
// const bcrypt = require("bcryptjs")

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
            // user.User.create({
            //     account:data.account,
            //     email:data.email,
            //     password:bcrypt.hashSync(data.password,5)
            // })
            createpeople.createpeople(data.account,data.password,data.email)
            // res.end("注册成功")
            res.send({

                status: 1,
                des: "注册成功",
                id: data.account,
                email: data.email

            });
            res.end();
        }
        else{
            // res.end("user_code is wrong, please write again")
            res.send({

                status: 2,
                des: "验证码错误"
            })
            res.end();
        }
    })
    
}).listen(5555,()=>{
    console.log('register.js listing 5555')
})