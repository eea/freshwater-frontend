FROM node:16-slim

COPY . /opt/frontend/
WORKDIR /opt/frontend/

# Update apt packages
RUN runDeps="openssl ca-certificates patch gosu git make tmux locales-all" \
    && apt-get update \
    && apt-get install -y --no-install-recommends $runDeps \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g mrs-developer \
    && cp jsconfig.json.prod jsconfig.json \
    && mkdir -p /opt/frontend/src/addons \
    && rm -rf /opt/frontend/src/addons/* \
    && find /opt/frontend/ -not -user node -exec chown node {} \+ \
    && corepack enable

USER node

ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max_old_space_size=$MAX_OLD_SPACE_SIZE

WORKDIR /opt/frontend/

RUN cd /opt/frontend \
    && rm -r yarn.lock \
    && touch yarn.lock \
    && PUBLIC_PATH=VOLTO_PUBLIC_PATH RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn \
    && PUBLIC_PATH=VOLTO_PUBLIC_PATH RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build \
    && rm -rf /home/node/.cache
USER root

EXPOSE 3000 3001

ENTRYPOINT ["/opt/frontend/entrypoint-prod.sh"]
CMD ["yarn", "start:prod"]
