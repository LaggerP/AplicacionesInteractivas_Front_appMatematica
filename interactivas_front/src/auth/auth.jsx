// Logica interna simulando ser un gestor de sesiones


const fakeAuth = {
   isAuthenticated: false,
   authenticate(cb) {
      this.isAuthenticated = true;
      localStorage.setItem('session', true)
      setTimeout(cb, 100); // fake async
   },

   signOut(cb) {
      this.isAuthenticated = false;
      localStorage.removeItem('session')
      setTimeout(cb, 100);
   },

   isConnected(){
      if (localStorage.getItem('session')) {
          this.authenticated = true;
          return this.authenticated;
        } else {
          this.authenticated = false;
          return this.authenticated;
        }
  },
};


export default fakeAuth

