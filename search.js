$(document).ready(function() {
    // Soumission du formulaire de recherche
    $('#searchForm').submit(function(e) {
        e.preventDefault();

        // Récupération des valeurs des champs
        var nom = $('#nom').val();
        var prenom = $('#prenom').val();
        var email = $('#email').val();

        // Appel AJAX
        $.ajax({
            type: 'POST',
            url: 'search.php',
            data: {
                nom: nom,
                prenom: prenom,
                email: email
            },
            dataType: 'json',
            success: function(response) {
                // Affichage des résultats
                var resultsDiv = $('#results');
                resultsDiv.empty();

                if (Object.keys(response).length > 0) {
                    // Construction du tableau de résultats
                    var table = $('<table>');
                    var tableHeader = $('<tr>').append($('<th>').text('Nom'), $('<th>').text('Prénom'), $('<th>').text('Email'));
                    table.append(tableHeader);

                    $.each(response, function(index, item) {
                        var tableRow = $('<tr>').append($('<td>').text(item.nom), $('<td>').text(item.prenom), $('<td>').text(item.email));
                        table.append(tableRow);
                    });

                    resultsDiv.append(table);
                } else {
                    resultsDiv.text('Aucun résultat trouvé.');
                }
            }
        });
    });
});