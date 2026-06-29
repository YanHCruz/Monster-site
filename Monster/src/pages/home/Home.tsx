import './Home.css';

import { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { MiniCard } from '../../components/MiniCard/MiniCard';
import { Carousel } from '../../components/Carousel/Carousel';
import { ParticlesBackground } from '../../components/ParticlesBackground/ParticlesBackground';
import { IntroScreen } from '../../components/IntroScreen/IntroScreen';
import lataPreta from '../../assets/Monster-projeto-sem-fundo.png';
import lataBranca from '../../assets/Latinha branca - sem fundo.png';
import lataRosa from '../../assets/Latinha rosa - sem fundo.png';

export function Home() {
    const [temaAtual, setTemaAtual] = useState('tema-verde');
    
    const produtos = [
        { id: 1, title: 'Monster Energy Zero', price: 'R$11,99', stars: '★★★★', image: lataPreta, tema: 'tema-verde' },
        { id: 2, title: 'Monster Energy White Zero', price: 'R$11,99', stars: '★★★★', image: lataBranca, tema: 'tema-branco' },
        { id: 3, title: 'Monster Energy Pink Zero', price: 'R$11,99', stars: '★★★★', image: lataRosa, tema: 'tema-rosa' },
    ];
    
    const produtoAtivo = produtos.find(produto => produto.tema === temaAtual);
    const outrosProdutos = produtos.filter(produto => produto.tema !== temaAtual);
    const produtosOrdenados = produtoAtivo ? [produtoAtivo, ...outrosProdutos] : produtos;
    
    
    const [introAtiva, setIntroAtiva] = useState(true);
    useEffect(() => {
        if (introAtiva) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [introAtiva]);

    return (
        <div className={`home-wrapper ${temaAtual}`}>
            
            <Header />
            <ParticlesBackground tema={temaAtual} />
            <IntroScreen onIntroFinished={() => setIntroAtiva(false)} />

            <div className="container">
                <div className="coluna-texto">
                    <h1>Monster Energy Drink</h1>
                    <p>Monster é o favorito entre atletas, músicos, gamers e jovens</p>
                    <h2>R$11,99</h2>
                    <button>Comprar agora</button>
                </div>

                <Carousel onTemaChange={(novoTema) => setTemaAtual(novoTema)} />

                <div className="coluna-cards">
                    {produtosOrdenados.map((produto) => (
                        <MiniCard 
                        key={produto.id} 
                        title={produto.title}
                        price={produto.price}
                        stars={produto.stars}
                        image={produto.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}