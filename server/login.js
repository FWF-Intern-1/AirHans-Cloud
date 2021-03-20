const http = require('http')

http.createServer((req,res)=>{
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        data=JSON.parse(data)
        console.log(data)
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.end(`${data.email} 已发送`)
        
    })
    // creat.creatpeople(data.email,data.account,data.password)
    
}).listen(7788,()=>{
    console.log('listing 7788')
})