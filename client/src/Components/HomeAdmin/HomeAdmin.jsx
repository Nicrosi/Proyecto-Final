import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlayers } from '../../redux/actions';


function HomeAdmin() {

  const players = useSelector((state) => state.players)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPlayers())
  }, [dispatch])

  return (
    <div className="App">
      <h3>HOME ADMINISTRATOR</h3>

      <button >Players</button>
      <button>Create Tournament</button>
      <button>Create Sub-Tournament</button>
      {
        players.map((p) => {
          return (
            <div>
              {p.isAdmin &&
                <div>
                  <h3 key={p.dni}> {p.name}</h3>
                  <h3>{p.last_name}</h3>
                  <h3>{p.e_mail}</h3>
                  <h3>{p.phone}</h3>
                </div>
              }
            </div>
          )
        })
      }
    </div>
  );
}

export default HomeAdmin;
