package teamsocial.wordgame.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.annotation.ApplicationScope;
import teamsocial.wordgame.model.GameManagerBean;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.websocket.response.GameResponse;

@Controller
@ApplicationScope
public class ChatController implements Game.GameObserver {

  @Autowired
  private GameManagerBean gameManager;

  @MessageMapping("/chat")
  @SendTo("/topic/messages")
  public GameResponse send(Message message) {
    var game = gameManager.getGame("12345");
    return new GameResponse(game);
  }

  @Override
  public void onGameChange() {
    System.out.println("---------- game changed! ----------");
    send(new Message());
  }
}
