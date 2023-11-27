<?php
// Récupérer les données du formulaire
$nom = $_POST['nom'];
$email = $_POST['email'];
$message = $_POST['message'];

// Format des données pour l'enregistrement
$donnees = "Nom : $nom\nEmail : $email\nMessage : $message\n\n";

// Chemin vers le fichier de sauvegarde
$cheminFichier = "data/messages.txt";

// Écrire les données dans le fichier
file_put_contents($cheminFichier, $donnees, FILE_APPEND);

// Redirection vers une page de confirmation ou de remerciement
header("Location: index.html");
?>