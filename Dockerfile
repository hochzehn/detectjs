FROM wernight/phantomjs

ADD . /app/

ENTRYPOINT ["phantomjs", "/app/run.js"]
CMD [""]
