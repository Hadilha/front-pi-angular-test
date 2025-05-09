FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
RUN npm install -g @angular/cli
COPY . .
RUN ng build --configuration=production

FROM nginx:latest
COPY --from=build /app/dist/pi-font /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
