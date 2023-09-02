FROM node:20-alpine

WORKDIR /app

COPY ["package.json", "/app/package.json"]
COPY ["package-lock.json", "/app/package-lock.json"]

RUN npm ci

COPY ["canvas-api-request.js", "/app/canvas-api-request.js"]
COPY ["sync-context-ids.js", "/app/sync-context-ids.js"]

ENTRYPOINT ["node", "sync-context-ids.js"]
