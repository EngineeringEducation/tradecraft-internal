# tradecraft-internal
internal intranet of goodness


### To get started:

Open Terminal and navigate to your projects/source directory where your new tradecraft-internal project will belong :)

Clone the tradecraft-internal repository  
`git clone git@github.com:TradecraftEngineering/tradecraft-internal.git`

Open the new folder implicitly created by cloning the repository  
`cd tradecraft-internal`

Install nodemon globally  
`npm install -g nodemon`

Install node-module third-party libraries used by tradecraft-internal.  
This npm command is sensitive to the current directory, so make sure you're in tradecraft-internal :)  
`npm install`

Install MongoDB and Redis for storing data  
`brew install mongo`  
`brew install mongo`

And finally, ...get help from Liz or Janardan configuring your .env file properly. :E

## Run it

Start Redis and Mongo in their own terminal tabs and leave them there :)  
`redis-server`  
`mongod`

And start the web server from the tradecraft-internal directory:  
`foreman start`
