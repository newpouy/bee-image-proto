var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();

const jenkinsUrl = 'http://localhost:7979/job/2th-pipe/buildWithParameters';
// notice the URL has build not buildWithParameters if the job has file parameters. ^
const userName = 'newpouy';
const token = '111edb4d3c77b2879eabd380e65281c8f1'

// const params = {"parameter": [
//   // file0 here is the field name we are appending to data object, 
//   // this informs jenkins while file maps to which job parameter, so even multiple file uploads can be done using this approach!
//   {"name":"<Name Of file parameter in Job>", "file":"file0"}
//   // incase you have additional string parameters you need to pass add it here. 
//   {"name": "StringParam1", "value": "value"}
// ]}

data.append('file0', fs.createReadStream('/Users/kimnoel/devStudy/jenkins/bee-image-proto/Dockerfile.dev'));
{/* data.append('json', JSON.stringify(params)); */}

var config = {
  method: 'post',
  url: jenkinsUrl,
  auth: {
    username: userName,
    password: token
  },
  headers: { 
    
  },
  data : data,
  withCredentials: true,
};

axios(config)
.then(function (response) {
  console.log(response.status);
  if(response.status == 201) {
    console.log("success")
  } else {
    console.log("fail")
  }
})
.catch(function (error) {
  console.log(error);
});