const verificar = (contraseña) => {
    
    if (contraseña.length < 8) {
      return false;
    }
  
    
    if (!/[a-z]/.test(contraseña) || !/[A-Z]/.test(contraseña)) {
      return false;
    }
  
    
    if (!/[!@#$%^&*(),.?":{}|<>0-9]/.test(contraseña)) {
      return false;
    }
  
    const palabrasComunes = ["password", "123456", "qwerty"];
    if (palabrasComunes.includes(contraseña.toLowerCase())) {
      return false;
    }
  
    
    return true;
  };

  export default verificar;