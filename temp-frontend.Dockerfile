# Temporary frontend placeholder image
FROM nginx:alpine

# Create a simple placeholder HTML file
RUN rm -rf /usr/share/nginx/html/*

RUN echo '<!DOCTYPE html><html><head><title>Todo App</title></head><body><h1>Todo Application</h1><p>Frontend service placeholder</p><script>console.log("Todo frontend placeholder");</script></body></html>' > /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
