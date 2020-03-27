import React, {useEffect, useState}  from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import api from '../../services/api';
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {

  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();

  //Não preciso fazer outro map no detail, passo os dados dessa chamada que eu tenho aqui e passo
  //Todos os dados atualizados pra detail
  function navigateToDetail(incident){
    navigation.navigate('Detail', {incident});
  }

  async function loadIncidents() {

    if(loading){
      return; //Evitar que quando uma requisição tive sendo feita, uma outra venha a acontecer .. evitar que chame outra requisição se o usuario ficar puxando o scroll sem parar
    }

    //Não faz sentido buscar mais informações se já estiver carregado todas
    if(total > 0 && incidents.length === total ){
      return;
    }

    setLoading(true);

    setLoading()

    try {
      const response = await api.get('incidents', {
        params: {page}
      })

      setIncidents([...incidents, ...response.data])
      setTotal(response.headers['x-total-count']);
      setPage(page+1);
      setLoading(false);
      
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    loadIncidents();
  },[]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>
    

      <FlatList 
        data={incidents}
        style={styles.incidentList}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2} //20% da lista ele carrega novos itens
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={true}
        renderItem={({ item:incident }) => ( //Nomeando o item para incident pra fica mais fácil
          <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name}</Text>

              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', 
                { style: 'currency', currency: 'BRL'})
                .format(incident.value)}
              </Text>

              <TouchableOpacity style={styles.detailsButton}
                                onPress={() => navigateToDetail(incident)} >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" color="#e02041" size={20}/>
              </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
