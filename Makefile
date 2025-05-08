# the cd part can be removed after developement 
up:
	cd app && npm i && cd .. && docker-compose up --build

down:
	docker-compose down

restart:
	docker-compose down && docker-compose up --build

logs:
	docker-compose logs -f
