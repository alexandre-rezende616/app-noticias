import axios from 'axios';

// ATENÇÃO: Troque pelo IP local da sua máquina. 
// Exemplo: 'http://192.168.0.15:3000'
// 'localhost' não funciona no Expo Go rodando em um celular físico!
export const api = axios.create({
  baseURL: 'http://192.168.0.191:3000', 
});
