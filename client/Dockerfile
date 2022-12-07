# Image
FROM node:lts-alpine3.14 as builder

# Work directory
WORKDIR /frontend

# Requirements
COPY package*.json ./

# Installations
RUN npm install


# Copy source code
COPY ./ ./

# start app
CMD ["npm", "run", "start"]




## Build
#RUN npm run build
#
#
## Image Nginx
#FROM nginx:alpine
#
## Copy build
#COPY --from=builder /frontend/build /usr/share/nginx/html
#
## Expose port
#EXPOSE 80