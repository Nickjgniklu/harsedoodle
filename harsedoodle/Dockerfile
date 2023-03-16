FROM node:18.13 as build 
LABEL org.opencontainers.image.source="https://github.com/nickjgniklu/harsedoodle"

WORKDIR /react-app


COPY package*.json ./


RUN npm install

EXPOSE 80

COPY . .


RUN npm run build


FROM nginx:1.19


COPY ./nginx/nginx.conf /etc/nginx/nginx.conf


COPY --from=build /react-app/build /usr/share/nginx/html
