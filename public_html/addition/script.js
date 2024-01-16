function calculate() {
    // Récupérer les valeurs des champs

    var family1 = getFamily('1');
    var family2 = getFamily('2');
    var family3 = getFamily('3');

    var family = [family1, family2, family3];

    // Correction des valeurs impossible
    for (let index = 0; index < family.length; index++) {
        const element = family[index];
        if(element.members <0) {
            element.members = 0;
        }
        if(element.expenses <0) {
            element.expenses = 0;
        }
    }

    // Calculer le total dépensé
    const totalExpenses = family1.expenses + family2.expenses + family3.expenses;

    // Calculer le prix par personne
    const pricePerPerson = totalExpenses / (family1.members + family2.members + family3.members);

    // Calculer le prix devant être payé par chaque famille
    family1.payment = pricePerPerson * family1.members;
    family2.payment = pricePerPerson * family2.members;
    family3.payment = pricePerPerson * family3.members;

    // Calculer le solde de chaque famille

    family1.solde = family1.payment - family1.expenses
    family2.solde = family2.payment - family2.expenses
    family3.solde = family3.payment - family3.expenses

    // Affichage résultats globaux
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <p>Total dépensé : <b>${totalExpenses} €</b></p>
        <p>Prix par personne : <b>${pricePerPerson.toFixed(2)} €</b></p>
    `;

    // Affichage résultats famille 1
    const result1Element = document.getElementById('resultFamily1');
    result1Element.innerHTML = `
        <p>Doit payer : <b>${family1.payment.toFixed(2)} €</b></p>
        <p>Solde de : <b>${(family1.solde).toFixed(2)} €</b></p>
    `;
    // Affichage résultats famille 2
    const result2Element = document.getElementById('resultFamily2');
    result2Element.innerHTML = `
        <p>Doit payer : <b>${family2.payment.toFixed(2)} €</b></p>
        <p>Solde de : <b>${(family2.solde).toFixed(2)} €</b></p>
    `;
    // Affichage résultats famille 3
    const result3Element = document.getElementById('resultFamily3');
    result3Element.innerHTML = `
        <p>Doit payer : <b>${family3.payment.toFixed(2)} €</b></p>
        <p>Solde de : <b>${(family3.solde).toFixed(2)} €</b></p>
    `;


    // Remboursement de f3 par f1 et f2
    if(family1.solde >= 0 && family2.solde >= 0 && family3.solde <= 0) {
        const remboursementElement = document.getElementById('remboursement');
        remboursementElement.innerHTML = `
            <p>${family1.name} doit <b>${(family1.solde).toFixed(2)} €</b> à ${family3.name}</p>
            <p>${family2.name} doit <b>${(family2.solde).toFixed(2)} €</b> à ${family3.name}</p>
        `;
    }
    // Remboursement de f1 par f2 et f3
    if(family1.solde <= 0 && family2.solde >= 0 && family3.solde >= 0) {
        const remboursementElement = document.getElementById('remboursement');
        remboursementElement.innerHTML = `
            <p>${family2.name} doit <b>${(family2.solde).toFixed(2)} €</b> à ${family1.name}</p>
            <p>${family3.name} doit <b>${(family3.solde).toFixed(2)} €</b> à ${family1.name}</p>
        `;
    }
    // Remboursement de f2 par f1 et f3
    if(family1.solde >= 0 && family2.solde <= 0 && family3.solde >= 0) {
        const remboursementElement = document.getElementById('remboursement');
        remboursementElement.innerHTML = `
            <p>${family1.name} doit <b>${(family1.solde).toFixed(2)} €</b> à ${family2.name}</p>
            <p>${family3.name} doit <b>${(family3.solde).toFixed(2)} €</b> à ${family2.name}</p>
        `;
    }
    // Remboursement de f2 et f3 par f1
    if(family1.solde >= 0 && family2.solde <= 0 && family3.solde <= 0) {
        const remboursementElement = document.getElementById('remboursement');
        remboursementElement.innerHTML = `
            <p>${family1.name} doit <b>${(family2.solde/-1).toFixed(2)} €</b> à ${family2.name}</p>
            <p>${family1.name} doit <b>${(family3.solde/-1).toFixed(2)} €</b> à ${family3.name}</p>
        `;
    }
    // Remboursement de f1 et f3 par f2
    if(family1.solde <= 0 && family2.solde >= 0 && family3.solde <= 0) {
        const remboursementElement = document.getElementById('remboursement');
        remboursementElement.innerHTML = `
            <p>${family2.name} doit <b>${(family1.solde/-1).toFixed(2)} €</b> à ${family1.name}</p>
            <p>${family2.name} doit <b>${(family3.solde/-1).toFixed(2)} €</b> à ${family3.name}</p>
        `;
    }
    // Remboursement de f1 et f2 par f3
    if(family1.solde <= 0 && family2.solde <= 0 && family3.solde >= 0) {
        const remboursementElement = document.getElementById('remboursement');
        remboursementElement.innerHTML = `
            <p>${family3.name} doit <b>${(family1.solde/-1).toFixed(2)} €</b> à ${family1.name}</p>
            <p>${family3.name} doit <b>${(family2.solde/-1).toFixed(2)} €</b> à ${family2.name}</p>
        `;
    }
    // Pas de remboursement
    if(family1.solde == 0 && family2.solde == 0 && family3.solde == 0) {
        const remboursementElement = document.getElementById('remboursement');
        remboursementElement.innerHTML = `
        <p>Les comptes sont équilibrés, pas besoin de transaction.</p>
        `;
    }

    console.log("Family 1", "\nName:", family1.name, "\nMembers:", family1.members, "\nExpenses:", family1.expenses, "\nPayment:", family1.payment, "\nSolde:", family1.solde);
    console.log("Family 2", "\nName:", family2.name, "\nMembers:", family2.members, "\nExpenses:", family2.expenses, "\nPayment:", family2.payment, "\nSolde:", family2.solde);
    console.log("Family 3", "\nName:", family3.name, "\nMembers:", family3.members, "\nExpenses:", family3.expenses, "\nPayment:", family3.payment, "\nSolde:", family3.solde);
}


function getFamily(numero) {
    console.log('running getFamily.');
    const f = 'family' + numero;
    const m = 'members' + numero;
    const e = 'expenses' + numero;
    return {
        name: document.getElementById(f).value,
        members: parseInt(document.getElementById(m).value),
        expenses: parseFloat(document.getElementById(e).value),
        payment: 0,
        solde: 0
    }}