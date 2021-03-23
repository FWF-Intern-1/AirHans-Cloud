const http = require('http')
const createpeople = require('./cre_obj.js')
const server = http.createServer((req, res) => {
    // 可以访问 HTTP 请求头
    var post = ""
    req.on('data', chunk => {
        post+=chunk;
        
    })
    req.on('end', () => {
      //数据结束
      
      post=JSON.parse(post);
      createpeople.createpeople(post.name,post.ac)
    })
  }).listen(9999,()=>{
      console.log("server at pprt 9999")
  })
