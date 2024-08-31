//esto es parte de la auntenticacion del usuario
(async () => {
    try {
    
     const { data } = await axios.get('/api/scheduleflex');
     

    } catch (error) {
        window.location.pathname = '/login'
    }
}) ();


