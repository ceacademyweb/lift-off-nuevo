const isMobile = () => {
  let navi =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i) ||
    window.innerWidth <= 780
      ? true
      : false;
  return navi;
};
// console.log(isMobile());

isMobile()
  ? document.documentElement.classList.add('isMobile')
  : document.documentElement.classList.add('isdesktop');

window.addEventListener('resize', () => {
  if (isMobile()) {
    document.documentElement.classList.add('isMobile');
    document.documentElement.classList.remove('isdesktop');
  } else {
    document.documentElement.classList.remove('isMobile');
    document.documentElement.classList.add('isdesktop');
  }
});

const totop = document.getElementById('totop');
const Logo = document.getElementById('Logo');
const Header = document.getElementById('main-header');
const screenHeight = window.innerHeight;
const headerHeight = getComputedStyle(
  document.documentElement
).getPropertyValue('--header-height');
if (window.matchMedia('(min-width: 1024px)').matches) {
}

// console.log(headerHeight);
totop.addEventListener('click', (e) => {
  e.preventDefault();
  toTop();
});
Logo.addEventListener('click', (e) => {
  e.preventDefault();
  toTop();
});

window.addEventListener('scroll', (e) => {
  let scrollTop = window.scrollY;
  if (scrollTop >= screenHeight * 0.5) {
    totop.classList.add('show');
    // if (window.matchMedia('(min-width: 1024px)').matches) {
    //   document.documentElement.style.setProperty(
    //     '--header-height',
    //     headerHeight
    //   );
    // }
  } else {
    totop.classList.remove('show');
    // document.documentElement.style.setProperty('--header-height', headerHeight);
  }
});

function toTop() {
  location.hash = '';
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

AOS.init({
  startEvent: 'load',
  easing: 'ease-out-back',
  duration: 850,
  // startEvent: 'DOMContentLoaded',
  useClassNames: true,
  // once: true,
});
