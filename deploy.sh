docker login frjalsar.azurecr.io -u frjalsar -p $FRJALSAR_CONTAINER_PASSWORD
docker build -t frjalsar/felagatal .
docker tag frjalsar/felagatal frjalsar.azurecr.io/felagatal:latest
docker push frjalsar.azurecr.io/felagatal:latest
