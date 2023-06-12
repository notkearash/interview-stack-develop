# MARZ Fullstack Web Developer Take-Home Interview

## Application break down

The application is comprised of 5 parts

1. webapp -> Frontend for the applicaiton (written in React and Typescript)
2. api.orders -> Backend for the applicaiton (written in flask)
3. nginx -> The proxy for the requests
4. db -> mariadb
5. api.products -> Backend for the applicaiton (written in typescript)

## Requirements

1. Docker [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
2. Docker Compose [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
3. Node v17.9.1 [https://nodejs.org/fr/blog/release/v17.9.1/](https://nodejs.org/fr/blog/release/v17.9.1/)
4. Node v20.2.0

## Setup

### webapp

The client side applicaiton uses node version 17, node 16 should also work as well. From the root of the `webapp` directory install the node dependencies using the command bellow

```Bash
npm ci
```

and build the docker image for the webapp container using the command bellow from the root of the `webapp` directory

```Bash
docker build -t webapp:latest .
```

### api.orders

To build the docker image for api.orders run the command bellow from the root of the `api.orders` directory

```Bash
docker build -t api.orders:latest .
```

### api.products

To build the docker image for api.orders run the command bellow from the root of the `api.products` directory

```Bash
docker build -t api.products:latest .
```

### Starting the application

To start application run the following command from the root directory

```Bash
docker compose up -d
```

To connect to the app go to [http://localhost:80](http://localhost:80)

NOTE: If you see an NGINX 502 wait a couple of seconds, then refresh the page. It just means node is not done compiling the application.

If you also get database authentication error from the api.products, wait couple of seconds then restart the container

```Bash
docker compose restart api.products
```

## Storybook

[Storybook](https://storybook.js.org/) is a frontend workshop for building UI components and pages in isolation.
To start storybook run the following command from the root of the `webapp` directory

```Bash
npm run storybook
```

To view the component library, go to [http://localhost:6006](http://localhost:6006). This will show you all the pages and components that have been built for the application without needing to start the applicaiton.

NOTE: Storybook is configured to run locally

## Testing

Both webapp and api.orders have tests written, webapp uses jest and api.orders uses pytest.

### Testing webapp

To run the jest tests run the following command at the root of the `webapp` directory

```Bash
npm run test
```

### Testing api.orders

To run the pytests from the root directory run the following commands

```Bash
docker compose exec -it api-orders bash
python -m pytest tests/ # from within the container
```

NOTE: Make sure the api.orders container is running.

You can also install all the dependencies locally and run the tests using the same command that you run inside the docker container from the bakcend directory. Would recommend setting up a python env under the .venv directory name for this