var fs = require('fs');

var html = '<h1>Template String</h1>';

var jsTemplate = `
  // this was created from another js files
  var html = '${html}';
`

fs.writeFile('testDone.js',jsTemplate,function(err){
  console.log('should have been written, cross our fingers..Dun Dun Dun');
})
