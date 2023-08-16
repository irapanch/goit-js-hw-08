
import Player from '@vimeo/player'; //імпортуємо й використовуємо клас Player для взаємодії з плеєром Vimeo
import throttle from 'lodash.throttle'; // імпортуємо й використовуємо функцію throttle для обмеження частоти виконання функції



const iframe = document.querySelector("#vimeo-player"); //елемент для відображення плеєра Vimeo
const player = new Player(iframe); //екземпляр плеєра Vimeo для керування відтворенням відео.


const saveTime = "videoplayer-current-time"; //ключ для доступу до поточного часу відтворення відео у локальному сховищі

const onPlay = function (data) {  //функція встановлює значення поточного часу відтворення в локальне сховище
  localStorage.setItem(saveTime, JSON.stringify(data.seconds));
};

const localTime = localStorage.getItem(saveTime); // отримуємо значення з локального сховища за допомогою ключа saveTime і зберігаємо його в змінній localTime

player.setCurrentTime(JSON.parse(localTime)) // міняємо поточний час відтворення плеєра на значення, яке було збережено в локальному сховищі

player.on('timeupdate', throttle(onPlay, 1000)); // функція throttle обмежує частоту викликів функції onPlay на кожну 1 секунду й викликається, коли час відтворення змінюється


