import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const { obtenerContactos, agregarContacto, borrarContacto, actualizarContacto } = actions;
	const [currentContact, setCurrentContact] = useState();
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

		e.target.elements.nombre.value = "";
		e.target.elements.email.value = "";
		e.target.elements.direction.value = "";
		e.target.elements.telefono.value = "";
	};
	const editarContacto = async (e) => {
		console.log("editarContacto", currentContact)
		alert("editarContacto..Id", JSON.stringify(currentContact))


		await actualizarContacto(
			{
				full_name: e.target.elements.nombre.value,
				email: e.target.elements.email.value,
				agenda_slug: "alberto-agenda",
				address: e.target.elements.direction.value,
				phone: e.target.elements.telefono.value,
				id: currentContact.id
			}
		)
		alert("loqueseea")
	}
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
									<i data-bs-toggle="modal"
										data-bs-target="#modalActualizar" className="bi bi-pencil icon-lg me-2" onClick={() => setCurrentContact(contact)}></i>
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
			<div className="modal fade" id="modalActualizar" tabIndex="-1" aria-labelledby="modalActualizarLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modalActualizarLabel">
								Editar Contacto
							</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form onSubmit={editarContacto}>
								<input className="form-control" type="text" placeholder="Nombre" name="nombre" onChange={(e) => { setCurrentContact(prevState => ({ ...prevState, full_name: e.target.value })) }} value={currentContact?.full_name} />
								<input className="form-control" type="text" placeholder="Telefono" name="telefono" onChange={(e) => { setCurrentContact(prevState => ({ ...prevState, phone: e.target.value })) }} value={currentContact?.phone} />
								<input className="form-control" type="text" placeholder="Email" name="email" onChange={(e) => { setCurrentContact(prevState => ({ ...prevState, email: e.target.value })) }} value={currentContact?.email} />
								<input className="form-control" type="text" placeholder="Direction" name="direction" onChange={(e) => { setCurrentContact(prevState => ({ ...prevState, address: e.target.value })) }} value={currentContact?.address} />
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