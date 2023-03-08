# Contacto

## Setup database
- Start postgresql service 
	```
	sudo systemctl start mariadb
	```
- Run schema file
	```
	mariadb -U <USER> -p < src/servver/schema.sql
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
