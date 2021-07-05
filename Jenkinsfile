pipeline {
  environment {
    GIT_NAME = "freshwater-frontend"
    registry = "eeacms/freshwater-frontend"
    template = "templates/volto-freshwater"
    dockerImage = ''
    tagName = ''
    SONARQUBE_TAG = ""
  }

  agent any

  stages {


    stage('Integration tests') {
      steps {
            node(label: 'docker') {
              script {
                try {
                  sh '''docker pull plone; docker run -d --name="$BUILD_TAG-plone" -e SITE="Plone" -e PROFILES="profile-plone.restapi:blocks" plone fg'''
                  sh '''docker pull eeacms/volto-project-ci; docker run -i --name="$BUILD_TAG-cypress" --link $BUILD_TAG-plone:plone -e GIT_NAME=$GIT_NAME -e GIT_BRANCH="$BRANCH_NAME" -e GIT_CHANGE_ID="$CHANGE_ID" eeacms/volto-project-ci cypress'''
                } finally {
                  try {
                    sh '''rm -rf cypress-reports cypress-results'''
                    sh '''mkdir -p cypress-reports cypress-results'''
                    sh '''docker cp $BUILD_TAG-cypress:/opt/frontend/my-volto-project/cypress/videos cypress-reports/'''
                    sh '''docker cp $BUILD_TAG-cypress:/opt/frontend/my-volto-project/cypress/reports cypress-results/'''
                    archiveArtifacts artifacts: 'cypress-reports/videos/*.mp4', fingerprint: true
                  }
                  finally {
                    catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                        junit testResults: 'cypress-results/**/*.xml', allowEmptyResults: true
                    }
                    sh script: "docker stop $BUILD_TAG-plone", returnStatus: true
                    sh script: "docker rm -v $BUILD_TAG-plone", returnStatus: true
                    sh script: "docker rm -v $BUILD_TAG-cypress", returnStatus: true
                  }
                }
              }
            }
        }
    }

    stage('Build & Push') {
      steps{
        node(label: 'docker-host') {
          script {
            checkout scm
            if (env.BRANCH_NAME == 'master') {
              tagName = 'latest'
            } else {
              tagName = "$BRANCH_NAME"
            }
            try {
              dockerImage = docker.build("$registry:$tagName", "--no-cache .")
              docker.withRegistry( '', 'eeajenkins' ) {
                dockerImage.push()
              }
            } finally {
              sh "docker rmi $registry:$tagName"
            }
          }
        }
      }
    }

    stage('Release') {
      when {
        buildingTag()
      }
      steps{
        node(label: 'docker') {
          withCredentials([string(credentialsId: 'eea-jenkins-token', variable: 'GITHUB_TOKEN')]) {
           sh '''docker pull eeacms/gitflow; docker run -i --rm --name="${BUILD_TAG}-release" -e GIT_TOKEN="${GITHUB_TOKEN}" -e RANCHER_CATALOG_PATH="${template}" -e DOCKER_IMAGEVERSION="${BRANCH_NAME}" -e DOCKER_IMAGENAME="${registry}" --entrypoint /add_rancher_catalog_entry.sh eeacms/gitflow'''
         }
        }
      }
    }
    
    stage('Update SonarQube Tags') {
      when {
        not {
          environment name: 'SONARQUBE_TAG', value: ''
        }
        buildingTag()
      }
      steps{
        node(label: 'docker') {  
          withSonarQubeEnv('Sonarqube') {
            withCredentials([string(credentialsId: 'eea-jenkins-token', variable: 'GIT_TOKEN')]) { 
              sh '''docker pull eeacms/gitflow'''
              sh '''docker run -i --rm --name="${BUILD_TAG}-sonar" -e GIT_NAME=${GIT_NAME} -e GIT_TOKEN="${GIT_TOKEN}" -e SONARQUBE_TAG=${SONARQUBE_TAG} -e SONARQUBE_TOKEN=${SONAR_AUTH_TOKEN} -e SONAR_HOST_URL=${SONAR_HOST_URL}  eeacms/gitflow /update_sonarqube_tags.sh'''
            }
          }
        } 
      }
    }
    
  }

  post {
    always {
      cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, deleteDirs: true)
    }
    changed {
      script {
        def details = """<h1>${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}</h1>
                         <p>Check console output at <a href="${env.BUILD_URL}/display/redirect">${env.JOB_BASE_NAME} - #${env.BUILD_NUMBER}</a></p>
                      """
        emailext(
        subject: '$DEFAULT_SUBJECT',
        body: details,
        attachLog: true,
        compressLog: true,
        recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'CulpritsRecipientProvider']]
        )
      }
    }
  }
}
