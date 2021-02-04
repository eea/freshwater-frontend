FROM node:12-stretch-slim

RUN apt-get update && apt-get install -y git

COPY . /opt/frontend/
RUN chown -R node /opt/frontend/
RUN rm -rf /opt/frontend/src/addons/*

WORKDIR /opt/frontend/
RUN npm install -g yalc
USER node

ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max_old_space_size=$MAX_OLD_SPACE_SIZE

RUN git clone https://github.com/collective/mrs-developer.git \
  && cd mrs-developer \
  && git checkout optional_develop \
  && yalc publish

RUN cd /opt/frontend

RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn
RUN yalc add --no-pure mrs-developer
RUN yarn develop
RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn

RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build \
 && rm -rf /home/node/.cache

EXPOSE 3000 3001 4000 4001

ENTRYPOINT ["/opt/frontend/entrypoint-prod.sh"]
CMD ["yarn", "start:prod"]
USER root
