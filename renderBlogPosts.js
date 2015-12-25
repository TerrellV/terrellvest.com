// require('babel-register');
// require("babel-polyfill");

const fs = require('fs');
const jade = require('jade');
const marked = require('marked');
const postBank = require('./_src/blog/post-bank.js');
const addFileNames = require('./generateFilenames.js');

// add filenames to partialPostBank
// now postBank should have filenames
addFileNames(postBank);

// file paths
const fp = {
  blogIndex: './_src/blog/index.jade',
  mdPosts: '_src/blog/md-posts',
  postTemplate: '_src/assets/markup/post-template.jade'
}

// write the blog index page and pass in postbank array
fs.readFile(fp.blogIndex, 'utf8', function(err,content){
  if (err) {throw err;}
  else {
    var fn = jade.compile(content,{filename:fp.blogIndex});
    var html = fn({postArr:postBank});
    fs.writeFile('./_dist/blog/index.html',html, function(err){
      if (err) {throw err;};
      console.log('Blog Index Created Based on Number of Objects in Post Bank');
    })
  }
})

// check blog folder to make sure its empty to avoid duplicate blog posts
fs.readdir('_dist/blog', function(err,files){
  if (err) {throw err};
  if (files.length > 1) {
    throw new Error('You Need to Delete any files or folders in the _dist/blog direcotry EXCEPT the index.html file before we compile the current blog post info. This error is to prevent extra blog posts being created when file names change etc.');
  }
})

// writing blog posts based on what md files exist
fs.readdir(fp.mdPosts,function(err,files){
  // add check to ensure this is a valid post bank for each md file before continuing...
  // throw error if match not found
  if (err) throw err;
  var filtered = files.filter( f => /\.md$/g.test( f ) );

  filtered.map( file => {

    // read the markdown file and get its content string
    fs.readFile(`${fp.mdPosts}/${file}`,'utf8', function(err,content){

      // convert the md content string to html
      var postHtml = marked(content);
      // read the jade template file and get jade string
      fs.readFile(fp.postTemplate, 'utf8', function(err,content){

        // create function with compiled jade string
        var fn = jade.compile(content, {filename:fp.postTemplate});

        // grab the file object from post bank
        var fileToMatch = file.replace(/\.(.+)/g, '').toLowerCase();
        var postObj = postBank.filter( obj => {
          titleToMatch = obj.title.replace(' ','-').toLowerCase();
          return ( titleToMatch === fileToMatch) ? true : false;
        })[0];

        // call the function and pass in necessary variables
        // this produces our compiled html with variables
        var pageHtml = fn({
          postTitle: postObj.title,
          postContent: postHtml,
          postReadTime: postObj.readTime,
          postDate: postObj.date
         });
        var dashCaseFile = postObj.title.replace(" ", '-').toLowerCase();
        console.log(dashCaseFile);
        // create / write the file to the correct folder
        fs.mkdir(`_dist/blog/${dashCaseFile}`, function(mode){
          fs.writeFile(`_dist/blog/${dashCaseFile}/index.html`, pageHtml, function(err){
            console.log('jade file compiled and outputed to Blog/' + dashCaseFile);
          })
        })
      })
    })
  })
});



// add filenames to the postBank object
// postBank.map(function(a){
//   a.fileName = a.title.replace(' ','') + '.md';
// })

// compile the list of posts for now
// compile with the variable postArr
// fs.readFile(fp.blogIndex,'utf8', function(err,data){
//   var postArr = postBank.map(function(a,i,arr){
//     return a.title;
//   });
//   var fn = jade.compile(data, {filename: fp.blogIndex});
//   console.log(postBank);
//   var html = fn({postArr: postBank});
//   fs.writeFile('_dist/blog/index.html',html,function(err){
//     console.log('BattaBoom a list of posts should be displayed');
//     if (err) {
//       console.log(err);
//     }
//   })
// });
