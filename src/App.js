import './App.css';
import io from 'socket.io-client'
import Notification from './firebaseNotification/Notification';
import {useEffect, useState} from "react"
const socket = io.connect("http://localhost:3001");

function App() {
  const [headColor , setHeadColor] = useState("red")
  const assets = [
    {
        name: "Volatility 10(1s) Index",
        symbol: "1HZ10V"
    },
    {
        name: "Volatility 10 Index",
        symbol: "R_10"
    },
    {
        name: "Volatility 25(1s) Index",
        symbol: "1HZ25V"
    },
    {
        name: "Volatility 25 Index",
        symbol: "R_25"
    },
    {
        name: "Volatility 50(1s) Index",
        symbol: "1HZ50V"
    },
    {
        name: "Volatility 50 Index",
        symbol: "R_50"
    },
    {
        name: "Volatility 75(1s) Index",
        symbol: "1HZ75V"
    },
    {
        name: "Volatility 75 Index",
        symbol: "R_75"
    },
    {
        name: "Volatility 100(1s) Index",
        symbol: "1HZ100V"
    },
    {
        name: "Volatility 100 Index",
        symbol: "R_100"
    },
    {
        name: "Volatility 250(1s) Index",
        symbol: "1HZ250V"
    },
    {
        name: "Step Index",
        symbol: "STPRNG"
    },
    {
        name: "Drift Switch Index 10",
        symbol: "DSI10"
    },
    {
        name: "Drift Switch Index 20",
        symbol: "DSI20"
    },
    {
        name: "Drift Switch Index 30",
        symbol: "DSI30"
    },
]
  const [alert, setAlert] = useState(["Hello World"])
  useEffect(()=>{
    const token = localStorage.getItem("fcmToken")
    socket.on("alert", (data)=>{
      setAlert(data)
    })
    socket.on('connect', function() {
      setHeadColor("#09cb09")
      socket.emit("token", token)
    });
    socket.on('disconnect', function() {
      setHeadColor("red")
    });
  },[alert])
  
 
  return (
    <>
      <Notification/>
      <header style={{backgroundColor : headColor}}>Trading Alert</header>
      <section>
        {assets?.map((asset)=>{
          return <p style={{color : alert?.includes(asset?.name) ? "#09cb09" : "red"}}>{asset?.name}</p>
        })}
      </section>
    </>
  );
}

export default App;
