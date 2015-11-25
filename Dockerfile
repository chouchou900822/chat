FROM node:onbuild

RUN npm install

RUN ./node_modules/.bin/jsx ./public/js/components/src ./public/js/components/dist

EXPOSE 80

CMD ./node_modules/.bin/pm2 start app.js --name chat-demo --no-daemon