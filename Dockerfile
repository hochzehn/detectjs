FROM phantomjs

ADD . /app/

ENTRYPOINT ["phantomjs", "/app/run.js"]
CMD [""]
