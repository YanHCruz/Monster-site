import './Carousel.css';

import { useState } from 'react';
import lataPreta from '../../assets/Monster-projeto-sem-fundo.png';
import lataBranca from '../../assets/Latinha branca - sem fundo.png';
import lataRosa from '../../assets/Latinha rosa - sem fundo.png';

interface CarouselProps {
  onTemaChange: (tema: string) => void;
}

export function Carousel({ onTemaChange }: CarouselProps) {
  const [posicoes, setPosicoes] = useState(['lata-esq', 'lata-centro', 'lata-dir']);

  const girarCarrossel = (clique: 'esq' | 'dir') => {
    setPosicoes((estadoAtual) => {
      let novasPosicoes: string[] = [];

      if (clique === 'esq') {
        novasPosicoes = [estadoAtual[1], estadoAtual[2], estadoAtual[0]];
      } else {
        novasPosicoes = [estadoAtual[2], estadoAtual[0], estadoAtual[1]];
      }

      // Verifica qual lata ficou com a classe 'lata-centro' para trocar o fundo
      if (novasPosicoes[0] === 'lata-centro') onTemaChange('tema-rosa');
      if (novasPosicoes[1] === 'lata-centro') onTemaChange('tema-verde');
      if (novasPosicoes[2] === 'lata-centro') onTemaChange('tema-branco');

      return novasPosicoes;
    });
  };

  // Função auxiliar para saber em qual posição a lata está antes de girar
  const lidarComClique = (classeAtual: string) => {
    if (classeAtual === 'lata-esq') girarCarrossel('esq');
    if (classeAtual === 'lata-dir') girarCarrossel('dir');
  };

  return (
    <div className="coluna-imagem">
      <div className="carousel-3d">
        <img
          src={lataRosa}
          alt="Monster Rosa"
          className={`lata ${posicoes[0]}`}
          onClick={() => lidarComClique(posicoes[0])}
        />
        <img
          src={lataPreta}
          alt="Monster Preta"
          className={`lata ${posicoes[1]} lata-preta-ajuste`}
          onClick={() => lidarComClique(posicoes[1])}
        />
        <img
          src={lataBranca}
          alt="Monster Branca"
          className={`lata ${posicoes[2]}`}
          onClick={() => lidarComClique(posicoes[2])}
        />
      </div>
    </div>
  );
}