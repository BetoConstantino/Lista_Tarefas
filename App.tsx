/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Keyboard,
} from 'react-native';
import {format} from 'date-fns';

interface listaTarefasInterface {
  titulo: string;
  data: Date;
}

const App = () => {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState<Array<listaTarefasInterface>>([]);

  const gravaTarefa = () => {
    if(novaTarefa === ''){
      return false;
    }

    Keyboard.dismiss(); //fecha o teclado
    setNovaTarefa(''); //zera o texto do imput
    const novaLista = [...listaTarefas];

    novaLista.unshift({
    titulo: novaTarefa,
    data: new Date(),
    });
    setListaTarefas(novaLista);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{flex: 1, padding: 16}}>
        <Image
          source={require('./todo-list.png')}
          style={{height: 58, width: '75%'}}
          resizeMode="contain"
        />
        <View style={{flexDirection: 'row'}}>
          <TextInput
            value={novaTarefa}
            onChangeText={(valor) => {
              setNovaTarefa(valor);
            }}
            placeholder="Adicionar tarefa"
            style={{
              flex: 1,
              marginRight: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#707070',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              gravaTarefa();
            }}
            style={{
              backgroundColor: '#ffaa00',
              width: 52,
              borderRadius: 26,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 26}}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 24}}>
          {listaTarefas.map((item, index) => (
            <View
              key={'item' + index}
              style={{
                backgroundColor: '#f5f8f9',
                padding: 8,
                borderLeftWidth: 4,
                borderLeftColor: '#1abc9c',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  textAlign: 'right',
                }}>
                {format(item.data, 'dd/MM/yyyy HH:mm')}
              </Text>
              <Text style={{fontSize: 16}}>{item.titulo} </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default App;
