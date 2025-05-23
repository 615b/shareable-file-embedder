
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# If you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# If you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:615/shareable-file-embedder.git main:gh-pages

cd -
