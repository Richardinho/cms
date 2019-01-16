# CMSC

Content Management System for website.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

##  Deployment
Delete app folder from server, then upload files.
Must have ssh keys set up for this.

```
  # log into remote server. Once in, use cd, rm etc. to delete app folder
  ssh richardh@richardhunter.co.uk

  # load build folder to server
  scp -r dist/cms richardh@richardhunter.co.uk:/home/richardh/public_html/

```
