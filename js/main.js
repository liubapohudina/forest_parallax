window.addEventListener('scroll', () => {
  document.body.style.cssText += `--scrollTop: ${this.scrollY}px`;
});
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollTrigger.create({
  trigger: '.main-article',
});


ScrollSmoother.create({
  wrapper: '.wrapper',
  content: '.content',
});


const cursor = document.querySelector('.custom-cursor');

window.addEventListener('mousemove', (event) => {
  const { clientX: mouseX, clientY: mouseY } = event;

  gsap.to(cursor, {
    x: mouseX,
    y: mouseY,
    duration: 0.2, // Час анімації, щоб курсор слідував плавно
    ease: 'power2.out'
  });
});




// Знаходимо всі вогники
const trails = document.querySelectorAll('.trail');

// Масив позицій для вогників
const positions = [];

// Ініціалізуємо початкові позиції
trails.forEach(() => positions.push({ x: 0, y: 0 }));

// Відстежуємо курсор
window.addEventListener('mousemove', (event) => {
  const { clientX: mouseX, clientY: mouseY } = event;

  // Анімуємо кожен вогник з випадковою позицією навколо курсора
  trails.forEach((trail, index) => {
    const angle = Math.random() * Math.PI * 2; // випадковий кут для позиції навколо курсора
    const radius = Math.random() * 50 + 20; // випадковий радіус (відстань від курсора)
    const x = mouseX + Math.cos(angle) * radius;
    const y = mouseY + Math.sin(angle) * radius;

    gsap.to(positions[index], {
      x, y,
      duration: 0.8 + index * 0.05, // Більша затримка для плавності
      ease: "power3.out",
      onUpdate: () => {
        gsap.set(trail, {
          x: positions[index].x - 7.5, // корекція, щоб центр елемента був на позиції
          y: positions[index].y - 7.5
        });
      }
    });

    // Прозорість і розмір змінюються для кожного вогника
    gsap.to(trail, {
      opacity: 0.6 - index * 0.05, // поступове зникання
      scale: 1 - index * 0.05,     // менші вогники далі від курсора
      duration: 1
    });
  });
});


