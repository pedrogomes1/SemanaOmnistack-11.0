import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css'


export default function Profile() {

  const history = useHistory();
  const [incident, setIncident] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  useEffect(() => {

    async function loadIncidents() {

      const response = await api.get('profile', {
        headers:{
          Authorization: ongId
        }        
      })
      setIncident(response.data)
    }
    loadIncidents()
  },[ongId])

  async function handleDelete(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers:{
          Authorization: ongId //Qual ong está deletando
        }
      })

      setIncident(incident.filter(incident => incident.id !== id))
    } catch (error) {
      alert('Erro ao deletar o caso')
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/')
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the hero"/>
        <span>Bem vindo, {ongName}</span>

        <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" /> 
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incident.map(incidents => (
          <li key={incidents.id}>
          <strong>Caso:</strong>
          <p>{incidents.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incidents.description}</p>

          <strong>Valor:</strong>
          <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>

          <button type="button" onClick={() => handleDelete(incidents.id)}>
            <FiTrash2 size={20} color="a8a8b3" />
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
