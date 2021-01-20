FROM node:12-stretch-slim

RUN runDeps="openssl ca-certificates patch git" \
 && apt-get update \
 && apt-get install -y --no-install-recommends $runDeps \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

COPY . /opt/frontend/
RUN chown -R node /opt/frontend/

WORKDIR /opt/frontend/
USER node

USER root
RUN npm install -g mrs-developer

USER node
RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn \
 && RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn develop

VOLUME ./src/addons

EXPOSE 3000 3001 4000 4001

CMD ["yarn", "start"]
