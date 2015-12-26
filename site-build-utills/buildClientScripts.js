const fs = require('fs');
const jade = require('jade');
const marked = require('marked');

/*
  This function will create two html strings based on the number of business and web projects the md folders
  * A jade template is used
  * Then a loop in the template uses an array of the projects to populate each project into a page displaying all the posts
  * The created js file will be used for client side javascript functionality
*/

module.exports = function buildClientJs(destPath,fileName,templatePath,projects){
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
    var writtenJs = require('../_src/assets/scripts/client.js');

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
