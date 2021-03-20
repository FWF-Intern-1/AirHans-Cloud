const http = require('http')
//const sm  = require('./mail')
const createpeople = require('./cre_obj.js')

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
        res.end(`${data.mail,data.account,data.password} 已发送`)
        console.log(`${data.mail,data.account,data.password} 已发送`)
        createpeople.createpeople(data.name,data.account,data.password,data.mail)
    })
    // creat.creatpeople(data.email,data.account,data.password)
    
}).listen(7788,()=>{
    console.log('listing 7788')
})