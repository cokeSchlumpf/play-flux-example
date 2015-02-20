package events

import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.mvc.WebSocket.FrameFormatter

sealed trait ClientEvent {
   val actionType: String 
}

object ClientEvent {

  implicit def clientEventFormat: Format[ClientEvent] = Format(
    (__ \ "actionType").read[String].flatMap {
      case "sayHello" ⇒ SayHello.SayHelloFormat.map(identity)
      case "sayGoodbye" ⇒ SayGoodbye.SayGoodbyeFormat.map(identity)
      case other ⇒ Reads(_ ⇒ JsError("Unknown client event: " + other))
    },
    Writes {
      case hello: SayHello ⇒ SayHello.SayHelloFormat.writes(hello)
        
      case goodbye: SayGoodbye ⇒ SayGoodbye.SayGoodbyeFormat.writes(goodbye)
    });

  implicit def clientEventFrameFormatter: FrameFormatter[ClientEvent] = FrameFormatter.jsonFrame.transform(
    clientEvent ⇒ Json.toJson(clientEvent),
    json ⇒ Json.fromJson[ClientEvent](json).fold(
      invalid ⇒ throw new RuntimeException("Bad client event on WebSocket: " + invalid),
      valid ⇒ valid))

}

case class SayHello(message: String, actionType: String = "sayHello") extends ClientEvent

object SayHello {
  implicit val SayHelloFormat = Json.format[SayHello]
}

case class SayGoodbye(message: String, actionType: String = "sayGoodbye") extends ClientEvent

object SayGoodbye {
  implicit val SayGoodbyeFormat = Json.format[SayGoodbye]
}