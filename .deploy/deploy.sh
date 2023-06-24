cd ~/projects/react-production
npm run build:prod 

rm -rf /var/www/production_project/html
mv ~/projects/react-production/build  /var/www/production_project/html  
