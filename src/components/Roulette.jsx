import React, { useEffect, useRef } from 'react';
import './../styles/roulette.css'
import Logo from '../assets/logoGilo.png'

function Roulette({users}) {
  // const sectors = [
  //   { color: '#DC84F3', label: 'OrlandoGN' },
  //   { color: '#0bf', label: 'yeiandjake' },
  //   { color: '#0b2', label: 'Success47tv' },
  //   { color: '#f82', label: 'ElCochinomg' },
  //   { color: '#FF6868', label: 'Lechuga_Numeritos' },
  //   { color: '#FFBB64', label: 'ElMocsi' },
  //   { color: '#83C0C1', label: 'ElFurro' },
  //   // ... otros sectores ...
  // ];
  const isUsersEmpty = Object.keys(users).length === 0;
  const sectors = isUsersEmpty ? [{ color: '#9d25fe', label: ''}] : users

  // useEffect(() => {
  //   // Lógica que se ejecutará cuando `users` cambie
  //   console.log('La prop users ha cambiado:', users);
    
  //   // Aquí puedes añadir cualquier lógica adicional que necesites
  //   // para manejar el cambio en la prop `users`

  // }, [sectors]);

  
  console.log(isUsersEmpty)
  console.log(sectors)
  console.log(users)
  
  const canvasRef = useRef(null);
  const spinRef = useRef(null);

  const rand = (m, M) => Math.random() * (M - m) + m;
  const friction = 0.995; // 0.995=soft, 0.99=mid, 0.98=hard

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dia = canvas.width;
    const rad = dia / 2;
    const PI = Math.PI;
    const TAU = 2 * PI;
    const arc = TAU / sectors.length;
    let angVel = 0; // Angular velocity
    let ang = 0; // Angle in radians

    const getIndex = () => Math.floor(sectors.length - (ang / TAU) * sectors.length) % sectors.length;

    function drawSector(sector, i) {
      const angle = arc * i;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = sector.color;
      ctx.moveTo(rad, rad);
      ctx.arc(rad, rad, rad, angle, angle + arc);
      ctx.lineTo(rad, rad);
      ctx.fill();
      ctx.translate(rad, rad);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(sector.label, rad - 10, 10);
      ctx.restore();
    }

    function rotate() {
      const sector = sectors[getIndex()];
      canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
      // spinRef.current.innerHTML = sector.label;
      spinRef.current.style.background = sector.color;
    }

    function frame() {
      if (!angVel) return;
      angVel *= friction; // Decrement velocity by friction
      if (angVel < 0.002) angVel = 0; // Bring to stop
      ang += angVel; // Update angle
      ang %= TAU; // Normalize angle
      rotate();
    }

    function engine() {
      frame();
      requestAnimationFrame(engine);
    }

    sectors.forEach((sector, i) => drawSector(sector, i));
    engine(); // Start engine

    const spin = () => {
      if (!angVel) angVel = rand(0.25, 0.45);
    };

    spinRef.current.addEventListener('click', spin);

    return () => {
      spinRef.current.removeEventListener('click', spin);
    };
  }, [users]);

  return (
    <div id="wheelOfFortune">
      <canvas ref={canvasRef} id="wheel" width="500" height="500"></canvas>
      <div ref={spinRef} id="spin"> 
        <img className="wheelLogo" src={Logo} alt="Logo" />
      </div>
  </div>
  );
}

export default Roulette;