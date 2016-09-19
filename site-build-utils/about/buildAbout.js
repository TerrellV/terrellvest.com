const fs = require('fs');
const jade = require('jade');
const marked = require('marked');

const buildAbout = function() {
  return new Promise(handlePromise);

  function handlePromise(res, rej) {

    // BEGINNING OF EXECUTION
    readMd(readJade.bind(null));

    /*
     * HELPER FUNCTIONS
    */

    // convert about me markdown text to html
    function readMd(writeMdCB) {
      fs.readFile('_src/_about/about-text.md', 'utf8', function(err, content) {
        if(err) { console.error(err) }
        readJade( marked(content) );
      })
    }
    // convert root index.jade to html
    function readJade( pageHtml ) {
      fs.readFile('_src/index.jade','utf8',function(err, content){
        var jadeFunction = jade.compile(content, {
          filename:'_src/index.jade',
          pretty: true
        });

        writeHtml( jadeFunction({ pageMarkdownContent: pageHtml }) );
      })
    }
    // write complete index.html page to folder
    function writeHtml(finalHtml){
      fs.writeFile('_dist/index.html', finalHtml, function(err) {
        if (err) throw err;
        res('Done building about page');
      })
    }
  }
}

export default buildAbout;
