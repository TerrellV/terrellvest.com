import portfolioPostBank from './portfolio-post-bank.js';
import blogPostBank from './blog-post-bank.js';
import genBlogBank from './genBlogBank.js';
import genPortfolioBank from './genPortfolioBank.js';
import buildAbout from './buildAbout.js';
import buildPortfolioIndex from './buildPortfolioIndex.js';
import buildPortfolioPosts from './buildPortfolioPosts.js';
// import buildBlog from './renderBlog.js';
const portTemplate = '_src/assets/markup/portfolio-template.jade';

const buildSite = function buildSite() {

  const portfolioJSON = genPortfolioBank.build(portfolioPostBank);
  const b_AboutIndex = new Promise(buildAbout);
  const b_PorfolioIndex = new Promise(buildPortfolioIndex); // no markdown
  const b_PortfolioPosts = new Promise(
    buildPortfolioPosts.bind(null, portfolioJSON, portTemplate)
  );

  const b_allPortfolio = Promise.all([b_PorfolioIndex, b_PortfolioPosts]);

  return Promise.all([b_allPortfolio, b_AboutIndex])
}

export default buildSite;
