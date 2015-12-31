const fs = require('fs');
const jade = require('jade');
const marked = require('marked');

module.exports = function(postBank,res,rej){
  const taskPromises = [];

  // file paths
  const fp = {
    blogIndexTemplate: './_src/blog/index.jade',
    mdPosts: '_src/blog/md-posts',
    postTemplate: '_src/assets/markup/post-template.jade'
  }

  /* 1. Write the blog index page and pass in postbank array */
  taskPromises.push(new Promise(creatBlogIndex));

    function creatBlogIndex(res,rej){
      fs.readFile(fp.blogIndexTemplate, 'utf8', function(err,content){
        if (err) {throw err;}
        else {
          var fn = jade.compile(content,{filename:fp.blogIndexTemplate});
          var html = fn({postArr:postBank.all()});
          fs.writeFile('./_dist/blog/index.html',html, function(err){
            if (err) {throw err;};
            // console.log('Blog Index Created Based on Number of Objects in Post Bank');
            res();
          });
        }
      });
    }

  /* 2. Write blog posts based on what md files exist */
  taskPromises.push(new Promise(compileAllBlogPosts));

  function compileAllBlogPosts(res,rej){
    fs.readdir(fp.mdPosts,function(err,files){
      const filePromises = [];
      // add check to ensure this is a valid post bank for each md file before continuing...
      // throw error if match not found
      if (err) throw err;
      var filtered = files.filter( f => /\.md$/g.test( f ) );

      filtered.map( file => {
        filePromises.push(new Promise(readCompileCreate));
        function readCompileCreate(res,rej){
          // read the markdown file and get its content string
          fs.readFile(`${fp.mdPosts}/${file}`,'utf8', function(err,content){
            // convert the md content string to html
            var postHtml = marked(content);
            // read the jade template file and get jade string
            fs.readFile(fp.postTemplate, 'utf8', function(err,content){
              // create function with compiled jade string
              var fn = jade.compile(content, {filename:fp.postTemplate});
              // grab the file object from post bank
              var fileToMatch = file.replace(/\.(.+)/g,'').toLowerCase();
              var postObj = postBank.all().filter( obj => {
                var titleToMatch = obj.title.replace(/\s/g,'-').toLowerCase();
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
              // create / write the file to the correct folder
              fs.mkdir(`_dist/blog/${dashCaseFile}`, function(mode){
                fs.writeFile(`_dist/blog/${dashCaseFile}/index.html`, pageHtml, function(err){
                  // console.log('jade file compiled and outputed to Blog/' + dashCaseFile);
                  res();
                })
              })
            })
          })
        }
      })
      Promise.all(filePromises).then(res);
    });
  }
  Promise.all(taskPromises).then(res.bind(res('*** Blog Done')));
}
