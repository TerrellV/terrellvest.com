import configureBlogBank from './configureBlogBank';
import genBlogCategories from './genBlogCategories';

const blogPosts = [
  {
    title: 'Figuring it Out',
    categories: ['personal', 'something longer'],
    date: [2016,2,25],
    dcr: 'Upon graduating high school I began chasing an idea. I needed to know how I was going to spend the rest of my life. I needed to \"figure it out\".'
  },
  {
    title: '2015 Goals',
    categories: ['personal'],
    date: [2016,1,1],
    dcr: 'A reflection on the goals I set out to accomplish and the lessons learned along the way.'
  }
];
export const blogCategories = genBlogCategories(blogPosts);
export default configureBlogBank
  .build(blogPosts);
