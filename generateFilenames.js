module.exports = function(postArray){
  if(Object.prototype.toString(postArray)) {
    return postArray.map( obj => {
      obj.fileName = `${obj.date.join('-')}-${obj.title.replace(' ', '-')}`;
      return obj;
    });
  } else {
    console.error("we did not get an array:", postArray);
  }
}
