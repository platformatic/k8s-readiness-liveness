FROM node:22-alpine
RUN npm install -g pnpm

ENV APP_HOME=/app
RUN mkdir -p $APP_HOME/node_modules && chown -R node:node $APP_HOME

WORKDIR $APP_HOME

COPY --chown=node:node app/package.json ./
RUN pnpm install

COPY --chown=node:node app/ ./
RUN pnpm wattpm install

ENV PLT_SERVER_HOSTNAME=0.0.0.0

EXPOSE 3001 9090

CMD ["pnpm", "start"]
