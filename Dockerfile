FROM wernight/phantomjs

ADD . /app/

ENTRYPOINT ["phantomjs", "/app/lib/detectjs.js"]
CMD [""]
