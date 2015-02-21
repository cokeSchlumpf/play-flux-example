package events

import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.mvc.WebSocket.FrameFormatter
import client._

object Formats {  
  implicit val SayHelloFormat = Json.format[SayHello]
  implicit val SayGoodbyeFormat = Json.format[SayGoodbye]
  
  implicit def clientEventFormat: Format[ClientEvent] = Format(
    (__ \ "actionType").read[String].flatMap {
      case "sayHello" ⇒ SayHelloFormat.map(identity)
      case "sayGoodbye" ⇒ SayGoodbyeFormat.map(identity)
      case other ⇒ Reads(_ ⇒ JsError("Unknown client event: " + other))
    },
    Writes {
      case hello: SayHello ⇒ SayHelloFormat.writes(hello)
        
      case goodbye: SayGoodbye ⇒ SayGoodbyeFormat.writes(goodbye)
    });

  implicit def clientEventFrameFormatter: FrameFormatter[ClientEvent] = FrameFormatter.jsonFrame.transform(
    clientEvent ⇒ Json.toJson(clientEvent),
    json ⇒ Json.fromJson[ClientEvent](json).fold(
      invalid ⇒ throw new RuntimeException("Bad client event on WebSocket: " + invalid),
      valid ⇒ valid))
}