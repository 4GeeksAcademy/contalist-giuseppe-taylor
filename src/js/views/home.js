import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const { obtenerContactos, agregarContacto, borrarContacto } = actions;

	useEffect(() => {
		const cargarContactos = async () => {
			const contactos = await obtenerContactos("alberto-agenda");
			console.log("revisandoerro", contactos);
		};
		cargarContactos();
	}, []);

	const submitForm = async (e) => {
		e.preventDefault();
		await agregarContacto({
			full_name: e.target.elements.nombre.value,
			email: e.target.elements.email.value,
			agenda_slug: "alberto-agenda",
			address: e.target.elements.direction.value,
			phone: e.target.elements.telefono.value,
		});
	};

	const eliminarContacto = async (contactoId) => {
		await borrarContacto(contactoId);
	};

	return (
		<>
			<div className="text-center mt-5">
				<li className="list-group-item">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
					>
						Agregar Contacto
					</button>
				</li>
				<ul className="list-group">
					<li className="list-group-item"></li>
					{store.contactos?.map((contact, index) => (
						<li key={index} className="list-group-item">
							<div className="row align-items-center">
								<div className="col-md-3">
									<img
										style={{ borderRadius: "80%" }}
										src="https://source.unsplash.com/random/300x200"
										className="card-img-top"
										alt="usuario"
									/>
								</div>
								<div className="col-md-6 text-center">
									<h1>{contact.full_name}</h1>
									<div>
										<h5>{contact.address}</h5>
										<h5>{contact.phone}</h5>
										<h5>{contact.email}</h5>
									</div>
								</div>
								<div className="col-md-3">
									<i className="bi bi-pencil icon-lg me-2"></i>
									<i onClick={() => eliminarContacto(contact.id)} className="bi bi-trash"></i>
								</div>
							</div>
						</li>
					))}

				</ul>
			</div>

			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Agregar Contacto
							</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form onSubmit={submitForm}>
								<input className="form-control" type="text" placeholder="Nombre" name="nombre" />
								<input className="form-control" type="text" placeholder="Telefono" name="telefono" />
								<input className="form-control" type="text" placeholder="Email" name="email" />
								<input className="form-control" type="text" placeholder="Direction" name="direction" />
								<button type="submit" className="btn btn-primary">
									Save changes
								</button>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};