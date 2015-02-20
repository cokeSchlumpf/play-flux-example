package actors

import akka.actor._
import events.SayHello
import events.SayGoodbye

object DispatcherActor {
  
  def props(out: ActorRef) = Props(new DispatcherActor(out))
  
}

class DispatcherActor(out: ActorRef) extends Actor {

  def receive = {
    case msg: String =>
      out ! "Received your message."
    case SayHello(message, _) =>
      println(message)
      out ! SayGoodbye("Tschüss!")
    case other =>
      println(other)
  }
  
  out ! SayHello("HORST!")
  
}