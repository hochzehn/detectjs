#!/bin/sh

NAME=$(basename ${PWD})

docker build --tag $NAME . > /dev/null

docker run \
  --rm \
  $NAME \
  $*
