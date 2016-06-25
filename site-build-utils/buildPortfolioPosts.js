import fs from 'fs';
import jade from 'jade';
import marked from 'marked';
import mkdirp from 'mkdirp';

process.on('unhandledRejection', function(err){
    console.log(err.stack);
    process.exit(1);
});

const buildPortfolioPosts = async function (bankString, template, res, rej) {

  const projectBank = JSON.parse(bankString);

  function readPortfolioDir(dirName){
    return fs.readdirSync(`_src/portfolio/projects-md/${dirName}`)
  }
  function verify(projectBank, fileName, index) {
    const fileOnDisk = fileName
      .replace(/\.[^/.]+$/, '')
      .replace(/-/g, ' ')
      .toLowerCase();
    const inBank = Object.keys(projectBank)
      .map( key => projectBank[key].title.toLowerCase() );
    if (inBank.indexOf(fileOnDisk) < 0 ) {
      console.error('The files in the md directory do not match the files in the post bank. Check spelling and punctuation.')
    }
    return fileOnDisk;
  }
  function getFileContent(projectBank, fileName, index ) {
    const postId = Object.keys(projectBank)
      .filter( key => projectBank[key].title.toLowerCase() === fileName)[0];

    const postObj = projectBank[postId];
    const file =  `${fileName.replace(/\s/g, '-' )}`;
    const filePath = `_src/portfolio/projects-md/${postObj.type}/${file}.md`;
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

    const dirPath = `_dist/portfolio/${fileObj.file}/`;
    mkdirp.sync(dirPath);
    fs.writeFileSync(`${dirPath}index.html`, indexHTML);
    return fileObj;
  }
  // ONLY FOR WRITING JSON TEMPLATE
  function writeJSON(path, filename, fileObj){
    const content = JSON.stringify(fileObj, null, 2);
    mkdirp.sync(path);
    fs.writeFile(`${path}/${filename}`, content);
  }

  // BUILD SEQUENCE FOR BUILDING POSTS OF A CERTAIN TYPE
  function build(dirName) {
    readPortfolioDir( dirName )
      .map( verify.bind(null, projectBank) )
      .map( getFileContent.bind(null, projectBank) )
      .map( writeFile.bind(null, template) );
  }

  writeJSON('_dist/assets/json', 'portfolio.json', projectBank);
  build('business');
  build('web');
  res('DONE_BUILDING_PORTFOLIO_POSTS')
}

export default buildPortfolioPosts;
