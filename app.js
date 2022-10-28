var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();

const jenkinsUrl = 'http://localhost:7979/job/pipe1/buildWithParameters';
// notice the URL has build not buildWithParameters if the job has file parameters. ^
const userName = 'newpouy';
const token = '116ab563b6f32be3777fb194a9b802f98f'

// const params = {"parameter": [
//   // file0 here is the field name we are appending to data object, 
//   // this informs jenkins while file maps to which job parameter, so even multiple file uploads can be done using this approach!
//   {"name":"<Name Of file parameter in Job>", "file":"file0"}
//   // incase you have additional string parameters you need to pass add it here. 
//   {"name": "StringParam1", "value": "value"}
// ]}

data.append('file0', fs.createReadStream('/Users/kimnoel/devStudy/jenkins/bee-image-proto/Dockerfile'));
// data.append('file1', fs.createReadStream('/Users/kimnoel/devStudy/jenkins/bee-image-proto/Dockerfile.dev'));
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
  // 빌드 실패에도 201을 리턴함....
  console.log(response.headers);
  if(response.status == 201) {
    console.log("success")
    const queue_url = `${response.headers.location}api/json`

    var configQueue = {
      method: 'get',
      url: queue_url,
      auth: {
        username: userName,
        password: token
      },
      headers: { 
        
      },
      withCredentials: true,
    };
    (function myLoopI(i) {
      setTimeout(function() {
        axios(configQueue).then(res => {
          console.log('');console.log('');console.log('');
          console.log('=========  '+ i + ' =========')
          console.log(res.data.executable, ' in que')
          console.log('=======iiiiiii=======')
          if(res.data.executable) {
            const job_url = `${res.data.executable.url}api/json`
            var configJob = {
              method: 'get',
              url: job_url,
              auth: {
                username: userName,
                password: token
              },
              headers: { 
                
              },
              withCredentials: true,
            };
            (function myLoopJ(j) {
              setTimeout(function() {
                axios(configJob).then(res => {
                  console.log('=========  '+ j + ' =========')
                  console.log(res.data.result)
                  console.log('=======jjjjjjj=======')
                  if(res.data.result == 'SUCCESS') {
                    console.log(res.data.result + '!!!!!!!!!!!!!!!!!!!!!!!!')
                  }
                })
                if (--j) myLoopJ(j);   //  decrement i and call myLoop again if i > 0
              }, 300)
            })(2)
          }
        })                
        if (--i) myLoopI(i);   //  decrement i and call myLoop again if i > 0
      }, 3000)
    })(5); 

    // let i = 0;
    // while(true) {
    //   console.log(i)
    //   i++;
    //   if(i > 10000) break;
    //   setTimeout(() => {
        
    //   }, 1000)
    // }

  } else {
    console.log("fail")
  }
})
.catch(function (error) {
  console.log(error);
});