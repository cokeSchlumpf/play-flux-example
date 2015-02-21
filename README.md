# Reactive web application built with Play Framework 

This sample application shows how to create a reactive web application with Play. The application features several frameworks:

* *Akka* for building the concurrent, event driven backend
* *React* to build (almost immutable) UI components
* *scala-js* to create shared resources between client and server

Apart from that, the application uses several Play features like:

* *Websockets* for bidirectional communication between server and client
* *JSON Macro Inception* to transform JSON requests easily to Scala case classes
* Serveral *sbt-web* plugins, e.g. CoffeeScript, uglify2, ...
* and much more ...
