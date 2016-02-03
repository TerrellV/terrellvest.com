var fs = require("fs");
var dropBoxPath = '../../../Dropbox/';

fs.readdir(dropBoxPath +'site-drafts',function(err,array){

  // write all the files in the dropbox folder to the local drafts folder
  array.map(function(file,i){
    return new Promise(readAndWriteFile);

    function readAndWriteFile(res,rej){
      console.log('File #:'+ i +' ',file)
      fs.readFile(`${dropBoxPath}site-drafts/${file}`,utf8,function(){
        
      })
    }
  })

})
