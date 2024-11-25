import {useState} from 'react';
import './App.css';
function App() {
  const heading=["Backlog","Inprogress","Done"];
  const [listarray,setListArray]=useState([
    {
    id:Math.random(),
    title:"Login Page Design",
    status:"Backlog"
  },
  {
    id:Math.random(),
    title:"Auth Page Design",
    status:"Inprogress"
  },
  {
    id:Math.random(),
    title:"Signup Page Design",
    status:"Backlog"
  },
  {
    id:Math.random(),
    title:"Dashborad Page Design",
    status:"Backlog"
  },
  {
    id:Math.random(),
    title:"JWT token",
    status:"Done"
  }]);
  const rendercoloum=(value)=>{
  const addtasklist=[];
    for(let index=0;index<listarray.length;index++){
    if(listarray[index].status == value){
      addtasklist.push(<><li onClick={()=>rechangetask(listarray[index].id)}className="users" key={listarray[index].id}>{listarray[index].title}<button className='deletebtn' onClick={()=>deletetask(listarray[index].id)}>x</button></li></>)
    }}
    return addtasklist;
  }
  const deletetask=(id)=>{
    const deletearry=listarray.filter((task)=>(
      task.id!=id
    ))
    setListArray(deletearry)
    setTextList("")
   
  };
  const [rechangetasklist,setRechangeTaskList]=useState("")
  const rechangetask=(id)=>{
    console.log("---id---",id);
    const editarry=listarray.filter((task)=>(
      task.id==id
    ))
    setTextList(editarry[0].title)
    setRechangeTaskList(editarry[0].id)
  };
  const [arraylist,setArrayList]=useState(false)
  const addtask=()=>{
      setArrayList(true)
  }
  const [textlist,setTextList]=useState("");
  const textautosave=(event)=>{   
    setTextList(event.target.value);
  }
  const [listerr,setListErr]=useState(false);
  const saveaddtask=()=>{
    const editid=rechangetasklist;
    if(textlist.length>0){
      let newtaskarray={
        id:Math.random(),
        title:textlist,
        status:"Backlog"
      };
      setListErr(false)
      console.log("-----textlist----",textlist);   
      setListArray([...listarray,newtaskarray]);

      if(!editid){
        let newtasklistarray=newtaskarray;
        setListArray([...listarray,newtasklistarray]);  
      }
      else{ 
            let newlistarray= listarray.map((task)=>
              task.id == editid ? {...task , title: textlist} : task
              )          
              setListArray(newlistarray);  
          }
    }
    else{
      setListErr(true)
    } 
    setTextList("")
    setRechangeTaskList()
  }
  const savecancletask=()=>{
    setArrayList(false)
  }
  return (
   <div className="contanier">
      {heading.map((data, index)=>(
         <div className="childnode" key ={index}>
           <h1 className="heading">{data}</h1>
           <ul className="listusers">
            {rendercoloum(data)}
           </ul>
          {data=="Backlog"  ? <button className="btn" onClick={addtask}>+</button>:""}
          {data=="Backlog" && arraylist==true ?<input type="text" value={textlist}id="textlist" className="listtext" onChange={textautosave}/>:""}
          {data=="Backlog" && arraylist==true ?<button className="btn" onClick={saveaddtask}>Save</button>:""}
          {data=="Backlog" && arraylist==true && listerr==true?<span id="listerr">Please Enter a AddList</span>:""}
          {data=="Backlog" && arraylist==true ?<button className="btn" onClick={savecancletask}>Cancel</button>:""}
         </div>
        ))}
   </div>
  )
}
export default App;
