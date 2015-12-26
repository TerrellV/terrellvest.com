const fs = require('fs');
const jade = require('jade');
const marked = require('marked');
const posts = require('./generatePostBank.js');
const projects = require('./generateProjectBank.js');
const buildClientJs = require('./buildClientScripts.js');
const buildBlogPosts = require('./renderBlog.js');
const buildPortfolioPosts = require('./renderPortfolio.js');

// These must always be first or else the array's will not be formated correctly
posts.build(posts.startData);
projects.build(projects.startData);

// Compile the portfolio posts into their own folders giving each its own index file
buildPortfolioPosts('business', projects.business());
buildPortfolioPosts('web', projects.web());

// Compile the blog index page that displays all the posts on the site
// Build a folder and index.html file for each blog post written as an md file
buildBlogPosts();

// lets generate the browser app.js file with the compiled html string as passed in variables
// The two html strings passed into the client.js file will display all of the posts in their category
buildClientJs(`_dist/assets/scripts`,`app.js`,`_src/assets/markup/projects-in-category.jade`);
