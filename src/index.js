//在nodejs运行   右键打开Git Bash Here  执行命令：node index.js  返回输出的a即1
var a = 1;
console.log(a)

//创建第一个应用
//步骤1：引入 required 模块：我们可以使用 require 指令来载入 Node.js 模块。
var http = require("http");//httpn内置模块
//步骤2：创建服务器
http.createServer(function(request,reponse){
	//解决跨域
	reponse.setHeader("Access-Control-Allow-Origin","*");
	var obj =[{
		name:'abc',
		age:0
	}]
	reponse.end(JSON.stringify(obj))
}).listen(1234)//端口   url:localhost:1234  在服务器打开localhost:1234 
console.log("服务器启动")

//右键打开Git Bash Here 执行命令：node src/index.js   打开服务器










