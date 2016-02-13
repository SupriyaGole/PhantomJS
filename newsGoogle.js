var page = require('webpage').create();
var fs = require('fs');
var url = "https://news.google.com";
page.open(url, function(status) {
  var news = page.evaluate(function() {
    var x = document.getElementsByClassName('esc-lead-article-title');
    return Array.prototype.map.call(x,function(record){
      return (record.children[0].children[0].innerHTML);
    }).join('\n').split('\n');
  });

  var links = page.evaluate(function() {
    var x = document.getElementsByClassName('esc-lead-article-title');
    return Array.prototype.map.call(x,function(record){
      return record.children[0].getAttribute('href');
    }).join('\n').split('\n');
  });
  var data = [];
  for(var i=0;i<news.length;i++){
    var link = [' ->',links[i]].join(' ');
    news[i]+= link;
    data.push(news[i]);
  }
  fs.write('newsData.json',data.join('__'));
  phantom.exit();
});