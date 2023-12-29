FROM oven/bun

WORKDIR /home/bun/app/
COPY package* .

RUN bun install
COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "run", "./src/app.ts" ]
