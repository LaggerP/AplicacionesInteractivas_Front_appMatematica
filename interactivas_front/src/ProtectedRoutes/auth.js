// Logica interna simulando ser un gestor de sesioses
const fakeAuth = {
   isAuthenticated: false,
   authenticate() {
       this.isAuthenticated = true;
      localStorage.setItem('session', true);
   },
   signOut(cb) {
      this.isAuthenticated = false;
      sessionStorage.removeItem('sessionToken');
      setTimeout(cb, 100);
   },
   isConnected() {
      return sessionStorage.getItem('sessionToken') ? true : false;
  },
   getUser() {
      return localStorage.getItem('sessionName');
   }
};

export default fakeAuth

