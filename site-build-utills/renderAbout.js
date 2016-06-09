const fs = require('fs');
const jade = require('jade');
const marked = require('marked');

module.exports = function( /*normal arguments here*/ res,rej){
  function sequenceDone(resVal){
    res(resVal);
  }
  // convert about me markdown text to html
  function readMd(readJade){
    fs.readFile('./_src/_about/about-text.md','utf8',function(err,content){
      writeMd(marked(content));
    })
  }
  // write about me markdown to file
  function writeMd(html){
    fs.writeFile('./_src/assets/html/about.html', html, function() {
      readJade();
    })
  }
  // convert index.jade to html
  function readJade(){
    fs.readFile('./_src/index.jade','utf8',function(err,content){
      var jadeFunction = jade.compile(content,{
        filename:'./_src/index.jade',
        pretty: true
      });

      writeHtml( jadeFunction() );
    })
  }
  // write complete index.html page to folder
  function writeHtml(finalHtml){
    fs.writeFile('./_dist/index.html',finalHtml,function(err){
      if (err) throw err;
      sequenceDone('*** Done Rendering About');
    })
  }
  // read md calls => readJade which calls => writeFile
  readMd( readJade.bind( null, writeHtml ));
}
