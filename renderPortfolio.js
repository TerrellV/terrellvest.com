const projects = require('./generateProjectBank.js');
const fs = require('fs');
const jade = require('jade');
const marked = require('marked');

// This must always be first or else the array's will not be formated correctly
// check projects.build to see what is being called
projects.build(projects.startData);


function generateProjectPosts(type, projTypeArr) {
  fs.readdir(`_src/portfolio/projects-md/${type}`, function(err,contents){
    if(err) throw err;
    // map through md files
    contents.map( file => {
      var projPath = `_src/portfolio/projects-md/${type}`;
      var templatePath = '_src/assets/markup/proj-template.jade';
      var hyphFile = file.replace(/\.(.+)/g,''); // hyphenated file with no ext
      var projObj = projTypeArr.filter( obj => {
        return obj.title.replace(' ','-').toLowerCase() === hyphFile;
      })[0];
      // Fist Check if the files all have a corresponding projectBankObject
      var projTitleFileBank = projTypeArr.map(o=>o.title.replace(' ','-').toLowerCase());
      if (projTitleFileBank.indexOf(hyphFile) === -1 ) {
        throw new Error(`We couldn't match your files with the project start data. Check to make sure you have defined an object for each post you have in md-projects/${type}. Also check to see if the titles match. your md file should be lowercase and hyphenated and your title should be uppercase with spaces wher the hypens are in your file.`);
      }
      // read the md file and convert it to html
      fs.readFile(`${projPath}/${file}`, 'utf8', function(err,data){
        if (err) throw err;
        var mdPostHtml = marked(data);
        // read the jade template and generate the template function and variables to pass in
        fs.readFile(templatePath, 'utf8', function(err,data){
          var fn = jade.compile(data,{filename: templatePath});
          var jadeOutputHtml = fn(
            {
              postTitle: projObj.title,
              postDate: projObj.date,
              postContent: mdPostHtml,
            }
          )
          // make the necessary directories
          fs.mkdir(`_dist/portfolio/${hyphFile}`, function(err){
            // write output html (jade and md) to an index file
            fs.writeFile(`_dist/portfolio/${hyphFile}/index.html`, jadeOutputHtml, function(err){
              if (err) throw err;
              console.log(`Just created an index file for a ${type} project!`);
            });
          });
        });
      });
    });
  });
}

// this function will create two html strings based on the number of business and web projects
// we will use a jade template
  // in this jade template we have a loop that uses the project array we are about to pass in
  // this is how it displays the correct number of posts in the index file
// finally this string will be inserted via the browser depending on user interaction

function buildClientJs(destPath,fileName,templatePath){
  function buildStrings(bizArr,webArr,callback){
    fs.readFile(templatePath,'utf8', function(err,content){
      if(err)throw err;
      var fn = jade.compile(content,{fileName:templatePath});
      var bizString = fn({postArr:bizArr});
      var webString = fn({postArr:webArr});
      // as soon as these are done the callback is invoked
      callback(bizString,webString);
    });
  }
  function makeTemplateCallback(bString, wString){
    var writtenJs = require('./_src/assets/scripts/client.js');

    var templateJs =
    `\n(function(){
    \n  var busHtml = '${bString}';
    \n  var webHtml = '${wString}';
    \n  ${writtenJs};
    \n  if(typeof document !== undefined) {
    \n    app();
    \n    console.log('we in the Browser');
    \n  }

    \n})()`;

    fs.writeFile(`${destPath}/${fileName}`, templateJs, function(err){
      if (err) throw err;
      console.log(`${fileName} was just created with template strings as variables`);
    })
  }
  buildStrings(projects.business(),projects.web(), makeTemplateCallback);
}


// will compile the blog posts into their own folders with index files
generateProjectPosts('business', projects.business());
generateProjectPosts('web', projects.web());


// lets generate the browser app.js file with the compiled html string as passed in variable
buildClientJs(`_dist/assets/scripts`,`app.js`,`_src/assets/markup/projects-in-category.jade`);
