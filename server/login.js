const http = require('http')
const sm  = require('./mail')

http.createServer((req,res)=>{
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        data=JSON.parse(data)
        console.log(data)
        sm.sendmail(data.mail)
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.end(`${data.mail} 已发送`)
        console.log(`${data.mail} 已发送`)
    })
    
}).listen(7777,()=>{
    console.log('listing 7777')
})