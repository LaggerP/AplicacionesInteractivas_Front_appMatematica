// Logica interna simulando ser un gestor de sesioses
const fakeAuth = {
   isAuthenticated: false,
   authenticate(cb) {
       this.isAuthenticated = true;
      localStorage.setItem('session', true);
      setTimeout(cb, 100); // fake async
   },

   signOut(cb) {
      this.isAuthenticated = false;
      localStorage.removeItem('session');
      localStorage.removeItem('sessionName');
      setTimeout(cb, 100);
   },

   isConnected(){
      return localStorage.getItem('session') ? true : false;
  },
};

export default fakeAuth

