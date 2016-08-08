import fs from 'fs';
import jade from 'jade';
import marked from 'marked';
import mkdirp from 'mkdirp';
import portfolioBank from './genPortfolioBank.js';

function promiseHandler(res, rej) {
  const portTemplate = '_src/assets/markup/portfolio-template.jade';

  function readPortfolioDir(dirName) {
    return fs.readdirSync(`_src/portfolio/projects-md/${dirName}`);
  }
  function verify(portfolioBank, fileName, index) {
    const fileOnDisk = fileName
      .replace(/\.[^/.]+$/, '')
      .replace(/-/g, ' ')
      .toLowerCase();
    const inBank = Object.keys(portfolioBank)
      .map( key => portfolioBank[key].title.toLowerCase() );
    if (inBank.indexOf(fileOnDisk) < 0 ) {
      console.error('The files in the md directory do not match the files in the post bank. Check spelling and punctuation.')
    }
    return fileOnDisk;
  }
  function getFileContent(portfolioBank, fileName, index ) {
    const postId = Object.keys(portfolioBank)
      .filter(key =>
        portfolioBank[key].title.toLowerCase() === fileName
      )[0];

    const postObj = portfolioBank[postId];
    const file =  `${fileName.replace(/\s/g, '-' )}`;
    const filePath = `_src/portfolio/projects-md/${postObj.type}/${file}.md`;
    const html = marked( fs.readFileSync(filePath, 'utf8') );
    return { file, html };
  }
  function writeFile(fileObj, i) {
    const jadeContent = fs.readFileSync(portTemplate, 'utf8');
    const renderJade = jade.compile(jadeContent, {
      pretty: true,
      filename: portTemplate,
    })
    const indexHTML = renderJade({pageMarkdownContent: fileObj.html});
    const dirPath = `_dist/portfolio/${fileObj.file}/`;
    mkdirp.sync(dirPath);
    fs.writeFileSync(`${dirPath}index.html`, indexHTML);
    return { file: fileObj.file, done: true };
  }

  // ONLY FOR WRITING JSON TEMPLATE
  function writeJSON(path, filename, fileObj){
    const content = JSON.stringify(fileObj, null, 2);
    mkdirp.sync(path);
    fs.writeFile(`${path}/${filename}`, content);
  }

  // BUILD SEQUENCE FOR BUILDING POSTS OF A CERTAIN TYPE

  // BUILD SEQUENCE
  function build(dirName) {
    readPortfolioDir(dirName)
      .map(verify.bind(null, portfolioBank))
      .map(getFileContent.bind(null, portfolioBank))
      .map(writeFile);
  }


  writeJSON('_dist/assets/json', 'portfolio.json', portfolioBank);

  build('business');
  build('web');
  res('Done building portfolio posts');
}


const buildPortfolioPosts = async function() {
  return new Promise(promiseHandler)
}
export default buildPortfolioPosts;


// error handling
process.on('unhandledRejection', function(err) {
  console.log(err.stack);
  process.exit(1);
});
