install:
	npm ci
	make -C frontend install
	make start

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main

build:
	npm run build
