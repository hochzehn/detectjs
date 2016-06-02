#!/bin/sh

set -e

NAME="hochzehn/"$(basename ${PWD})

docker build --tag $NAME . > /dev/null

docker run \
  --rm \
  $NAME \
  $*
