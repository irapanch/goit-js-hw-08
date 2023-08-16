
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);



const galleryList = document.querySelector('.gallery');

const gallery = galleryItems
  .map(
      item =>
      `<li class="gallery__item"><a class="gallery__link" href="${item.original}"><img class="gallery__image" src="${item.preview}"   alt="${item.description}" ></a></li>`
  )
  .join('');

galleryList.insertAdjacentHTML('beforeend', gallery);

let lightbox;
lightbox = new SimpleLightbox('.gallery a', {
  captionsData: "alt",  
  navText: ['&#128281;', '&#128284;'], 
  closeText: '&#128064;',
});