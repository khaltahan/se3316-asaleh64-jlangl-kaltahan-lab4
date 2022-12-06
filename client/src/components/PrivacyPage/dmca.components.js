import {React, useState} from 'react';
import styles from './privacy.module.css'

const DMCAPage = ()=>{
        const [toggle, setToggle] = useState(true);
        const [text, setText] = useState("Sample Text");

  function toggleInput() {
    setToggle(false);
  }

  function handleChange(event) {
    setText(event.target.value);
  }

  const handleUpdatedDone =() => {
        setToggle(true);
    
}

  return (
    <div className={styles.App}>
      <h1>DMCA Notice</h1>
      {toggle ? (
        <p onDoubleClick={toggleInput} >{text}</p>
      ) : (<div>
            <textarea  className = {styles.input}value={text} onChange={handleChange}/>
            <button onClick={handleUpdatedDone}>Update Changes</button>
            </div>
        
      )}
    </div>
  )
}

export default DMCAPage;