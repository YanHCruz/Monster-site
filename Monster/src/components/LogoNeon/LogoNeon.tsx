// src/components/LogoNeon/LogoNeon.tsx
import './LogoNeon.css';
import logoMonster from '../../assets/monster-energy-drink-seeklogo.png';

export function LogoNeon() {
  return (
    <div className="logo-neon-container">
      <img src={logoMonster} alt="Logo Monster Energy" className="logo-base" />
      <img src={logoMonster} alt="" className="logo-glow" aria-hidden="true" />
    </div>
  );
}