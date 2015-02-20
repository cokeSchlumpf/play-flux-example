import sbt.Project.projectToRef

val scalaV = "2.11.1"

val projectV = "1.0-SNAPSHOT"

val clients = Seq(client)

lazy val server = (project in file("server")).settings(
  scalaVersion := scalaV,
  version := projectV,
  scalaJSProjects := clients,
  pipelineStages := Seq(scalaJSProd, rjs),
  libraryDependencies ++= Seq(
      jdbc,
      anorm,
      cache,
      ws,
      "org.webjars" % "bootstrap" % "3.0.2",
      "org.webjars" % "jquery" % "1.11.2",
      "org.webjars" % "react" % "0.12.2",
      "org.webjars" % "requirejs" % "2.1.16",
      "com.vmunier" %% "play-scalajs-scripts" % "0.1.0"
    ),  
  EclipseKeys.skipParents in ThisBuild := false).
  enablePlugins(PlayScala).
  aggregate(clients.map(projectToRef): _*).
  dependsOn(client)
    
lazy val client = (project in file("client")).settings(
  scalaVersion := scalaV,
  version := projectV,
  persistLauncher := false,
  persistLauncher in Test := false,
  unmanagedSourceDirectories in Compile := Seq((scalaSource in Compile).value),
  libraryDependencies ++= Seq(
    "org.scala-js" %%% "scalajs-dom" % "0.8.0",
    "com.github.benhutchison" %%% "prickle" % "1.1.3")
  ).
  enablePlugins(ScalaJSPlugin, ScalaJSPlay)

// loads the jvm project at sbt startup
onLoad in Global := (Command.process("project server", _: State)) compose (onLoad in Global).value