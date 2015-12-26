const fs = require('fs');
const jade = require('jade');
const marked = require('marked');

module.exports = function generateProjectPosts(type, projTypeArr, projects) {
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
