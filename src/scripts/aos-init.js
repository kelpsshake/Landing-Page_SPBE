import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: false, // animasi hanya sekali saat pertama scroll
  });
});
