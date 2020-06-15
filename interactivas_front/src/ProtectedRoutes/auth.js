// Logica interna simulando ser un gestor de sesioses
const fakeAuth = {
   isAuthenticated: false,
   authenticate() {
       this.isAuthenticated = true;
      localStorage.setItem('session', true);
   },
   signOut(cb) {
      this.isAuthenticated = false;
      localStorage.removeItem('session');
      localStorage.removeItem('sessionName');
      setTimeout(cb, 100);
   },
   isConnected() {
      return localStorage.getItem('session') ? true : false;
  },
   getUser() {
      return localStorage.getItem('sessionName');
   }
};

export default fakeAuth

