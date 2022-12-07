import {React, useState} from 'react';
import styles from './privacy.module.css'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const UsePolicy = ({admin})=>{
  const name = "MusicArchive.inc";
  const notice = `
  •	Personnel are responsible for complying with ${name} policies when using ${name}  information resources and/or on ${name} time. If requirements or responsibilities are unclear, please seek assistance from the Information Security Committee.
  •	Personnel must promptly report harmful events or policy violations involving ${name} assets or information to their manager or a member of the Incident Handling Team. Events include, but are not limited to, the following:
  o	Technology incident: any potentially harmful event that may cause a failure, interruption, or loss in availability to ${name} Information Resources.
  o	Data incident: any potential loss, theft, or compromise of ${name} information.
  o	Unauthorized access incident: any potential unauthorized access to a ${name} Information Resource.
  o	Facility security incident: any damage or potentially unauthorized access to a ${name} owned, leased, or managed facility.
  o	Policy violation: any potential violation to this or other ${name} policies, standards, or procedures.
  •	Personnel should not purposely engage in activity that may 
  o	harass, threaten, impersonate, or abuse others; 
  o	degrade the performance of ${name} Information Resources; 
  o	deprive authorized ${name} personnel access to a ${name} Information Resource; 
  o	obtain additional resources beyond those allocated; 
  o	or circumvent ${name} computer security measures
  •	All personnel are required to maintain the confidentiality of personal authentication information. 
  •	Any group/shared authentication information must be maintained solely among the authorized members of the group. 
  •	All passwords, including initial and/or temporary passwords, must be constructed, and implemented according to the following ${name} rules:
  o	Must meet all requirements including minimum length, complexity, and reuse history.
  o	Must not be easily tied back to the account owner by using things like username, social security number, nickname, relative’s names, birth date, etc.
  o	Must not be the same passwords used for non-business purposes.
  •	Unique passwords should be used for each system, whenever possible.
  •	User account passwords must not be divulged to anyone. ${name} support personnel and/or contractors should never ask for user account passwords.
  `;
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
      <h1>Use Policy</h1>
      <ReactQuill
        theme='snow'
        value={text}
        onChange={setText}
        style={{minHeight: '300px'}}
        readOnly = {toggle}
      />    {admin && <div>
        {toggle ? <button onClick={toggleInput}>Edit</button> : <button onClick={handleUpdatedDone}>Update Changes</button>}
        </div>}
    </div>
  )
}

export default UsePolicy;