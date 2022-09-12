import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../../config";





function EditorDetail() {

  const [data, setData] = useState([])
  const [editor, setEditor] = useState([])
  



  const getDetail =()=> {
    axios
    .get(API_BASE_URL+"/editorchoice/selectone", {params : {editorChoiceId : id}})
    .then(res=>{
      setData(res.data);
      console.log("detail"+res.data);
    })
  }

}