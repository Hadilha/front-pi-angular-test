FROM node:22-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/<your-app-name> /usr/share/nginx/html

# Optional: copy custom Nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
