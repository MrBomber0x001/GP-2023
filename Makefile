dockerbuild:
    docker build -t . --name nodeapp:v1
server_start:
	npm run start
server_build:
	npm run build
server_test:
	npm run test
migrateup:
    npx prisma migrate up
migratedown:
    npx prisma migrate down