#!/bin/bash
docker build --tag=flippo-web .
docker tag flippo-web registry.digitalocean.com/nchill/flippo-web:live
docker push registry.digitalocean.com/nchill/flippo-web:live
