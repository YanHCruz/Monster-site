// src/components/IntroScreen/IntroScreen.tsx
import './IntroScreen.css';

import { useEffect, useState, useCallback } from "react";
import { LogoNeon } from '../../components/LogoNeon/LogoNeon';

interface IntroScreenProps {
    onIntroFinished: () => void;
}

export function IntroScreen({ onIntroFinished }: IntroScreenProps) {
    const [loading, setLoading] = useState(true);
    const [subindo, setSubindo] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const iniciarSaida = useCallback(() => {
        if (loading || subindo) return;

        setSubindo(true);
        setTimeout(() => {
            onIntroFinished();
        }, 800);
    }, [loading, subindo, onIntroFinished]);

    useEffect(() => {
        if (loading) return;

        const lidarComScroll = (e: WheelEvent) => {
            if (e.deltaY > 0) iniciarSaida();
        }

        const lidarComTeclado = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === ' ') iniciarSaida();
        };

        let touchStart = 0;
        const lidarTouchStart = (e: TouchEvent) => {
            touchStart = e.touches[0].clientY;
        };
        const lidarTouchMove = (e: TouchEvent) => {
            const touchEnd = e.touches[0].clientY;
            if (touchStart - touchEnd > 30) iniciarSaida();
        };

        window.addEventListener('wheel', lidarComScroll);
        window.addEventListener('keydown', lidarComTeclado);
        window.addEventListener('touchstart', lidarTouchStart);
        window.addEventListener('touchmove', lidarTouchMove);

        return() => {
            window.removeEventListener('wheel', lidarComScroll);
            window.removeEventListener('keydown', lidarComTeclado);
            window.removeEventListener('touchstart', lidarTouchStart);
            window.removeEventListener('touchmove', lidarTouchMove);
        };
    }, [loading, iniciarSaida]);

    return (
        <div className={`intro-wrapper ${subindo ? 'subir-tela' : ''}`}>
            <div className='intro-content'>

                <div className={`intro-logo-bg ${loading ? 'escondido' : 'revelar-logo'}`}>
                    <LogoNeon />
                </div>

                <div className="intro-text-box">

                    <h1 className={`intro-title ${loading ? 'escondido' : 'animar-texto'}`}>
                        MONSTER
                    </h1>
                    <p className={`intro-subtitle ${loading ? 'escondido' : 'animar-sub'}`}>
                        UNLEASH THE BEAST
                    </p>
                    
                </div>

                <div className={`intro-footer ${loading ? 'escondido' : 'revelar-footer'}`}>
                    <span className='scroll-arrow'>↓</span>
                    <p>Role para baixo para sentir a energia</p>
                </div>

            </div>
        </div>
    );
}