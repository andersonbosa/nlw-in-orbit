.PHONY: dev

# Automations to 'development' environment.
build-develop:
	docker compose -f iac/environments/develop/docker-compose.yml build

start-develop:
	docker compose -f iac/environments/develop/docker-compose.yml up --remove-orphans --build

stop-develop:
	docker compose -f iac/environments/develop/docker-compose.yml down

setup-develop:
	docker network create pocket-net || true

dev: setup-develop build-develop stop-develop start-develop
