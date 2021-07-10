# Dockerizing the application

- Docker version 20.10.5
- Composer version 1.27.4

#### On the first run of the application 

Build the container

```
docker-compose up --build
```

Create a database and run the migrations

```
docker exec -it gamou_app rails db:create
docker exec -it gamou_app rails db:migrate
```

#### In the next runs it will not be necessary to run the build command. Just run:

```
docker-compose up
```

---

_This is an experimental setup, if you have troubleshootings please open an issue._