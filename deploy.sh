echo "this is the deploy script"

# delete existing folder
ssh richardh@richardhunter.co.uk 'rm -rf public_html/cms'

scp -r dist/cms richardh@richardhunter.co.uk:public_html/cms
