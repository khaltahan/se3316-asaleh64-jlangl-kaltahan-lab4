import React, {useState} from 'react'

function Overview(){
const [connection, setConnection] = useState('')
const [connected, setConnected] = useState(false)
const displayInfo = () => {
    fetch('http://localhost:5000', { method: 'GET' })
      .then(response => response.json())
      .then(data => setConnection((data.message), setConnected(true)))
      .catch(error => console.log(error)) 
  }

return(
    <div className="overview">
        <button onClick={displayInfo}>API Connection</button>
        <h1>{connected ? connection : 'Awaiting Request'}</h1>
    </div>
)
}
export default Overview;