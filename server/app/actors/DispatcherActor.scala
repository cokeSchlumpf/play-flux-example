package actors

import akka.actor._
import client._

object DispatcherActor {
  
  def props(out: ActorRef) = Props(new DispatcherActor(out))
  
}

class DispatcherActor(out: ActorRef) extends Actor {

  def receive = {
    case msg: String =>
      out ! "Received your message."
    case SayHello(message, _) =>
      out ! SayGoodbye("Tschüss!")
    case other =>
      println(other)
  }
  
}