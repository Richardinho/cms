# CMS

Content Management System for my website. Written in **Angular**

##  Deployment
Delete app folder from server, then upload files.
Must have ssh keys set up for this.

```
  # log into remote server. Once in, use cd, rm etc. to delete app folder
  ssh richardh@richardhunter.co.uk

  # load build folder to server
  scp -r dist/cms richardh@richardhunter.co.uk:/home/richardh/public_html/

```
