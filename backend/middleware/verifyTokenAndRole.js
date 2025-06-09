import { getAuth } from '../services/firebase.js';

export const verifyTokenAndRole = (allowedRoles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = await getAuth().verifyIdToken(token);

      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        role: decodedToken.role || "client",
      };

      if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: "Acesso não autorizado" });
      }

      next();
    } catch (error) {
      console.error("Erro ao verificar token:", error.message);
      return res.status(401).json({ success: false, message: "Token inválido" });
    }
  };
};
