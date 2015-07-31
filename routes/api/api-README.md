This folder holds the routes for all the API endpoints; the API lives at http://[host]/api.

## Intents and Principles

### Write extremely consistent and auto-digestible code
I'm (Janardan) coding this with a conservative attention to consistent conventions and code structure and limiting the use of frameworks rather than searching for the slickest options available, partially because I don't know what those slickest options are. The hope is that if we find a smoother way to architect things, the consistency of the code structure will allow us to transform the entire API codebase with minimal fuss.

### Expect header-based API versioning
Eventual intent is to do versioning using an API version header; this hasn't yet been implemented because we don't yet have multiple versions to worry about. This will mean you need a tool like Postman or Paw to test the API, but that ship's sailed anyway; we don't want to artificially privilege GET requests because you can plug them into a URL bar. It's intended that by the time we implement this, we'll just shut down requests that don't come with the proper header. So this should be implemented while usage of the API is still relatively limited.

### Let Mongo validate
Don't check input at all; just feed it to Mongo and feed back whatever success or errors it comes up with.
