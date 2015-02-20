package client

import scala.scalajs.js
import org.scalajs.dom
import scala.scalajs.js.annotation.JSExport
import scala.scalajs.js.annotation.JSExportAll
import scala.annotation.meta.field

import prickle._

@JSExport
case class TestClass(
    @(JSExport @field) name: String, 
    @(JSExport @field) actionType: String) {
  
    @JSExport
    def foo() = Pickle.intoString(this)
  
    def toJSON() = Pickle.intoString(this)
}


//@JSExportAll
//class Test() {
//  
//  def test = new TestClass("Michael", "test")
//  
//}