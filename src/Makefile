DEVELOPMENT_COMPOSE_FILE=iac/environments/develop/docker-compose.yml
STAGING_COMPOSE_FILE=iac/environments/staging/docker-compose.yml

# Automations to 'development' environment.

build-develop:
	docker compose -f $(DEVELOPMENT_COMPOSE_FILE) build

start-develop:
	docker compose -f $(DEVELOPMENT_COMPOSE_FILE) up --remove-orphans

stop-develop:
	docker compose -f $(DEVELOPMENT_COMPOSE_FILE) down

setup-develop:
	docker network create pocket-net-dev || true

dev: setup-develop build-develop stop-develop start-develop

# Automations to 'staging' environment.
build-staging:
	docker compose -f iac/environments/staging/docker-compose.yml build

start-staging:
	docker compose -f iac/environments/staging/docker-compose.yml up --remove-orphans

stop-staging:
	docker compose -f iac/environments/staging/docker-compose.yml down

setup-staging:
	docker network create pocket-net-stag || true

stag: setup-staging build-staging stop-staging start-staging


.PHONY: dev stag