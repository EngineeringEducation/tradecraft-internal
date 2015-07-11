# tradecraft-internal
internal intranet of goodness


### To get started:

Open a terminal window and navigate to the folder within which you want your tradecraft-internal folder to be created :)

Clone the tradecraft-internal repository  
`git clone git@github.com:TradecraftEngineering/tradecraft-internal.git`

Open dat new folder  
`cd tradecraft-internal`

Install nodemon globally with NPM  
`npm install -g nodemon`

Install node third-party library dependencies of the tradecraft-internal project (whose folder you should now be within)  
`npm install`

Install MongoDB globally with Homebrew, for the data holdings  
`brew install mongo`

Set up Redis for the logins
First, open another terminal tab and navigate to a directory within which you'd like the redis program's directory to be created
Then, install Redis with these commands:
```shell
	wget http://download.redis.io/redis-stable.tar.gz
	tar xvzf redis-stable.tar.gz
	cd redis-stable
	make
```

Start Redis and Mongo in their own terminal tabs and leave them there :)  
`redis-server`  
`mongo`

And finally, ...get help from Liz or Janardan configuring your .env file properly. :E

## Run it

From the tradecraft-internal directory:  
`foreman start`
