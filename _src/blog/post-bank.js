// define all blog posts here...
// render these server side in production and server as html
const PostBank = [
  {
    title: "Post One",
    readTime: 2.5, // in min
    path: '/blog/post-one/',
    date: [2013,6,28] // yr-mm-dd
  },
  {
    title: "Post Two",
    readTime: 6, // in min
    path: '/blog/post-two/',
    date: [2014,3,2] // yr-mm-dd
  },
  {
    title: "Post Three",
    readTime: 4, // in min
    path: '/blog/post-three/',
    date: [2015,22,15] // yr-mm-dd
  }
];

module.exports = PostBank;
