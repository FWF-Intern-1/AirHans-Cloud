const express = require('express')
const app = express();

app.use(express.static(__dirname + '/client'))

app.listen(999,()=>{
    console.log('listing 999')
})