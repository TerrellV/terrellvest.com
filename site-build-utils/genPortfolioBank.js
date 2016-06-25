import moment from 'moment';

const genPortfolioBank = {
  addPaths( postObj ) {
    return {
      ...postObj,
      path: `/portfolio/${postObj.title.replace(/\s/g,'-').toLowerCase()}`
    };
  },
  formatDates( postObj ) {
    return {
      ...postObj,
      date: moment(postObj.date.join('-'), 'YYYY-MM-DD').format('MMMM Do, YYYY')
    }
  },
  toJson( accObj, currentObj, index, arr ) {
    accObj[index] = currentObj;
    // if at the end, stringify the obj
    if (index === arr.length - 1 ) {
      return JSON.stringify( accObj )
    }
    return accObj;
  },
  build( portfolioArr ) {

    const jsonObj = portfolioArr
      .map( this.addPaths )
      .map( this.formatDates )
      .reduce( this.toJson, {} );

    return jsonObj;
  }
}

module.exports = genPortfolioBank;
