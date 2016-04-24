const fs = require('fs');
const jade = require('jade');
const marked = require('marked');
const callerID = require('caller-id');

// this function is being called once for every category of portfolio posts, check the type
// to see which category is being rendered
module.exports = function generateProjectPosts(type, projTypeArr, projectObj, res, rej) {
  
  // this is called after last internal task is complete
  function completeCallBack(){
    res(`*** Done with ${type} projects`);
  }

  /* Do this first*/
  fs.readdir(`_src/portfolio/projects-md/${type}`, function(callback,err,contents){
    if(err) throw err;

    var filePromises = [];

    // map through md files
    contents.map( file => {
      var projPath = `_src/portfolio/projects-md/${type}`;
      var templatePath = '_src/assets/markup/portfolio-template.jade';
      var hyphFile = file.replace(/\.(.+)/g,''); // hyphenated file with no ext
      var projObj = projTypeArr.filter( obj => {
        return obj.title.replace(/\s/g,'-').toLowerCase() === hyphFile;
      })[0];

      // Fist Check if the files all have a corresponding projectBankObject
      var projTitleFileBank = projTypeArr.map(o=>o.title.replace(/\s/g,'-').toLowerCase());
      if (projTitleFileBank.indexOf(hyphFile) === -1 ) {
        throw new Error(`We couldn't match your files with the project start data. Check to make sure you have defined an object for each post you have in md-projects/${type}. Also check to see if the titles match. your md file should be lowercase and hyphenated and your title should be uppercase with spaces wher the hypens are in your file.`);
      }

      // push promise for reading and creating file into master filePromises array
      filePromises.push(new Promise(readCompileCreate));
      function readCompileCreate(res,rej){
        // read the md file and convert it to html
        fs.readFile(`${projPath}/${file}`, 'utf8', function(err,data){
          if (err) throw err;
          var mdPostHtml = marked(data);
          // read the jade template and generate the template function and variables to pass in
          fs.readFile(templatePath, 'utf8', function(err,data){
            var fn = jade.compile(data,{
              pretty: true,
              filename: templatePath
            });
            var jadeOutputHtml = fn(
              {
                postTitle: projObj.title,
                postDate: projObj.date,
                postContent: mdPostHtml,
                type: type,
                links: projObj.links || undefined
              }
            )

            // make the necessary directories
            fs.mkdir(`_dist/portfolio/${hyphFile}`, function(err){
              // write output html (jade and md) to an index file
              fs.writeFile(`_dist/portfolio/${hyphFile}/index.html`, jadeOutputHtml, function(err){
                if (err) throw err;
                // console.log(`Just created an index file for a ${type} project!`);
                res();
              });
            });
          });
        });
      }
    });

    // when all the promises in the filePromises array are done
    // - move on to the next task
    Promise.all(filePromises).then(callback);

  }.bind(null,task2));

  /* 2. Second Task: compile a category list of html into a partial file
     this needs to happen after all md portfolio posts have been read and compiled so that the descriptions will be based on the most recently compiled versions
  */

  function task2(){
    var projectList = new Promise(createPortfolioLists);
    function createPortfolioLists(res,rej){
      fs.readFile('_src/assets/markup/projects-in-category.jade','utf8', function(err,content){
        if(err)throw err;
        var fn = jade.compile(content,{
          pretty: true,
          fileName:'_src/assets/markup/projects-in-category.jade'
        });

        writeFile(projTypeArr);

        function writeFile(arrayToPassJade){
          var fileName = `_dist/assets/html/${type}-list.html`;
          var transpiledHTML = fn( {postArr:arrayToPassJade} )

          fs.writeFile(fileName, transpiledHTML ,function(err){
            if (err) throw err;
            res("*Done with a list")
          })
        }
      });
    }

    projectList.then(completeCallBack)
  }

}
