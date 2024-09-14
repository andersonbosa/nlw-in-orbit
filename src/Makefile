
start-develop:
	docker compose -f iac/environments/develop/docker-compose.yml up --remove-orphans --build

stop-develop:
	docker compose -f iac/environments/develop/docker-compose.yml down

setup-develop:
	docker network create pocket-net
