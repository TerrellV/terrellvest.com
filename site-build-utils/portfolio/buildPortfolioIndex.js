const fs = require('fs');
const jade = require('jade');
const marked = require('marked');

const buildPortfolioIndex = function() {
  return new Promise((res, rej) => {
    /*
     * Handles the sequential operation of async functions
    */
    async function render(){
      const html = await readFile();
      await writeFile( html );
      res("Done Writing Portoflio Index")
    }

    /*
     * ASYNC FUNCTIONS
    */
    async function readFile(){
      return new Promise( (res, next) => {
        fs.readFile('_src/portfolio/index.jade', 'utf8', handleRead);
        function handleRead(err, content) {
          if (err) { throw err }
          const options = {
            pretty: true,
            filename:'_src/portfolio/index.jade'
          }
          const variables = { }
          var jadeFunction = jade.compile(content,options);
          res(jadeFunction());
        }
      })
    }
    async function writeFile(html){
      return new Promise( (res, next) => {
        fs.writeFile('_dist/portfolio/index.html', html, handleWrite);
        function handleWrite(err){
          if (err) throw err;
          res('done writing file');
        }
      })
    }

    render();
  })
}

export default buildPortfolioIndex;
