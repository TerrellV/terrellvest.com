/*
  * Define all blog posts here.
  * Only touch the startData Array and the Objects inside. No need to edit other methods, especially if you are just adding a project.
*/
const postBank = {
  startData: [
    {
      title: "Post One",
      readTime: 2.5, // in min
      date: [2013,6,28] // yr-mm-dd
    },
    {
      title: "2015 A Year In Review",
      readTime: 5, // in min
      date: [2016,1,1] // yr-mm-dd
    }
  ],
  addPaths: function (postBankArr){
    postBankArr.map( obj => {
      obj.path = '/blog/' + obj.title.replace(/\s/g,'-').toLowerCase();
    });
    return postBankArr;
  },
  formatDates: function (postBankArr){
    postBankArr.map( obj => {
      var year = obj.date[0];
      var month = this.getMonth(obj.date[1],obj.title);
      var day = obj.date[2];
      obj.date = `${month} ${day}, ${year}`;
    });
  },
  getMonth: function( n, title ){
    if (n > 12 || n < 1 ) {
      console.error(
        "-------- Check The Date You Provided In the Project Bank for: " + title
      );
    }
    var months = [
      {n:1, month: "January"},
      {n:2, month: "February"},
      {n:3, month: "March"},
      {n:4, month: "April"},
      {n:5, month: "May"},
      {n:6, month: "June"},
      {n:7, month: "July"},
      {n:8, month: "August"},
      {n:9, month: "September"},
      {n:10, month: "October"},
      {n:11, month: "November"},
      {n:12, month: "December"}
    ];
    return months.filter(o => o.n === n)[0].month;
  },
  all: function(){
    return(this.startData)
  },
  build: function( arr ){
    this.addPaths( arr );
    this.formatDates( arr );
    return arr;
  }
}

module.exports = postBank;
