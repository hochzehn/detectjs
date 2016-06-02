FROM wernight/phantomjs

ADD app/ /opt/app/

ENTRYPOINT ["phantomjs", "/opt/app/lib/detectjs.js"]
CMD [""]
