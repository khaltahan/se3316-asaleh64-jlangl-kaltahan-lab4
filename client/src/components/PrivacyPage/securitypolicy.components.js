import {React, useState} from 'react';
import styles from './privacy.module.css'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const SecurityPage = ({admin})=>{
  //const name = "MusicArchive.inc";
  const notice = "Sample"

        const [toggle, setToggle] = useState(true);
        const [text, setText] = useState(notice);

  function toggleInput() {
      setToggle(false);
  }
  const handleUpdatedDone = () => {
        setToggle(true);
}

  return (
    <div className={styles.App}>
      <h1>Security Policy</h1>
      <ReactQuill
        theme='snow'
        value={text}
        onChange={setText}
        style={{minHeight: '300px'}}
        readOnly = {toggle}
      />{admin && <div>
        {toggle ? <button onClick={toggleInput}>Edit</button> : <button onClick={handleUpdatedDone}>Update Changes</button>}
        </div>}
    </div>
  )
}

export default SecurityPage;