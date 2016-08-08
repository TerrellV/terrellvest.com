import buildAbout from './buildAbout.js';
import buildPortfolioIndex from './buildPortfolioIndex.js';
import buildPortfolioPosts from './buildPortfolioPosts.js';
import buildBlogIndex from './buildBlogIndex.js';
import buildBlogPosts from './buildBlogPosts';


const buildSite = function buildSite() {
  // about
  const b_AboutIndex = new Promise(buildAbout);


  // all build related tasks
  return Promise.all([
    b_AboutIndex,
    buildBlogIndex(),
    buildBlogPosts(),
    buildPortfolioIndex(),
    buildPortfolioPosts(),
  ]);
}

buildSite();

export default buildSite;
