import fs from 'fs';
import jade from 'jade';
import marked from 'marked';
import mkdirp from 'mkdirp';
import blogBank from './genBlogBank';


// error handler helper
process.on('unhandledRejection', function(err) {
  console.log(err.stack);
  process.exit(1);
});

const buildBlogPosts = async function() {
  const template = '_src/assets/markup/blog-post-template.jade';

  return new Promise(handlePromise);
  function handlePromise(res, rej) {
    function readBlogDir(dirName) {
      return fs.readdirSync('_src/blog/md-posts/');
    }
    function verify(blogBank, fileName, index) {
      const fileOnDisk = fileName
        .replace(/\.[^/.]+$/, '')
        .replace(/-/g, ' ')
        .toLowerCase();
      const inBank = Object.keys(blogBank)
        .map( key => blogBank[key].title.toLowerCase() );
      if (inBank.indexOf(fileOnDisk) < 0 ) {
        console.error('The files in the md directory do not match the files in the blog bank. Check spelling and punctuation.')
      }
      return fileOnDisk;
    }
    function getFileContent(blogBank, fileName, index ) {
      const postId = Object.keys(blogBank)
        .filter( key => blogBank[key].title.toLowerCase() === fileName)[0];

      const postObj = blogBank[postId];
      const file =  `${fileName.replace(/\s/g, '-' )}`;
      const filePath = `_src/blog/md-posts/${file}.md`;
      const html = marked( fs.readFileSync(filePath, 'utf8') );
      return { file, html };
    }
    function writeFile(template, fileObj, i) {
      const jadeContent = fs.readFileSync(template, 'utf8');
      const renderJade = jade.compile( jadeContent, {
        pretty: true,
        filename: template
      })
      const indexHTML = renderJade({pageMarkdownContent: fileObj.html});

      const dirPath = `_dist/blog/${fileObj.file}`;
      mkdirp.sync(dirPath);
      fs.writeFileSync(`${dirPath}/index.html`, indexHTML);
      return fileObj;
    }

    // ONLY FOR WRITING JSON TEMPLATE
    function writeJSON(path, filename, fileObj){
      const content = JSON.stringify(fileObj, null, 2);
      mkdirp.sync(path);
      fs.writeFile(`${path}/${filename}`, content);
    }

    // BUILD SEQUENCE FOR BUILDING POSTS OF A CERTAIN TYPE

    // BUILD SEQUENCE
    function build() {
      readBlogDir()
        .map( verify.bind(null, blogBank) )
        .map( getFileContent.bind(null, blogBank) )
        .map( writeFile.bind(null, template) );
    }


    writeJSON('_dist/assets/json', 'blog.json', blogBank);

    build();
    res('Done building blog posts')
  }
}

export default buildBlogPosts;
