pipeline {
    agent any
    
    stages() {
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('read') {
           steps {
               script {
                   def data = readFile(file: 'Dockerfile')
                   println(data)
               }
           }
       }
        stage('Build') { 
            steps { 
                script{
                 app = docker.build("node-img","-f Dockerfile .")
                }
            }
        }
        
    }
    
}