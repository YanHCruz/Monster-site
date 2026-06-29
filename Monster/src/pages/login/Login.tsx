import './Login.css';

import { useState } from 'react';
import { ParticlesBackground } from '../../components/ParticlesBackground/ParticlesBackground';

export function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [erro, setErro] = useState('');

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.slice(0, 11);

        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        setCpf(valor);
        setErro('');
    };

    const validarCpf = (cpfTest: string) => {
        const cpfLimpo = cpfTest.replace(/[^\d]+/g, '');
        if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) return false;

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;

        soma = 0;
        for(let i = 1; i <= 10; i++) soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;

        return true;
    };

    const validarEmail = (emailTest: string) => {
        return /\S+@\S+\.\S+/.test(emailTest);
    };

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        setErro('');

        if (!validarEmail(email)) {
            setErro('Por favor, insira um e-mail válido.');
            return;
        }
        if (!isLogin && !validarCpf(cpf)) {
            setErro('CPF inválido. Verifique os números digitados.');
            return;
        }

        if (senha.length < 6) {
            setErro('A senha deve conter pelo menos 6 caracteres.');
            return;
        }

        alert(isLogin ? "Login realizado com sucesso!" : "Cadastro realizado com sucesso!")
        // Futuro back end aqui.
    };

    return (
        <div className = 'login-container'>

            <ParticlesBackground tema="temaVerde" />

            <div className = 'shape shape-1'></div>
            <div className = 'shape shape-2'></div>

            <div className={`glass-panel ${isLogin ? 'panel-login' : 'panel-register'}`}>
                <form onSubmit={handleSubmit}>
                    <h2>{isLogin ? "Entrar" : "Criar Conta"}</h2>
                    <p className = "subtitle">Desperte o Monster que há em você!</p>

                    {erro && <div className = 'erro-msg'>{erro}</div>}

                    {!isLogin && (
                        <div className = 'input-group'>
                            <i className = 'fa-solid fa-id-card icon'></i>
                            <input
                                type="text"
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChange={handleCpfChange}
                                required
                                />
                        </div>
                    )}

                    <div className = 'input-group'>
                        <i className = 'fa-solid fa-envelope icon'></i>
                        <input
                            type="email"
                            placeholder="Seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                    </div>

                    <div className = 'input-group'>
                        <i className = 'fa-solid fa-lock icon'></i>
                        <input
                            type="password"
                            placeholder="Sua Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            />
                    </div>

                    <button type="submit" className="btn-submit">
                        {isLogin ? "Acessar" : "Cadastrar"}
                    </button>

                    <div className="toggle-form">
                        <span>
                            {isLogin ? "Ainda não tem conta?" : "Já possui uma conta?"}
                        </span>
                        <button type="button" className="btn-link" onClick={() => {
                            setIsLogin(!isLogin);
                            setErro('');
                        }}
                        >
                            {isLogin ? "Cadastre-se" : "Faça login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}