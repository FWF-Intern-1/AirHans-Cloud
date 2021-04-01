const express = require('express')
const app = express();

app.use(express.static(express.__dirname + '/templete'),(err)=>{
    if(err)
        console.log(err)
})

app.listen(8120,(err)=>{
    console.log("http://127.0.0.1:80")
})
