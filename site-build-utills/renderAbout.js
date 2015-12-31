const fs = require('fs');
const jade = require('jade');
const marked = require('marked');

module.exports = function( /*normal arguments here*/ res,rej){
  function sequenceDone(resVal){
    res(resVal);
  }
  // 1st in sequence
  function readMd(readJade){
    fs.readFile('./_src/_about/about-text.md','utf8',function(err,content){
      readJade(marked(content))
    })
  }
  // 2nd in sequence
  function readJade(writeHtml,mdHtml){
    fs.readFile('./_src/index.jade','utf8',function(err,content){
      var jadeFunction = jade.compile(content,{filename:'./_src/index.jade'});
      var finalHtml = jadeFunction({postContent:mdHtml});
      writeHtml(finalHtml);
    })
  }
  // 3rd in sequence
  function writeHtml(finalHtml){
    fs.writeFile('./_dist/index.html',finalHtml,function(err){
      if (err) throw err;
      sequenceDone('*** Done Rendering About');
    })
  }
  // read md calls => readJade which calls => writeFile
  readMd( readJade.bind( null, writeHtml ));
}
