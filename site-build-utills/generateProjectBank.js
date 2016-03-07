/*
  * define all projects here...
  * Only Touch the startData Array and the Objects inside. No need to edit other methods if you are just adding a project
*/

var fs = require('fs');
var jsdom = require('jsdom');
var portfolioPostBank = require('./portfolio-post-bank');

const projectBank = {
  startData: portfolioPostBank,
  getMonth: function( n, title ){
    if (n > 12 || n < 1 ) {
      console.error(
        "-------- Check The Date You Provided In the Project Bank for" + title
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
  addPaths: function (projectBank){
    projectBank.map( obj => {
      obj.path = '/portfolio/' + obj.title.replace(/\s/g,'-').toLowerCase();
    });
    return projectBank;
  },
  formatDates: function (projectBank){
    projectBank.map( (obj,i,arr) => {
      var year = obj.date[0];
      var month = this.getMonth(obj.date[1], obj.title);
      var day = obj.date[2];
      obj.date = `${month} ${day}, ${year}`;
    });
  },
  business: function(arr){
    return this.startData.filter( obj => obj.type === 'business');
  },
  web: function(arr){
    return this.startData.filter( obj => obj.type === 'web');
  },
  showAll: function(){
    console.log(this.startData);
  },
  build: function( arr ){
    // these functions mutate the array
    this.addPaths( arr );
    this.formatDates( arr );
    return arr;
  }
}

module.exports = projectBank;
