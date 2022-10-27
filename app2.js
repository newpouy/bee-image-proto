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
          var args = "http://localhost:7979/job/2th-pipe/buildWithParameters \
          --user newpouy:111edb4d3c77b2879eabd380e65281c8f1 \
          --form FILE_LOCATION_AS_SET_IN_JENKINS=@/Users/kimnoel/devStudy/jenkins/bee-image-proto/Dockerfile";
  
          exec('curl -X POST ' + args, function (error, stdout, stderr) {
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

