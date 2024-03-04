const verificar = (clave) => {
    
    if (clave.length < 8) {
      return false;
    }
  
    
    if (!/[a-z]/.test(clave) || !/[A-Z]/.test(clave)) {
      return false;
    }
  
    
    if (!/[!@#$%^&*(),.?":{}|<>0-9]/.test(clave)) {
      return false;
    }
  
    const palabrasComunes = ["password", "123456", "qwerty"];
    if (palabrasComunes.includes(clave.toLowerCase())) {
      return false;
    }
  
    
    return true;
  };

  export default verificar;