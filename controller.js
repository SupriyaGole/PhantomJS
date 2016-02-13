var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static('.'));

var getLinkAndNews = function(news){
    var newsObj = {};
    var currentNews = news.split(' ->');
    var heading = '<h1 id="heading">' + currentNews[0] +'</h1>';
    var link = currentNews[1];
    var linkString = '<a target="_blank" href="' + link + '"> Get full news </a>';
    newsObj.newsHead = heading;
    newsObj.link = linkString;
    return newsObj;
}

app.post('/getNews',function(req,res){
  var newsData = fs.readFileSync('./newsData.json','utf8');
  var news = newsData.split('__');
  var data = '<html><head><title>News</title> <link rel="stylesheet" href="index.css" type="type/css"></head><body><h1 id="pageTitle">Google News</h1><div class="full">';
  for(var i=0;i<news.length;i++){
    var newsObj = getLinkAndNews(news[i]);
    data+='<div class="newsData">';
    data+=newsObj.newsHead;
    data+=newsObj.link;
    data+='</div>';
  }
  data+='</div></body></html>';
  fs.writeFileSync('./news.html',data);
  res.redirect('news.html');
});

module.exports = app;
