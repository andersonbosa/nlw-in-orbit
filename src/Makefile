
develop-up:
	docker compose -f iac/environments/develop/docker-compose.yml up --remove-orphans
	# docker compose -f iac/environments/develop/docker-compose.yml up --remove-orphans --build

develop-down:
	docker compose -f iac/environments/develop/docker-compose.yml down

develop-setup:
	docker network create pocket-net
