install: install-deps

start-backend:
	npx start-server -p 5000 -a 127.0.0.1

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku

test:
	npm test -s

.PHONY: test