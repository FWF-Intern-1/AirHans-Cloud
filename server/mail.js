const nodemailer = require('nodemailer')

//设置邮箱配置
let transport = nodemailer.createTransport({
    host:'smtp.163.com',//邮箱服务的主机，如smtp.qq.com
    port:'465',//对应的端口号
    //开启安全连接
    secure:true,
    //secureConnection:false,
    //用户信息
    auth:{
      user:'airhans_cloud@163.com',
      pass:'YJDLZXHEHLGNBOCF'
    }
  });
const randomFns=()=> { // 生成6位随机数
    let code = ""
    for(let i= 0;i<6;i++){
        code += parseInt(Math.random()*10)
    }
    return code 
}
const regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ //验证邮箱正则

function sendmail(mail){
    if (regEmail.test(mail)){  //邮箱验证通过
        var code=randomFns()
    
        transport.sendMail({
          from: 'airhans_cloud@163.com', // 发件邮箱
          to: mail, // 收件列表
          cc: 'airhans_cloud@163.com',
          subject: 'AirHans-Cloud注册验证', // 标题
          html: `
          <p>你好！</p>
          <p>我们是 AirHans-Cloud，您正在注册AirHans-Cloud聊天室</p>
          <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
          <p>***该验证码5分钟内有效***</p>` // html 内容
        }, 
        function(error, data) {
            if(error){
                transport.close(); // 如果没用，关闭连接池
                console.log(error)
            }
            console.log(data)
         })
        //....验证码发送后的相关工作 
    
      }else{
      }

}
module.exports = {
    sendmail
}