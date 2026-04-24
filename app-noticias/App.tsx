import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { api } from './src/services/api';

interface Noticia {
  id: number;
  titulo: string;
  conteudo: string;
  dataCriacao: string;
}

export default function App() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    carregarNoticias();
  }, []);

  const carregarNoticias = async () => {
    try {
      const response = await api.get('/noticias');
      setNoticias(response.data);
    } catch (error) {
      console.error('Erro ao buscar notícias', error);
    }
  };

  const salvarNoticia = async () => {
    if (!titulo.trim() || !conteudo.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      if (editandoId) {
        // Atualizar
        await api.put(`/noticias/${editandoId}`, { titulo, conteudo });
        setEditandoId(null);
      } else {
        // Criar
        await api.post('/noticias', { titulo, conteudo });
      }
      
      setTitulo('');
      setConteudo('');
      carregarNoticias();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a notícia.');
    }
  };

  const deletarNoticia = async (id: number) => {
    try {
      await api.delete(`/noticias/${id}`);
      carregarNoticias();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar a notícia.');
    }
  };

  const iniciarEdicao = (noticia: Noticia) => {
    setEditandoId(noticia.id);
    setTitulo(noticia.titulo);
    setConteudo(noticia.conteudo);
  };

  const renderItem = ({ item }: { item: Noticia }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.titulo}</Text>
      <Text style={styles.cardContent}>{item.conteudo}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => iniciarEdicao(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => deletarNoticia(item.id)}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Gestão de Notícias</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título da notícia"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Conteúdo"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.submitButton} onPress={salvarNoticia}>
          <Text style={styles.submitButtonText}>
            {editandoId ? 'Atualizar Notícia' : 'Adicionar Notícia'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma notícia encontrada.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  form: {
    backgroundColor: '#FFF',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  editButton: {
    backgroundColor: '#FFC107',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
