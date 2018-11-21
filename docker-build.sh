
cd "${BASH_SOURCE%/*}" || exit

$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t learnhub/backend .
docker tag learnhub/backend:latest 492864460344.dkr.ecr.us-east-1.amazonaws.com/learnhub/backend:latest
docker push 492864460344.dkr.ecr.us-east-1.amazonaws.com/learnhub/backend:latest