pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'xela146/tutor-front:latest'
        BACKEND_IMAGE = 'xela146/tutor-back:latest'
    }

    stages {
        stage('Build Frontend') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE .'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'docker run $FRONTEND_IMAGE npm test'
            }
        }

        stage('Push Frontend Image') {
            when {
                branch 'master'
            }
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        sh "docker push $FRONTEND_IMAGE"
                    }
                }
            }
        }

        // stage('Deploy') {
        //     when {
        //         branch 'main'
        //     }
        //     steps {
        //         git(url: 'https://github.com/adtrahan146/tutor-centre.git', branch: 'main')
        //         dir('repo-containing-docker-compose') {
        //             withDockerRegistry([credentialsId: 'dockerhub-credentials', url: 'https://index.docker.io/v1/']) {
        //                 sh 'docker-compose pull'
        //                 sh 'docker-compose up -d'
        //             }
        //         }
        //     }
        // }
    }
}
