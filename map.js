// Initialisation : latitude / longitude (Lyon)
let lat = 45.764043;
let lon = 4.835659;
let macarte = null;
let markers = []; // Nous initialisons la liste des marqueurs
let iconBase = 'images/';
let stationsMapList = new Object();
let stationText = document.getElementById("station");
let addressText = document.getElementById("address");
let capacityText = document.getElementById("capacity");
let availableBikesText = document.getElementById("availableBikes");
let statusText = document.getElementById("status");


// Fonction d'Initialisation
function initMap() {
	
	const request = new XMLHttpRequest(); // Lancement de la requête
    request.open("GET", "https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=22cddca83dce94798f157ab7ea947bcf823a16a5"); // On récupère l'adresse de l'API
	request.send(); // On envoi la requête

    request.onreadystatechange = function() { // On attend un edit du status, retour de requête.
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { // On check si les données renvoyées soient complètes avec le status " 200 " (valide), 400 : error.
			
			// Déclaration de la liste des stations
			let stations = JSON.parse(this.responseText); // On récupère les données en format json afin quelle soit " lisible en objet "
			
			// Ici on parcours les 6 types de données que l'on a besoin depuis le 'stations' fournis par JCDécaux. (latitude, longitude, adresse, capacité max et vélo disponible et le status)
			for (let i = 0; i < stations.length; i++) { // On boucle sur la liste des stations pour récupérer les données propres à chaque stations.
				stationsMapList[stations[i].name] = {
					"lat": 			stations[i].position.latitude,
					"lon": 			stations[i].position.longitude,
					"address" :		stations[i].address,
					"capacity" : 	stations[i].mainStands.capacity,
					"bikes" : 		stations[i].mainStands.availabilities.bikes,
					"status" : 		stations[i].status 
				};
			}
	
			macarte = L.map('map').setView([lat, lon], 11); // Création de "macarte" que l'on insère dans l'élément HTML qui a l'ID "map" (DOC)
			markerClusters = L.markerClusterGroup(); // Initialisation des groupes de marqueurs (DOC)

			// Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
			L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
				// Il est toujours bien de laisser le lien vers la source des données
				attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
				minZoom: 1,
				maxZoom: 20
			}).addTo(macarte);
			
			// Nous parcourons la liste des villes
			for (station in stationsMapList) {
				// Nous définissons l'icône à utiliser pour le marqueur, sa taille affichée (iconSize), sa position (iconAnchor) et le décalage de son ancrage (popupAnchor)
				let myIcon = L.icon({
					iconUrl: iconBase + "bike-map-markers.png",
					iconSize: [50, 50],
					iconAnchor: [25, 50],
					popupAnchor: [-3, -76],
				});
				
				// On ajoute nos données personnalisées des marqueurs (nom station, adresse, capacité & vélo(s) disponible(s)).
				let markerOptions = {
					station: station,
					address: stationsMapList[station].address,
					capacity: stationsMapList[station].capacity,
					bikeAvailable: stationsMapList[station].bikes,
					status: stationsMapList[station].status,
					clickable: true,
					icon: myIcon,
				}
				
				let marker = L.marker([stationsMapList[station].lat, stationsMapList[station].lon], markerOptions );
				
				// marker.bindPopup("<strong>"+station+"<\strong><p>"+stationsMapList[station].address+"</p>");
				marker.on('click', onClickMarker);
				markerClusters.addLayer(marker); // Nous ajoutons le marqueur aux groupes
		        markers.push(marker); // Nous ajoutons le marqueur à la liste des marqueurs
			}

			let group = new L.featureGroup(markers); // Nous créons le groupe des marqueurs pour adapter le zoom
			macarte.addLayer(markerClusters); // On ajoute tous les groupes de marqueur à la carte
        }
    };
}

function onClickMarker(e) {  // La fonction qui détermine ce qu'on récupère sur les marqueurs.
   
   document.getElementById("station_datas").style.display="block";
   document.getElementById("alert").innerHTML = "Renseignez vos informations";
   stationText.innerHTML = e.target.options.station;
   addressText.innerHTML = e.target.options.address;
   capacityText.innerHTML = e.target.options.capacity;
   availableBikesText.innerHTML = e.target.options.bikeAvailable;
   statusText.innerHTML = e.target.options.status;
}