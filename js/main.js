// Gestion des sauvegardes
var journal = document.getElementById("journal");
if (localStorage.getItem("journal") != null){
    document.getElementById("journal").innerHTML = localStorage.getItem("journal");
    journal = document.getElementById("journal");
}

var argent = document.getElementById("argent");
if (localStorage.getItem("argent") != null){
    document.getElementById("argent").innerHTML = localStorage.getItem("argent");
    argent = document.getElementById("argent");
}

if (document.getElementById("argent").innerHTML>=0){
    document.getElementById("commentaire").innerHTML = "Tout va bien &#x1F911";
    document.getElementById("sante").className = "container-sm border text-center bg-success"
}
else {
    document.getElementById("commentaire").innerHTML = "C'est chaud là &#x1F975";
    document.getElementById("sante").className = "container-sm border text-center bg-danger"
}

// Fonction principale de traitement des opérations
function operation(){
    // Récupération des réponses du formulaire
    const form = document.getElementById("main");
    const formData = new FormData(form);

    // Ajout au tableau
    let newRow = journal.insertRow(2);
    for (let i = 0;i<=4;i++) {
        let newCell = newRow.insertCell(i);
        if (i == 0){
            let newText = document.createTextNode(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}));
            newCell.appendChild(newText);
        }
        if (i == 1){
            let typeOp = formData.get("gridRadios");
            if (typeOp=="option1"){
                let newText = document.createTextNode("Dépense");
                newCell.appendChild(newText);
            }
            else{
                let newText = document.createTextNode("Provision");
                newCell.appendChild(newText);
            }
        }
        if (i == 2){
            let typeOp = formData.get("gridRadios");
            if (typeOp=="option1"){
                let newText = document.createTextNode("-"+formData.get("montant"));
                newCell.appendChild(newText);
            }
            else{
                let newText = document.createTextNode("+"+formData.get("montant"));
                newCell.appendChild(newText);
            }
        }
        if (i == 3){
            let newText = document.createTextNode(formData.get("benef"));
            newCell.appendChild(newText);
        }
        if (i == 4){
            let justif = formData.get("gridRadiosset2");
            if (justif=="option3"){
                let newText = document.createTextNode("Oui");
                newCell.appendChild(newText);
            }
            else{
                let newText = document.createTextNode("Non");
                newCell.appendChild(newText);
            }
        }
    }

    // Mise à jour du montant du porte-monnaie
    let typeOp = formData.get("gridRadios");
    if (typeOp=="option1"){
        document.getElementById("argent").innerHTML = parseInt(document.getElementById("argent").innerHTML)-parseInt(formData.get("montant"));
    }
    else{
        document.getElementById("argent").innerHTML = parseInt(document.getElementById("argent").innerHTML)+parseInt(formData.get("montant"));
    }

    // Mise à jour du commentaire
    if (document.getElementById("argent").innerHTML>=0){
        document.getElementById("commentaire").innerHTML = "Tout va bien &#x1F911";
        document.getElementById("sante").className = "container-sm border text-center bg-success"
    }
    else {
        document.getElementById("commentaire").innerHTML = "C'est chaud là &#x1F975";
        document.getElementById("sante").className = "container-sm border text-center bg-danger"
    }


    // Sauvegardes dans le local storage
    localStorage.setItem("journal", document.getElementById("journal").innerHTML)
    localStorage.setItem("argent", document.getElementById("argent").innerHTML)
}

// Permet de régulariser le compte
function regularisation(){
    // Récupération de la réponse du formulaire
    const form = document.getElementById("regu");
    const formData = new FormData(form);
    let rep = formData.get("nombreRegu");
    if (rep == document.getElementById("argent").innerHTML){
        window.alert("Rien à changer chef !");
    }

    else if (rep<0) {
        window.alert("Tu peux pas avoir moins que 0€ sur toi quand même !");
    }

    else {
        let regu = parseInt(rep)-parseInt(document.getElementById("argent").innerHTML);
        // Ajout au tableau
        let newRow = journal.insertRow(2);
        for (let i = 0;i<=4;i++) {
            let newCell = newRow.insertCell(i);
            if (i == 0){
                let newText = document.createTextNode(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}));
                newCell.appendChild(newText);
            }
            if (i == 1){
                    let newText = document.createTextNode("Régularisation");
                    newCell.appendChild(newText);
            }
            if (i == 2){
                if (regu<0){
                    let newText = document.createTextNode(regu);
                    newCell.appendChild(newText);
                }
                else{
                    let newText = document.createTextNode("+"+regu);
                    newCell.appendChild(newText);
                }
            }
            if (i == 3){
                let newText = document.createTextNode("Moi");
                newCell.appendChild(newText);
            }
            if (i == 4){
                let newText = document.createTextNode("Non");
                newCell.appendChild(newText);
            }
        }

        // Mise à jour du montant du porte-monnaie
        document.getElementById("argent").innerHTML = rep;

        // Mise à jour du commentaire
        document.getElementById("commentaire").innerHTML = "Tout va bien &#x1F911";
        document.getElementById("sante").className = "container-sm border text-center bg-success"

        // Sauvegardes dans le local storage
        localStorage.setItem("journal", document.getElementById("journal").innerHTML)
        localStorage.setItem("argent", document.getElementById("argent").innerHTML)
        }
}

// Permet de supprimer les valeurs stockées dans le localStorage
function reinitialisation(){
    if (window.confirm("Voulez-vous vraiment supprimer la sauvegarde ?")){
        localStorage.removeItem("journal");
        localStorage.removeItem("argent");
        window.location.reload();
    }
}