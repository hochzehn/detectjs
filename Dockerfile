FROM node:6.2.0
MAINTAINER Jan Papenbrock <j.papenbrock@hochzehn.com>

WORKDIR /opt/app

ADD package.json /opt/app/
RUN npm install

ADD app/ /opt/app/

ENTRYPOINT ["node", "run.js"]
CMD [""]
