// Main logique de l'application
let slider = new Slider();
slider.runSlide();

let timer = new Timer();

window.onload = function() {
	// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
	initMap();
	signature();

	// On récupère le minuteur
	let minutesSlot = sessionStorage.getItem("minutes");
	let secondsSlot = sessionStorage.getItem("seconds");

	if (sessionStorage.getItem("minutes") === null) {
		console.log('Pas de minutes stockées');
	} else {
		timer.setData(parseInt(minutesSlot), parseInt(secondsSlot), 'countDown');
		timer.runTimer();
	};

	// On récupère l'adresse du storage
	let addressSlot = sessionStorage.getItem("Adresse");
	let alertDiv = document.getElementById('alert');
	if (sessionStorage.getItem("Adresse") === null) {
		console.log("Pas d'adresse de stockée");
	} else {
		alertDiv.style.display = "none";
		reservationDone.style.display = "block";
		addressInfo.innerHTML = addressSlot;
	}

	// On récupère le nom au storage
	let nameSlot = localStorage.getItem("Nom");
	if (localStorage.getItem("Nom") === null) {
		console.log("Pas de nom stocké");
	} else {
		nameInfo.innerHTML = nameSlot;
		document.getElementById('name').value = nameSlot;
	}

	// On récupère le prénom au storage
	let prenameSlot = localStorage.getItem("Prénom");
	if (localStorage.getItem("Prénom") === null) {
		console.log("Pas de prénom stocké");
	} else {
		prenameInfo.innerHTML = prenameSlot;
		document.getElementById('prename').value = prenameSlot;
	}

};