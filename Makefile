install:
	npm ci
	make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -p 5001 -s ./frontend/src/assets

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main

build:
	npm run build
