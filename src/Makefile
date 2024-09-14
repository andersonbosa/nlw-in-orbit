# Automations to 'development' environment.
build-develop:
	docker compose -f iac/environments/develop/docker-compose.yml build

start-develop:
	docker compose -f iac/environments/develop/docker-compose.yml up --remove-orphans --build

stop-develop:
	docker compose -f iac/environments/develop/docker-compose.yml down

setup-develop:
	docker network create pocket-net-dev || true

dev: setup-develop build-develop stop-develop start-develop

# Automations to 'staging' environment.
build-staging:
	docker compose -f iac/environments/staging/docker-compose.yml build

start-staging:
	docker compose -f iac/environments/staging/docker-compose.yml up --remove-orphans --build

stop-staging:
	docker compose -f iac/environments/staging/docker-compose.yml down

setup-staging:
	docker network create pocket-net-stag || true

stag: setup-staging build-staging stop-staging start-staging


.PHONY: dev stag