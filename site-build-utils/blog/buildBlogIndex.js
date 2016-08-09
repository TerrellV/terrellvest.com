const fs = require('fs');
const jade = require('jade');
const marked = require('marked');

const buildBlogIndex = function buildBlogIndex() {
  return new Promise(handlePromise);
}

const handlePromise = function(res, rej) {
  /*
   * Handles the sequential operation of async functions
  */
  async function render(){
    const html = await readFile();
    await writeFile( html );
    res("Done building blog index")
  }

  /*
   * ASYNC FUNCTIONS
  */
  async function readFile(){
    const handlePromise = (res, rej) => {
      fs.readFile('_src/blog/index.jade', 'utf8', handleRead);
      function handleRead(err, content) {
        if (err) { throw err }
        const options = {
          pretty: true,
          filename:'_src/blog/index.jade'
        }
        const variables = { }
        var jadeFunction = jade.compile(content,options);
        res(jadeFunction());
      }
    }
    return new Promise(handlePromise);
  }
  async function writeFile(html){
    const handlePromise = (res, rej) => {
      fs.writeFile('_dist/blog/index.html', html, handleWrite);
      function handleWrite(err){
        if (err) throw err;
        res('done writing file');
      }
    }
    return new Promise(handlePromise);
  }

  render();

}

export default buildBlogIndex;
