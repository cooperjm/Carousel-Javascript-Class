class Carousel {
	constructor(container, imagesArray) {
		this.count = 0;
		this.container = container;
		this.imagesArray = imagesArray;
		this.numberOfImages = this.imagesArray.length;
		this.allImages = [];

		this.init();
	}

	countAdd() {
		this.count++;
		if (this.count > this.numberOfImages - 1) {
			this.count = 0;
		}
		return this.count;
	}

	countMinus() {
		this.count--;
		if (this.count < 0) {
			this.count = this.numberOfImages - 1;
		}
		return this.count;
	}

	createContainer() {
		this.carouselContainer = document.createElement('DIV');
		this.carouselContainer.style.position = 'relative';
		this.carouselContainer.classList.add('cc');
		this.container.appendChild(this.carouselContainer);
		console.log('Carousel Container Created');
	}

	createImages() {
		// Create container for the images containers
		const imagesContainer = document.createElement('DIV');
		imagesContainer.style.width = '100%';
		imagesContainer.classList.add('ic');
		this.imagesArray.forEach((image) => {
			// Create the container for individual images
			const singleImageContainer = document.createElement('DIV');
			singleImageContainer.style.cssText = `
				display: none;
				place-items: center;
				width: 80%;
    		margin: 0 auto;
			`;
			// Create Image element
			const singleImage = document.createElement('IMG');
			singleImage.style.maxWidth = '100%';
			singleImage.src = image;
			// Placing reference to the images in class property
			this.allImages.push(singleImageContainer);
			// Append Everything
			singleImageContainer.appendChild(singleImage);
			imagesContainer.appendChild(singleImageContainer);
		});
		this.carouselContainer.appendChild(imagesContainer);
		// Only first image displayed
		this.allImages[this.count].style.display = 'grid';
		console.log('Carousel Images Created');
	}

	createArrows() {
		// Create container for arrows
		const arrowsContainer = document.createElement('DIV');
		arrowsContainer.classList.add('ac');
		arrowsContainer.style.cssText = `
			position: absolute;
			inset: 0;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-pack: justify;
			-ms-flex-pack: justify;
			justify-content: space-between;
		`;
		// Create arrows
		const arrowCSS = `
			background: transparent;
			border: none;
			outline: none;
			font-size: clamp(35px, 13vw, 90px);
			color: hsl(0, 0%, 50%);
			cursor: pointer;
			-webkit-transition: text-shadow 200ms ease-in, -webkit-transform 200ms ease-in-out;
			transition: text-shadow 200ms ease-in, -webkit-transform 200ms ease-in-out;
			-o-transition: text-shadow 200ms ease-in, transform 200ms ease-in-out;
			transition: text-shadow 200ms ease-in, transform 200ms ease-in-out;
			transition: text-shadow 200ms ease-in, transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;
		`;
		const leftArrow = document.createElement('BUTTON');
		leftArrow.style.cssText = arrowCSS;
		leftArrow.innerHTML = '&#x2039;';
		leftArrow.addEventListener('click', (event) => {
			this.allImages.forEach((image) => {
				image.style.display = 'none';
			});
			this.allImages[this.countMinus()].style.display = 'grid';
		});
		leftArrow.addEventListener('mousedown', (event) => {
			leftArrow.style.transform = 'scale(0.8)';
		});
		leftArrow.addEventListener('mouseup', (event) => {
			leftArrow.style.transform = 'scale(1)';
		});

		const rightArrow = document.createElement('BUTTON');
		rightArrow.style.cssText = arrowCSS;
		rightArrow.innerHTML = '&#x203A;';
		rightArrow.addEventListener('click', (event) => {
			this.allImages.forEach((image) => {
				image.style.display = 'none';
			});
			this.allImages[this.countAdd()].style.display = 'grid';
		});
		rightArrow.addEventListener('mousedown', (event) => {
			rightArrow.style.transform = 'scale(0.8)';
		});
		rightArrow.addEventListener('mouseup', (event) => {
			rightArrow.style.transform = 'scale(1)';
		});

		arrowsContainer.append(leftArrow, rightArrow);
		this.carouselContainer.appendChild(arrowsContainer);
		console.log('Carousel Controls Created');
	}

	init() {
		console.log('Carousel Init');
		this.createContainer();
		this.createImages();
		this.createArrows();
	}
}
