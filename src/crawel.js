//所需依赖:
//npm install mysql
//npm install cheerio
//---------------------------------------------------
//爬虫   获取网页上的数据
//基于node.js服务器，右击鼠标点击Git Bash Here
//运行：node crawel.js
//停止运行：ctrl+ c


//下面是获取网页上的图片
//原生http模块，用于请求文件或者创建服务器
var http = require("http");
//原生fs模块，用于读写文件
var fs = require("fs")
//调用cheerio模块，类似于jquery
var cheerio = require("cheerio")
//调用mysql第三方模块
var mysql = require("mysql")
//进行数据库连接
var connection = mysql.createConnection({
	host: 'localhost', //localhost
	user: 'root',//数据库用户名
	password: 'root',//用户密码
	database: 'laoyao'//数据库名
});

//执行连接
connection.connect();
//此函数用于获取需要被爬虫的网页DOM结构
function download(url, callback) {
	http.get(url, function(res) {
		var data = "";
		res.on('data', function(chunk) {
			data += chunk
		})
		res.on('end', function() {
			callback(data);
		})
	})
}

download("http://www.3jy.com/neihantu/", function(data) {//http://www.mmjpg.com/   http://www.3jy.com/neihantu/
	//将网页信息交给cheerio处理，类似于jquery处理DOM结构
	var $ = cheerio.load(data);
	var imgArr = [];
	//遍历图片信息，并执行存储到数据库
	$('img').each(function(index, ele) {
		var src = $(ele).attr("src");
		//把数据插入到数据库   pach：表名
		connection.query('INSERT INTO `pach`(`src`) VALUES ("' + src + '")', function(error, results, fields) {
			if(error) throw error;
		});
		imgArr.push(src);
	})
	//执行下载图片
	downloadImg(imgArr)
})
//此函数用于下载图片到本地img文件夹
var i = 0;
function downloadImg(imgArr) {
	var lenth = imgArr.length;
	var writerStream = fs.createWriteStream('img/'+i+'.jpg');
	http.get(imgArr[i], function(res) {
		res.pipe(writerStream);
		if(i<lenth){
			i++;
			//递归执行图片下载，确保每一张图片下载完再下载下一张
			downloadImg(imgArr)		
		}else{
			return;
		}
	})
}