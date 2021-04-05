const express = require('express')
const app =express();
const user = require('./User')
app.post('/', async (req, res) => {
    const account = req.body;
    const model = await user.User.findOne({
        where: {
            account:account
          }
    })
    const url = model.dataValues.avatar_url;
    res.end(url)
})
//TODO 注册重复用户的检测
// app.post('/test',async(req,res)=>{
//     const account = req.body;
//     console.log(account);
//     let search = await user.User.findAll({
//         attributes:['account','email']
//     })
//     console.log(search);
//     let w = new Array();
//     let i;
//     for(i=0;i<search.length;i++){
//         w[i] = (search[i].dataValues.account)
//         console.log(search[i].dataValues.account)
//     }
//     console.log("||||||||",w[i]);
//     if(account == w[i]){
//         console.log("nooooooooo")
//         res.send({msg:"nooooo"}) 
//     }else{
//         console.log("yessssss")
//         res.send({msg:"yesssss"})
//     }
// })

app.listen(8083,()=>{
    console.log('listening 8083')
})