FROM node:12-stretch-slim

RUN runDeps="openssl ca-certificates patch" \
 && apt-get update \
 && apt-get install -y --no-install-recommends $runDeps \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

COPY . /opt/frontend/
RUN chown -R node /opt/frontend/

WORKDIR /opt/frontend/
USER node

RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn \
 && RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build \
 && rm -rf /home/node/.cache

RUN npm install -g mrs-developer

VOLUME /opt/frontend/src/addons

EXPOSE 3000 3001 4000 4001

ENTRYPOINT ["/opt/frontend/entrypoint-dev.sh"]
CMD ["yarn", "develop"]
CMD ["yarn", "start"]
