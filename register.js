function signature() {

    // Déclaration des variables.
    let canvas = document.getElementById('Signature');
    let context = canvas.getContext('2d');
    let pixels = [];
    let xyLast = {};
    let xyAddLast = {};
    let calculate = false;
    let sendBtn = document.getElementById("send_button");
    let formulaire = document.getElementById("formulaire");
    let divCanvas = document.getElementById("canvas");
    let alertDiv = document.getElementById('alert');
    let draw = 0;
    let reserver = document.getElementById('reserver');
    let effacerSignature = document.getElementById('effacerSignature');
    let stopReservation = document.getElementById('annulerReservation');
    let resDone = document.getElementById('reservationDone');
    let addressText = document.getElementById("address");

    // Détermination de la taille du canvas ainsi que le trait.
    canvas.width = 276;
    canvas.height = 180;
    context.fillStyle = '#FFF';
    context.strokeStyle = '#444';
    context.lineWidth = 1.5;
    context.lineCap = 'Round';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // EventListeners
    canvas.addEventListener("mousedown", down); // Ligne 66
    canvas.addEventListener('touchstart', down); // Ligne 66
    canvas.addEventListener('mousemove', move); // Ligne 80
    canvas.addEventListener('touchmove', move); // Ligne 80
    canvas.addEventListener("mouseup", up); // Ligne 112 
    canvas.addEventListener("touchend", up); // Ligne 112
    sendBtn.addEventListener('click', resVelo); // Ligne 138
    reserver.addEventListener('click', confirmedFunction); // Ligne 147
    effacerSignature.addEventListener('click', cleanSign); // Ligne 188
    stopReservation.addEventListener('click', annulerReservation); // Ligne 192

    // Fonction qui récupère les coordonnées du curseur
    function get_coords(e) {
        let x, y;
  
        if (e.changedTouches && e.changedTouches[0]) {
          let offsety = canvas.offsetTop || 0;
          let offsetx = canvas.offsetLeft || 0;
  
          x = e.changedTouches[0].pageX - offsetx;
          y = e.changedTouches[0].pageY - offsety;
        } else if (e.layerX || 0 == e.layerX) {
          x = e.layerX;
          y = e.layerY;
        } else if (e.offsetX || 0 == e.offsetX) {
          x = e.offsetX;
          y = e.offsetY;
        }
  
        return {
          x : x, y : y
        };
    };

    // Fonction au bouton de souris appuyé
    function down(e) {
        draw = 1;
        e.preventDefault();
        e.stopPropagation();
        empty = false;
        let xy = get_coords(e);
        context.beginPath();
        pixels.push('moveStart');
        context.moveTo(xy.x, xy.y);
        pixels.push(xy.x, xy.y);
        xyLast = xy;
    };

    // Fonction au mouvement de souris avec le clic enfoncé (draw == 1)
    function move(e, finish) {
        if (draw == 1) {

            e.preventDefault();
            e.stopPropagation();
        
            let xy = get_coords(e);
            let xyAdd = {
                x : (xyLast.x + xy.x) / 2,
                y : (xyLast.y + xy.y) / 2
            };
        
            if (calculate) {
                let xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
                let yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
                pixels.push(xLast, yLast);
            } else {
                calculate = true;
            }
        
            context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
            pixels.push(xyAdd.x, xyAdd.y);
            context.stroke();
            context.beginPath();
            context.moveTo(xyAdd.x, xyAdd.y);
            xyAddLast = xyAdd;
            xyLast = xy;
        }
        
    };

    // Fonction au bouton de souris levé
    function up(e) {
        draw = 0;
            context.stroke();
            pixels.push('e');
            calculate = false;
    };

    // Fonction pour vérifier si le formulaire est valide
    function validateForm() {

        let name = document.getElementById('name').value;
        console.log(name);

        let prename = document.getElementById('prename').value;
        console.log(prename);

        if (name == "" || prename == "") { // Si invalide
          alertDiv.innerHTML = "Les champs du formulaire doivent être complétés, veuillez indiquer votre nom et prénom.";
        return false;

        } else {
        return true;
        }
    };

    // Fonction pour réserver un vélo si le formulaire est valide
    function resVelo() {
        let formulaireValide = validateForm();
        if (formulaireValide == true) {
            formulaire.style.display = "none";
            divCanvas.style.display = "block";
            alertDiv.innerHTML = "Signez pour confirmer la réservation de votre vélo.";
        }
    };

    function confirmedFunction() {
        divCanvas.style.display = "none";
        resDone.style.display = "block";
        station_datas.style.display = "none";
        alertDiv.innerHTML = "Votre vélo est réservé.";

        localStorage.setItem('Nom', document.getElementById('name').value);
        localStorage.setItem('Prénom', document.getElementById('prename').value);
        sessionStorage.setItem('Adresse', addressText.textContent);
        
        // On démarre le timer
        timer.setData(20, 0, 'countDown');
        timer.runTimer();

        // On récupère l'adresse du storage
        let addressSlot = sessionStorage.getItem("Adresse");
        if (sessionStorage.getItem("Adresse") === null) {
            console.log("Pas d'adresse de stockée");
        } else {
            addressInfo.innerHTML = addressSlot;
        }

        // On récupère le nom au storage
        let nameSlot = localStorage.getItem("Nom");
        if (localStorage.getItem("Nom") === null) {
            console.log("Pas de nom stocké");
        } else {
            nameInfo.innerHTML = nameSlot;
        }

        // On récupère le prénom au storage
        let prenameSlot = localStorage.getItem("Prénom");
        if (localStorage.getItem("Prénom") === null) {
            console.log("Pas de prénom stocké");
        } else {
            prenameInfo.innerHTML = prenameSlot;
        }

    };

    // Fonction pour effacer la signature
    function cleanSign() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    function annulerReservation() {
        sessionStorage.clear();
        timer.stop();
        alertDiv.innerHTML = "Vous avez annulé votre réservation";
        formulaire.style.display = "flex";
        station_datas.style.display = "block";
        resDone.style.display = "none";
    };
    
}