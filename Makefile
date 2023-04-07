install:
	make -C frontend install & make -C backend install

start-frontend:
	make -C frontend start

start-backend:
	make -C backend start

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main

build:
	npm run build
