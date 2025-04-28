import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRouteAd = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement

  useEffect(() => {
    const storedRole = localStorage.getItem("user");
    if (storedRole) {
      setRole(storedRole);
    }
    setIsLoading(false); // Fin du chargement
  }, []); // Le tableau de dépendances vide empêche les re-rendus infinis

  // Affichage d'un indicateur de chargement si les données ne sont pas encore prêtes
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Vérification de l'autorisation
  if (role === "admin") {
    return <Outlet />;
  }
alert("not authorized")
//   // Redirection si l'utilisateur n'est pas autorisé
return <Navigate to="/destinations" replace />;
};

export default ProtectedRouteAd;