import {React, useState} from 'react';
import styles from './privacy.module.css'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const DMCAPage = ()=>{
  const name = "MusicArchive.inc"
      const notice = `${name} respects the intellectual property rights of others. \n Per the DMCA, ${name} will respond expeditiously to claims of copyright infringement on the Site if submitted to ${name}'s Copyright Agent as described below. \n Upon receipt of a notice alleging copyright infringement, ${name} will take whatever action it deems appropriate within its sole discretion, including removal of the allegedly infringing materials and termination of access for repeat infringers of copyright protected content.

      If you believe that your intellectual property rights have been violated by ${name} or by a third party who has uploaded materials to our website, please provide the following information to the designated Copyright Agent listed below:
      
      A description of the copyrighted work or other intellectual property that you claim has been infringed;
      A description of where the material that you claim is infringing is located on the Site;
      An address, telephone number, and email address where we can contact you and, if different, an email address where the alleged infringing party, if not ${name}, can contact you;
      A statement that you have a good-faith belief that the use is not authorized by the copyright owner or other intellectual property rights owner, by its agent, or by law;
      A statement by you under penalty of perjury that the information in your notice is accurate and that you are the copyright or intellectual property owner or are authorized to act on the owner's behalf;
      Your electronic or physical signature.
      ${name} may request additional information before removing any allegedly infringing material. In the event ${name} removes the allegedly infringing materials, ${name} will immediately notify the person responsible for posting such materials that ${name} removed or disabled access to the materials. ${name} may also provide the responsible person with your email address so that the person may respond to your allegations.`; 


        const [toggle, setToggle] = useState(true);
        const [text, setText] = useState(notice);

  function toggleInput() {

    //Add admin authentication here, this way it will only allow the admin to edit the notice, or add conditional statement to button below
    setToggle(false);
  }

  const handleUpdatedDone =() => {
    setToggle(true);
    
}

  return (
    <div className={styles.App}>
      <h1>DMCA Notice</h1>
            <ReactQuill
        theme='snow'
        value={text}
        onChange={setText}
        style={{minHeight: '300px'}}
        readOnly = {toggle}
      />
            {toggle ?<button onClick={toggleInput}>Edit</button>:<button onClick={handleUpdatedDone}>Update Changes</button>}
    </div>
  )
}

export default DMCAPage;