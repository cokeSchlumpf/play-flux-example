import sbt._
import Keys._
import sbt.Project.projectToRef

import com.typesafe.sbt.rjs.SbtRjs.autoImport._
import com.typesafe.sbt.web.SbtWeb.autoImport._
import com.typesafe.sbteclipse.core.EclipsePlugin.EclipseKeys

import org.scalajs.sbtplugin.ScalaJSPlugin
import org.scalajs.sbtplugin.ScalaJSPlugin.autoImport._

import play.Play.autoImport._
import PlayKeys._

import playscalajs.PlayScalaJS
import playscalajs.PlayScalaJS.autoImport._
import playscalajs.ScalaJSPlay

object PlayApplicationBuild extends Build {
  
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
    enablePlugins(play.PlayScala).
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
  
}