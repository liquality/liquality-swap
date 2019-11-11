FROM node:8
WORKDIR /home/node/app
COPY corsproxy.js /home/node/app/corsproxy.js
CMD npm install http-proxy && node corsproxy.js