import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {profile} from "../src/services/authservice"
import {
    FaTachometerAlt,
    FaDisease,
    FaUserInjured,
    FaMoneyBill,
    FaCalendarCheck,
    FaHandHoldingUsd,
    FaUserPlus,
    FaSignOutAlt,
} from 'react-icons/fa'; // Importation des icônes
import './Navbar.css';

const Navbar = () => {
    const [name, setName] = useState(localStorage.getItem('userName') || ''); // Récupère le nom de l'utilisateur stocké

    useEffect(() => {
        if (!name) { // Si le nom n'est pas déjà défini, récupérez-le depuis le backend
            profile()
                .then((response) => {
                    console.log("Profile Response:", response); // Vérifiez la structure de la réponse
                    if (response.data && response.data.name) {
                        const userName = response.data.name;
                        setName(userName); // Met à jour le state local
                        localStorage.setItem('userName', userName); // Stocke le nom dans localStorage
                    } else {
                        setName('Inconnu'); // Définit une valeur par défaut si aucun nom n'est trouvé
                    }
                })
                .catch((error) => {
                    console.error('Error fetching profile:', error);
                });
        }
    }, [name]); // Dépendance name pour éviter de recharger inutilement

    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h2>Docteur {name || 'Inconnu'}</h2> {/* Affiche le nom ou "Inconnu" */}
            </div>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard" className="menu-item">
                        <FaTachometerAlt className="menu-icon" /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/voyages" className="menu-item">
                        <FaDisease className="menu-icon" /> voyagess
                    </Link>
                </li>
                <li>
                    <Link to="/patientsad" className="menu-item">
                        <FaUserInjured className="menu-icon" /> Patients
                    </Link>
                </li>
                <li>
                    <Link to="/depenses" className="menu-item">
                        <FaMoneyBill className="menu-icon" /> Dépenses
                    </Link>
                </li>
                <li>
                    <Link to="/rendezVousad" className="menu-item">
                        <FaCalendarCheck className="menu-icon" /> Rendez-Vous
                    </Link>
                </li>
                <li>
                    <Link to="/revenues" className="menu-item">
                        <FaHandHoldingUsd className="menu-icon" /> Revenues
                    </Link>
                </li>
                <li>
                    <Link to="/register" className="menu-item">
                        <FaUserPlus className="menu-icon" /> Ajouter Sécretaire
                    </Link>
                </li>
                <li>
                    <Link to="/logout" className="menu-item">
                        <FaSignOutAlt className="menu-icon" /> Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;