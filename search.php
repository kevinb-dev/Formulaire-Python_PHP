<?php
// Chargement du fichier JSON
$data = json_decode(file_get_contents('data.json'), true);

// Récupération des valeurs de recherche
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$email = $_POST['email'];

// Filtrage des résultats en fonction des critères de recherche
$results = array_filter($data, function($item) use ($nom, $prenom, $email) {
    return (
        (empty($nom) || str_contains($item['nom'], $nom) !== false) &&
        (empty($prenom) || str_contains($item['prenom'], $prenom) !== false) &&
        (empty($email) || str_contains($item['email'], $email) !== false)
    );
});

// Envoi des résultats en tant que JSON
header('Content-Type: application/json');
echo json_encode($results);
