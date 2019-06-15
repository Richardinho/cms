# CMS

Content Management System for my website. Written in **Angular**

##  Development

```
  npm start
```

##  Deployment
Delete app folder from server, then upload files.
Must have ssh keys set up for this.

```
  # build Angular project
  npm run build
  
  # log into remote server. Once in, use cd, rm etc. to delete app folder
  ssh richardh@richardhunter.co.uk

  # load build folder to server
  scp -r dist/cms richardh@richardhunter.co.uk:/home/richardh/public_html/

```

##  Cypress Tests
Start server

```
npm start
```

run Cypress tests

```
npm run cypress:run
```


##  Unit Tests

```
cd /Users/richardhunter/development/cms

npm test

```

## Repository

Source code stored in Github

`https://github.com/Richardinho/cms`

On push, tests run in Travis CI

`https://travis-ci.org/Richardinho/cms`
