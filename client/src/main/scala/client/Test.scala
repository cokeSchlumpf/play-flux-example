package client

import scala.scalajs.js
import org.scalajs.dom
import scala.scalajs.js.annotation.JSExport
import scala.scalajs.js.annotation.JSExportAll
import scala.annotation.meta.field

import prickle._

sealed trait ClientEvent {
   val actionType: String 
   
   def toJSON: String
}

@JSExport
case class SayHello(
    @(JSExport @field) message: String, 
    @(JSExport @field) actionType: String = "sayHello") extends ClientEvent {
  
  @JSExport
  def toJSON() = Pickle.intoString(this)
  
}

@JSExport
case class SayGoodbye(
    @(JSExport @field) message: String, 
    @(JSExport @field) actionType: String = "sayGoodbye") extends ClientEvent {
  
  @JSExport
  def toJSON() = Pickle.intoString(this)
  
}