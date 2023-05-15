FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app


COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000


EXPOSE $PORT


CMD ["npm", "start"]