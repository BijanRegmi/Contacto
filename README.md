# Contacto

## Setup database
- Start postgresql service 
	```
	sudo systemctl start postgresql
	```
- Run schema file
	```
	psql -U <USER> -f src/server/schema.sql
	```

## Setup project
- Git clone 
	```
	git clone git@github.com:BijanRegmi/Contacto.git
	cd Contacto
	```
- Install npm modules 
	```
	npm i
	```
- Set env variables
	```
	cp .env.example .env
	```
- Build and run
	```
	npm run build
	npm run start
	```
