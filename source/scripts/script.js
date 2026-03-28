const menu = document.querySelector('.header__menu');
const nav = document.querySelector('nav');
const images = document.querySelectorAll('.gallery__image');

menu.addEventListener('click', showMenu);

for (let image of images) {
  image.addEventListener('click', showImage);
}

function showMenu() {
  nav.classList.toggle('show');
}

function showImage(img) {
  const body = document.querySelector('body');
  const overlay = document.createElement('div');
  overlay.classList.toggle('gallery__overlay');
  const image = document.createElement('img');
  image.src = img.target.dataset.highRes;
  image.alt = img.target.alt;
  image.width = 300;
  image.height = 200;
  image.loading = 'lazy';
  image.fetchPriority = 'high';
  image.decoding = 'async';
  overlay.appendChild(image);
  body.appendChild(overlay);
  overlay.onclick = function () {
    overlay.remove();
  };
}
