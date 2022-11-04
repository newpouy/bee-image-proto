var validateDockerfile = require('validate-dockerfile');
var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'Dockerfile');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        console.log('received data: ' + data);

        // validation dockerfile
        var isValid = validateDockerfile(data);
        console.log(isValid)
        if(isValid) {

          // upload to jenkins and execute docker builds
          var exec = require('child_process').exec;
          var args = "http://localhost:7980/job/pipe1/buildWithParameters?token=test \
          --user newpouy:1173f3bc6c19ef4b1ca6cb4fb4719bc38e \
          --form file=@/Users/kimnoel/devStudy/jenkins/bee-image-proto/Dockerfile";
  
          exec('curl ' + args, function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
              console.log('exec error: ' + error);
            }
          });
        } else {
          console.log('dockerfile invalid!!!!!')
        }
    } else {
        console.log(err);
    }
});


