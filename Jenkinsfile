pipeline {
    agent any

    stages {
        stage('env loading') {
            steps {
                echo '****************************** env loading ******************************'
                sh 'yarn install'
                sh 'rm -rf ./build/*'
                sh 'yarn run build'
            }
        }

        stage('move file') {
            steps {
                echo '****************************** move file ******************************'
                sh 'rm -rf /www/wwwroot/ks-form-front/*'
                sh 'pwd'
                sh 'cp -rf ./build/* /www/wwwroot/ks-form-front'
            }
        }
    }
}
