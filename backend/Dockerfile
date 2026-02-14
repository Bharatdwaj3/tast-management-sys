FROM node:22-alpine

WORKDIR /app

COPY  package*.json ./

RUN npm ci --only=production

COPY . .

RUN addgroup -g 1001 nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs && \
    chown -R nodeuser:nodejs /app
USER nodeuser

EXPOSE 5001

CMD ["npm","run","start"]