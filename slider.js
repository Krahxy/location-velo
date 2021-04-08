class Slider {
    constructor() {
        this.slide = new Array("images/diapo/diapo1new.png", "images/diapo/diapo2new.png", "images/diapo/diapo3new.png", "images/diapo/diapo4new.png");
        this.currentSlide = 0;
        this.imgBalise = document.getElementById('slide');
        this.playing = true; // De base la variable playing est sur true
        this.pauseButton = document.getElementById('pause'); // On récupère le bouton pause
        this.initEventListener();
    }
	
	// Initialisation du Slider
    initEventListener() {

        // Déclaration des éléments
        let directionLeft = document.getElementById('directionLeft'); // Récupère la flèche gauche
        let directionRight = document.getElementById('directionRight'); // Récupère la flèche droite

        // Déclaration des écoutes
        directionLeft.addEventListener('click', function() { // Action au moment du clic sur la flèche gauche
            this.nextSlide(-1);
        }.bind(this));
        directionRight.addEventListener('click', function() { // Action au moment du clic sur la flèche droite
            this.nextSlide(1);
        }.bind(this));
        document.addEventListener('keydown', function(e) { // Action au moment d'un clic sur la touche clavier < ou >
            if (e.keyCode === 37) {
                this.nextSlide(-1);
            } else if (e.keyCode === 39) {
                this.nextSlide(1);
            }
        }.bind(this));

        this.pauseButton.addEventListener('click', function() {
            if (this.playing) {
                this.pauseSlideshow();
            } else {
                this.playSlideshow();
            }
        }.bind(this));
    }

    // Déclenchement auto du slider
    runSlide() {
        this.runSlide = setInterval(function() {
            this.nextSlide(1);
        }.bind(this), 5000);
    }
	
	// Prochaine Slide
    nextSlide(sens) {
        this.currentSlide = this.currentSlide + sens;
        if (this.currentSlide < 0)
            this.currentSlide = this.slide.length - 1;
        if (this.currentSlide > this.slide.length - 1)
            this.currentSlide = 0;
        this.imgBalise.src = this.slide[this.currentSlide];
    }

    // Pause
    pauseSlideshow() {
        this.pauseButton.className = 'far fa-play-circle';
        this.playing = false;
        clearInterval(this.runSlide);
    }

    // Play
    playSlideshow() {
        this.pauseButton.className = 'far fa-pause-circle';
        this.playing = true;
        this.runSlide = setInterval(function() {
            this.nextSlide(1);
        }.bind(this), 5000);
    }
}