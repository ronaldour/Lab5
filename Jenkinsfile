pipeline {
  agent any

  stages{
    stage('Test'){
      steps {
        sh "echo Testing..."
        sh "pwd"
        sh "ls"
      }
  }
  post {
    failure{
      echo "fail"
    }
    success{
      echo "Success"
    }
  }
}
