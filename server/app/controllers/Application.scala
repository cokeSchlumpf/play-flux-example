package controllers

import play.api._
import play.api.mvc._
import play.api.cache.Cached
import actors.DispatcherActor
import events.ClientEvent

object Application extends Controller {

  implicit val app: play.api.Application = play.api.Play.current

  /**
   * Retrieves all routes via reflection.
   * http://stackoverflow.com/questions/12012703/less-verbose-way-of-generating-play-2s-javascript-router
   * @todo If you have controllers in multiple packages, you need to add each package here.
   */
  val routeCache = {
    val jsRoutesClass = classOf[routes.javascript]
    val controllers = jsRoutesClass.getFields.map(_.get(null))
    controllers.flatMap { controller ⇒
      controller.getClass.getDeclaredMethods.map { action ⇒
        action.invoke(controller).asInstanceOf[play.core.Router.JavascriptReverseRoute]
      }
    }
  }

  /**
   * Returns the JavaScript router that the client can use for "type-safe" routes.
   * Uses browser caching; set duration (in seconds) according to your release cycle.
   *
   * TODO: Read duration from dev/ prod configuration.
   */
  def jsRoutes = Cached(_ ⇒ "jsRoutes", duration = 60) {
    Action { implicit request ⇒
      Ok(Routes.javascriptRouter("jsRoutes")(routeCache: _*)).as(JAVASCRIPT)
    }
  }

  /**
   * Homepage
   */
  def index = Action { implicit req =>
    Ok(views.html.index("Hallo Freunde!"))
  }

  def stream = WebSocket.acceptWithActor[ClientEvent, ClientEvent] { request ⇒ out ⇒
      DispatcherActor.props(out)
  }

}