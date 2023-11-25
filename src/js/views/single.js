import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const {theid} = useParams();

	useEffect(()=>{
		if(theid){
			console.log("Elemento: " + theid)
		}else{
			console.log("Elemento nuevo")
		}
      
	},[theid])

	return (
		<div className="jumbotron">
			<h1 className="display-4">This will show the demo element: {theid || "Elemento nuevo"}</h1>

			<hr className="my-4" />

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};

/*store.demo[theid].title*/