import Axios from "axios";
import { Button, Container, LobbyInfo, Navbar, UserTile } from "components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { gameExists } from 'services/database-service';

export function Lobby() {
  const params = useParams();
  const pin = params.pin;
  const max = 10;
  const [players, setPlayers] = useState([]);
  const [gameFound, setGameFound] = useState(false);
  const current = players.length;

  const fetchPlayers = () => {
    Axios.get(`http://localhost:8080/socialgame/ws/games/${pin}`)
      .then((res) => {
        if (Array.isArray(res?.data.players)) setPlayers(res.data.players);
      })
      .catch((err) => {
        console.log("Failed to fetch categories");
        console.log(err);
      });
  }

  const checkIfGameExists = async () => {
    if (await gameExists(pin)) {
      setGameFound(true);
      console.log("yyyy")
    } else {
      console.log("xxxx")
    }
  }

  useEffect(() => {
    fetchPlayers();
    checkIfGameExists();
  }, [])

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 dark:text-white">
      <Navbar label="Lobby" onBackClickPath="/" />
      <Container>
        <LobbyInfo lobbyPin={pin} max={max} current={current} />
        <p>Game exists: {gameFound ? 'yaa' : 'naa'}</p>

        <div className="flex flex-wrap">
          {players.map((player) => {
            return <UserTile name={player.name} color="grass" />;
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center mb-16 sm:mb-20 md:mb-32">
          <Link to="/present-word">
            <Button label="Start game" primary />
          </Link>
        </div>
      </Container>
    </div>
  );
}
