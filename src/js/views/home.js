import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const{store, actions}=useContext(Context)
	const {obtenerContactos,agregarContacto}=actions;

	
	
	useEffect(()=>{
	
		const cargarContactos=async()=>{
			const contactos=await obtenerContactos("alberto-agenda")
			console.log("revisandoerro",contactos)
			
			
		}
		 cargarContactos();
		
	},[])

	const submitForm= async (e)=>{
		e.preventDefault()
		
		await agregarContacto({
			"full_name": e.target.elements.nombre.value,
			"email": e.target.elements.email.value,
			"agenda_slug": "alberto-agenda",
			"address":e.target.elements.direction.value,
			"phone":e.target.elements.telefono.value
		}
   )
	}
	return(
	<div className="text-center mt-5">
		<h1>Hello Rigo!</h1>
		<ul className="list-group">
          <li className="list-group-item">
            <form onSubmit={submitForm}>
              <input className="form-control" type="text" placeholder="Nombre" name="nombre"/>
			  <input className="form-control" type="text" placeholder="Telefono" name="telefono"/>
			  <input className="form-control" type="text" placeholder="Email" name="email"/>
			  <input className="form-control" type="text" placeholder="Direction" name="direction"/>
			  <button type="submit" className="btn btn-success">Add Contact</button>
			</form>
		  </li>
		  {store.contactos?.map((contact,index)=>(<li key={index}className="list-group-item">
			<h1>{contact.agenda_slug}</h1>
			{contact.address}
			</li>))}
		</ul>

	
	</div> 
)}
