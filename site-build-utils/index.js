import buildAbout from './about/buildAbout.js';
import buildPortfolioIndex from './portfolio/buildPortfolioIndex.js';
import buildPortfolioPosts from './portfolio/buildPortfolioPosts.js';
import buildBlogIndex from './blog/buildBlogIndex.js';
import buildBlogPosts from './blog/buildBlogPosts';


const buildSite = function buildSite() {

  // all build related tasks
  return Promise.all([
    buildAbout(),
    buildBlogIndex(),
    buildBlogPosts(),
    buildPortfolioIndex(),
    buildPortfolioPosts(),
  ]).then( responseArr => {
    console.log('\n####  Done building "Portfolio", "Blog", and "About" sections  ####\n');
  });
}

export default buildSite;
