/*
  * You should not need to touch this file if adding blog posts.
*/

import moment from 'moment';
import blogPostBank from './blog-post-bank';


const genBlogBank = {
  init() {
    this.caterpillarCase = this.caterpillarCase.bind(this);
    this.addPaths = this.addPaths.bind(this);
    this.formatDates = this.formatDates.bind(this);
    return this;
  },
  caterpillarCase(str) {
    return str.replace(/\s/g, '-').toLowerCase();
  },
  addPaths( postObj, i, arr ) {
    const file = this.caterpillarCase(postObj.title);
    return {
      ...postObj,
      path: `blog/${file}`,
    };
  },
  formatDates( postObj ) {
    return {
      ...postObj,
      date: moment(postObj.date.join('-'), 'YYYY-MM-DD').format('MMMM Do, YYYY'),
    }
  },
  toObj( accObj, currentObj, index, arr ) {
    return {
      ...accObj,
      [index]: currentObj,
    }
  },
  build(blogArray) {
    return blogArray
      .map( this.addPaths )
      .map( this.formatDates )
      .reduce( this.toObj, {} );
  }
}

export default genBlogBank
  .init()
  .build(blogPostBank);
