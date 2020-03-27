import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const getId = localStorage.getItem('ongId');
  const history = useHistory();

  const [title, setTitle ] = useState('')
  const [description, setDescription ] = useState('')
  const [value, setValue ] = useState('')

  async function handleIncident(e) {

    e.preventDefault()

    const data = {title, description, value}

    try {
      await api.post('/incidents', data,{
        headers:{
          Authorization: getId
        }
      })
      history.push('/profile')
    } catch (error) {
      alert('Erro ao cadastrar um novo caso')
    }
  }

  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero"/>
        
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
        
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleIncident}>
          <input placeholder="Titulo do caso"
                 value={title}
                 onChange={e => setTitle(e.target.value)}
          />
          <textarea placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
          />
          <input placeholder="Valor em reais" type="text"
                 value={value}
                 onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}
