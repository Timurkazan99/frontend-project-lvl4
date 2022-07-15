start-frontend:
    npm start

start-backend:
    npx start-server -p 5000 -a 127.0.0.1

install: install-deps

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish