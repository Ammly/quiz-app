pipeline {
  agent any
 
  tools {nodejs "node"}
  
  stages {
    stage('Build') {
      steps {
        sh 'ln -s /usr/bin/nodejs /usr/bin/node'
        sh 'npm install'
      }
    }

  }
}
