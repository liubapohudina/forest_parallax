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
    duration: 0.2, 
    ease: 'power2.out'
  });
});





const trails = document.querySelectorAll('.trail');


const positions = [];


trails.forEach(() => positions.push({ x: 0, y: 0 }));


window.addEventListener('mousemove', (event) => {
  const { clientX: mouseX, clientY: mouseY } = event;

  trails.forEach((trail, index) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 50 + 20; 
    const x = mouseX + Math.cos(angle) * radius;
    const y = mouseY + Math.sin(angle) * radius;

    gsap.to(positions[index], {
      x, y,
      duration: 0.8 + index * 0.05,
      ease: "power3.out",
      onUpdate: () => {
        gsap.set(trail, {
          x: positions[index].x - 7.5, 
          y: positions[index].y - 7.5
        });
      }
    });


    gsap.to(trail, {
      opacity: 0.6 - index * 0.05, 
      scale: 1 - index * 0.05,   
      duration: 1
    });
  });
});


