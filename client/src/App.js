import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getAllPlayers } from './redux/actions';

function App() {

  const players = useSelector((state)=>state.players)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllPlayers())
  },[dispatch])

  console.log(players);
  return (
    <div className="App">
      <h1>Henry PF</h1>
      {players.map((p)=>{
        return <p>{p.name}</p>
      })}
    </div>
  );
}

export default App;
