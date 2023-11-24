import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const{store, actions}=useContext(Context)
	const [inputText, setInputText]=useState("")
	useEffect(()=>{
		console.log("Todos actualizados")
	},[store.todos])

	/*function agregarTodo(){
		actions.agregarTodo(inputText)
	}*/
	return(
	<div className="text-center mt-5">
		<h1>Hello Rigo!</h1>
		<ul className="list-group">
          <li>
			<input className="list-group-item" type="text" onChange={(e)=>setInputText(e.target.value)} value={inputText}/>
		  </li>
		  {store.todos.map((todo,index)=>(<li key={index}className="list-group-item">{todo}</li>))}
		  <li><button onClick={e=>actions.agregarTodo(inputText)} className="btn btn-success">agregar</button></li>
		</ul>
		<a href="#" className="btn btn-success">
			If you see this green button, bootstrap is working
		</a>
	</div>
)}
