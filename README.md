# tradecraft-internal
internal intranet of goodness


### To get started:
clone the repository  
`git clone git@github.com:TradecraftEngineering/tradecraft-internal.git`  

Install nodemon  
`npm install -g nodemon`

Create the database   
`psql -h localhost -f schema.sql`
(should drop any existing database you have called Tradecraft! So. Make sure that's not important to you.)

Seed the database (not in production)  
`psql -h localhost -f seed.sql`

To get login working, you have to setup Redis  
Install Redis  
	wget http://download.redis.io/redis-stable.tar.gz
	tar xvzf redis-stable.tar.gz
	cd redis-stable
	make

Start Redis  
`redis-server`


## Run it
`nodemon bin/www`
