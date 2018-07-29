
var express = require('express');
var url = require('url');
var fs = require('fs');
var bodyParser = require('body-parser');
var studentRegister = express();


studentRegister.use(bodyParser.json()); // support json encoded bodies

//write file....
function writeFile(student){
  fs.writeFile('student.json',"["+ student +"]", function (err) {
  if (err) throw err;
  console.log('Saved!');
})
};
//read from file....
studentRegister.get('/read',function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  fs.readFile('student.json',function(err,data){
    res.write(JSON.stringify(JSON.parse(data)));
    res.end();
    if (err) throw err;
  });
      console.log('Inside');

});
studentRegister.post('/write',function(req,res){
      console.log('body is ',req.body);
    fs.readFile('student.json',function(err,data){
      var studentDetails = data.toString().split("\n");
      if(studentDetails.length === 1 && studentDetails[0] === ""){
        studentDetails =  JSON.stringify(req.body) ;
      }else{
       studentDetails[0] = studentDetails[0].replace("["," ");
       studentDetails[0] = studentDetails[0].replace("]"," ");
      studentDetails.push(JSON.stringify(req.body));
      }
      writeFile(studentDetails);
    });


});
studentRegister.listen(8080);
