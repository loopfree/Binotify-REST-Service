FROM node:18-bullseye

WORKDIR /app
COPY . .

RUN npm install -g typescript
RUN npm install -g pnpm
RUN pnpm install

RUN tsc

CMD ["pnpm", "start"]