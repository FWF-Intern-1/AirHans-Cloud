const express = require('express')
const app = express();

app.use(express.static('../client/templete'),(err)=>{
    if(err)
        console.log(err)
})

app.listen(80,(err)=>{
    console.log("http://127.0.0.1:80")
    if (err)
        console.log(err)
})
