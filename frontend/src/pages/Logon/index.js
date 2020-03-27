import React, { useState } from 'react';
import './styles.css';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {
  const [id, setId ] = useState('')
  const history = useHistory();


  async function handleSubmit (e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', {id})

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile');
    } catch (error) {
      alert('Falha no login, verifique seu ID novamente')
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be te hero" />
        
        <form onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <input placeholder="Sua ID"
                 value={id}
                 onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
        
      </section>
      <img src={heroesImg} alt=""/>
    </div>
  )
}