var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
require("dotenv").config();
var data = new FormData();

const jenkinsUrl = 'http://localhost:7980/job/pipe1/buildWithParameters?teststring=testhj';
console.log(process.env)
const userName = process.env.JENKINS_USERNAME;
const token = process.env.JENKINS_TOKEN

data.append('file0', fs.createReadStream('/Users/kimnoel/devStudy/jenkins/bee-image-proto/Dockerfile'));
// data.append('file1', fs.createReadStream('/Users/kimnoel/devStudy/jenkins/bee-image-proto/Dockerfile.dev'));

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