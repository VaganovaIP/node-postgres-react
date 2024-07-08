
import './App.css'
import {Message} from './components/Message.jsx'




function App() {
    function Welcome(name) {
        return <h1>Привет, {name}</h1>;
    }

  return (
    <>
        <Message name={"count"}/>
        {Welcome("1")}
    </>

  )
}

export default App
