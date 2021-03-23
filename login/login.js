const http = require('http')
//const sm  = require('./mail')
const createpeople = require('./cre_obj.js')
//const user = require("./User.js");

http.createServer((req,res)=>{
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    
    req.on('end', () => {
        data=JSON.parse(data)
        console.log(data)
        //sm.sendmail(data.mail,data.account,data.password)
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        // res.end(`${data.email,data.account,data.password} 已发送`)
        // console.log(`${data.email,data.account,data.password} 已发送`)
        //createpeople.createpeople('aa','aa','123','784312513@qq.com')
        //createpeople.createpeople(data.email,data.account,data.password)
        
    })
    
}).listen(8080,()=>{
    console.log('listing 8080')
})