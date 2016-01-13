const fs = require('fs');
const jade = require('jade');
const marked = require('marked');

module.exports = function(res,rej){
  /*
   * Handles the sequential operation of async functions
  */
  function* render(){
    var html = yield readFile();
    yield writeFile(html);
    res("Done Writing Portoflio Index")
  }

  /*
   * ASYNC FUNCTIONS
  */
  function readFile(){
    fs.readFile('./_src/portfolio/index.jade', 'utf8', handleRead)
    function handleRead(err,content) {
      if (err) { throw err }

      const options = {
        pretty: true,
        filename:'./_src/portfolio/index.jade'
      }
      const variables = { }
      var jadeFunction = jade.compile(content,options);
      GI.next(jadeFunction());
    }
  }
  function writeFile(html){
    fs.writeFile('./_dist/portfolio/index.html', html, handleWrite);
    function handleWrite(err){
      if (err) throw err;
      GI.next();
    }
  }

  var GI = render();
  GI.next();

}
