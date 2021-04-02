const http = require('http');
const fs = require('fs');
const mime = require('mime');
const port = 80;


http.createServer((req,res)=>{
//路径分析 
    var pathname = req.url;
    if(pathname === "/"){
        pathname += "templete/index.html";
    }
    console.log(pathname);

    fs.readFile(pathname.substr(1),(err,data)=>{
        if(err){
            console.log(err);
            res.writeHead(404,{'Content-Typr': 'text/html' });
        }
        else{
            res.writeHead(200,{"Content-Type": mime.getType(pathname)});
            res.write(data.toString());
        }
        res.end();
    })
    


// 监听端口
}).listen(port,()=>{
    console.log('server on port',port);
})