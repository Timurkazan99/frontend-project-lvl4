install: npm i

start-frontend:
    npm start

make start-backend:
    npx start-server -p 5000 -a 127.0.0.1

build:
	npm run build