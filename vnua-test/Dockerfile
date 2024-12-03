## Stage 1: Build react app

FROM node:18-alpine AS build
# Set working directory
WORKDIR /app 
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application source code
COPY . . 
# Build the React app
RUN npm run build

## State 2: Serve the react App with nginx
FROM nginx:alpine
# Copy the React build output to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html
# Copy custom Nginx configuration (optional)
RUN chown -R nginx:nginx /usr/share/nginx/html  # Đảm bảo quyền truy cập vào các file
# Uncomment the following line if you have a custom nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
