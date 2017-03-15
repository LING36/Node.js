//引入 required 模块
var http = require("http");//httpn内置模块
//连接数据库   自己要安装好服务器，服务器内建好自己的数据库和表
//1、先执行命令：npm install mysql
//2、引入mysql第三方模块
var mysql = require("mysql");
//进行数据连接    网址：https://www.npmjs.com/package/mysql

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',//数据库用户名
	password: 'root',//用户密码
	database: 'laoyao' //数据库名
});
//执行连接
connection.connect();
//步骤2：创建服务器
http.createServer(function(request, reponse) {
	//解决跨域
	reponse.setHeader("Access-Control-Allow-Origin", "*");
	var attrs = []
	connection.query('SELECT * FROM class', function(error, results, fields) {
		if (error) throw error;
//		console.log('The solution is: ', results); //打印出数据
		attrs = results
//		connection.end();加上此句执行一次后服务器会断开
		reponse.end(JSON.stringify(attrs))
	});

}).listen(9090); //端口   url:localhost:9090  在服务器打开localhost:9090
console.log("服务器启动")



