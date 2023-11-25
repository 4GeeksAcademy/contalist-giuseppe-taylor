

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contactos:[],
		},
		actions: {
			agregarContacto:(nuevoContacto)=>{
               const contactos=getStore().contactos
			   console.log("errormaserror",contactos)
			   setStore({contactos:[...contactos, nuevoContacto]})
			},
			//...
			actualizarContacto:async(contacto)=>{
				try {
					const { apiFetchProtected } = getActions();
					const resp = await apiFetchProtected("/apis/fake/contact/"+ contacto.id, "PUT",  contacto );
						//console.log(resp)
					if (resp.code === 200) {
						// Actualiza el estado global con la nueva información del perfil
						const store = getStore()
						store.contactos.splice(contacto)
						setStore(store)
						alert("Perfil actualizado con exito")
						return "Ok"; // Puedes devolver los datos actualizados si es necesario
					} else {
						// La solicitud al servidor falló
						throw new Error("Error al procesar la solicitud de edición del perfil" + resp.code );
					}
					} catch (error) {
					  Error("Error al realizar la edición del perfil", error  );
					}
			},
			borrarContacto:async(contactoId)=>{
				try {
					const { apiFetchPublic } = getActions();
					const resp = await apiFetchPublic("/apis/fake/contact/"+ contactoId, "DELETE" );
						//console.log(resp)
					if (resp.code === 200) {
						// Actualiza el estado global con la nueva información del perfil
						const store = getStore()
						store.contactos.splice(contactoId)
						setStore(store)
						alert("Perfil actualizado con exito")
						return "Ok"; // Puedes devolver los datos actualizados si es necesario
					} else {
						// La solicitud al servidor falló
						throw new Error("Error al procesar la solicitud de edición del perfil" + resp.code );
					}
					} catch (error) {
					  Error("Error al realizar la edición del perfil", error  );
					}
				
			},
			obtenerContacto:async(contactoId)=>{
				try {
					const { apiFetchPublic } = getActions();
					const resp = await apiFetchPublic("/apis/fake/contact/"+ contactoId, "GET" );
						//console.log(resp)
					if (resp.code === 200) {
						// Actualiza el estado global con la nueva información del perfil
						const store = getStore()
						setStore({contactos:[resp.data]})
						return "Ok"; // Puedes devolver los datos actualizados si es necesario
					} else {
						// La solicitud al servidor falló
						throw new Error("Error al procesar la solicitud de edición del perfil" + resp.code );
					}
					} catch (error) {
					  Error("Error al realizar la edición del perfil", error  );
					}
			},
			obtenerContactos:async(agendaSlug)=>{
				try {
					const { apiFetchPublic } = getActions();
					const resp = await apiFetchPublic("/apis/fake/contact/agenda/"+ agendaSlug, "GET" );
						//console.log(resp)
					if (resp.code === 200) {
						// Actualiza el estado global con la nueva información del perfil
						console.log("flugerror",resp)
						setStore({contactos:resp.data})
						return "Ok"; // Puedes devolver los datos actualizados si es necesario
					} else {
						// La solicitud al servidor falló
						throw new Error("Error al procesar la solicitud de edición del perfil" + resp.code );
					}
					} catch (error) {
					  Error("Error al realizar la edición del perfil", error  );
					}
			},
			apiFetchPublic: async (endpoint, method = "GET", body = null) => {
				try {
					var request
					if (method == "GET") {
						request = fetch(process.env.BACKEND_URL + endpoint)
					} else {
						//objeto params con lo necesario para la petición que no es get
						const params = {
							method,
							headers: {
								"Content-Type": "application/json",
								"Access-Control-Allow-Origin": "*"
							}
						}
						//si hay body lo agregamos a los params
						if (body) params.body = JSON.stringify(body)
						request = fetch(process.env.BACKEND_URL + "/api" + endpoint, params)
					}
					//hacemos la petición
					const resp = await request
					//obtenemos los datos de la petición
					const data = await resp.json()
					//console.log("PRUEBA_fetchpublic" + JSON.stringify(data) + resp.status)
					return { code: resp.status, data }
				} catch (error) {
					console.log("Error al solicitar los datos", error)
				}
			},
			apiFetchProtected: async (endpoint, method = "GET", body = null) => {
				try {
					//objeto params con lo necesario para la petición que no es get
					//incluido token en encabezado de autorización
					const { accessToken } = getStore()
					if (!accessToken || accessToken == null) {
						return "No token"
					}
					const params = {
						method,
						headers: {
							"Authorization": "Bearer " + accessToken,
							"Access-Control-Allow-Origin": "*"
						}
					}
					//si hay body lo agregamos a los params
					if (body) {
						params.headers["Content-Type"] = "application/json",
							params.body = JSON.stringify(body)
					}
					//hacemos la petición
					const resp = await fetch(process.env.BACKEND_URL + "/api" + endpoint, params)
					//obtenemos los datos de la petición
					const data = await resp.json()
					//console.log("PRUEBA_fetchprotected" + JSON.stringify(data) + resp.status)
					return { code: resp.status, data }
				} catch (error) {
					console.log("Error al solicitar los datos", error)
				}
			},
			
			
	     
		}
	};
};

export default getState;

