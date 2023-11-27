<?php
$nom = $_POST['nom'];
$email = $_POST['email'];
$message = $_POST['message'];
$donnees = "Nom : $nom\nEmail : $email\nMessage : $message\n\n";
$cheminFichier = "data/messages.txt";
$destinataire = "stage@ctts.fr";
$sujet = "Nouveau message de $nom";
$entetes = "From: $nom <$email>";

// Écrire les données dans le fichier
file_put_contents($cheminFichier, $donnees, FILE_APPEND);

// Envoie du mail
mail($destinataire,$sujet,$donnees,$entetes);


// Redirection vers une page de confirmation ou de remerciement
header("Location: index.html");
?>