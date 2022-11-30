FROM node:16-alpine

WORKDIR /app
COPY . .

RUN npm install -g typescript
RUN npm install -g pnpm
RUN pnpm install

RUN tsc

CMD ["pnpm", "start"]