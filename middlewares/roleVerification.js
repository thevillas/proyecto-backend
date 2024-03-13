export const requireRole = roles => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      console.log(req.user)
      return res.status(403).json({ mensaje: "No tienes permiso para realizar esta acción" });
      
    }
    
    next();
  };
};