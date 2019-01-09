FROM node:8

# SETUP
COPY . /app/
WORKDIR /app

RUN npm install
RUN npm run build

# CLEAN UP
RUN npm prune --production
RUN rm -rf src/
RUN rm -rf babel.config.js
RUN rm -rf postcss.config.js

# RUN
Expose 80
CMD [ "npm", "start" ]