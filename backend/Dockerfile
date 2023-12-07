# Stage 1: Build
FROM node:lts-alpine as base

WORKDIR /usr/local/app

COPY . .

RUN yarn install --frozen-lockfile --ignore-scripts && \
    yarn build && \
    yarn cache clean && \
    rm -rf node_modules


# Stage 2: Production
FROM node:lts-alpine as production

ENV NODE_ENV=production \
    TZ=America/Sao_Paulo \
    HUSKY_SKIP_HOOKS=true

WORKDIR /usr/local/app

COPY --chown=node:node --from=base /usr/local/app/dist/ ./dist
COPY --chown=node:node --from=base /usr/local/app/package.json ./
COPY --chown=node:node --from=base /usr/local/app/yarn.lock ./

# Define variável de ambiente para ignorar as dependências de desenvolvimento
ENV YARN_PRODUCTION=true

RUN apk update \
  && apk add --no-cache dumb-init tzdata curl ffmpeg \
  && yarn install --frozen-lockfile --ignore-scripts --production --legacy-peer-deps --prefer-offline \
  && mkdir -p logs \
  && mkdir -p tokens \
  && chown -R node:node logs \
  && chown -R node:node tokens \
  && rm /usr/local/app/package.json \
  && rm /usr/local/app/yarn.lock \
  && rm /usr/local/app/.npmrc \
  && rm -rf /tmp/* /var/cache/apk/*

USER node

CMD ["dumb-init", "node", "dist/src/app.js"]
