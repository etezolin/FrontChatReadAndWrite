import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [dados, setDados] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaAtual, setRespostaAtual] = useState('');

  useEffect(() => {
    if (dados.length === 0) { 
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://localhost:44307/ApiChat/Consumer',
        headers: {},
        data: '',
      };

      axios(config)
        .then((response) => {
          setDados(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dados]);

  const proximaPergunta = () => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:44307/ApiChat/Publisher/' + respostaAtual,
      headers: {},
      data: {
        perguntaId: dados[perguntaAtual]?.id,
        resposta: respostaAtual 
      },
    };

    axios(config)
      .then((response) => {
        if (perguntaAtual < (dados?.length ?? 0) - 1) {
          setPerguntaAtual(perguntaAtual + 1);
          setRespostaAtual(''); 
        } else {
          setPerguntaAtual(-1);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRespostaChange = (event) => {
    setRespostaAtual(event.target.value);
  };

  return (
    <>
      <div>
        {perguntaAtual >= 0 ? (
          <>
            <h2>{dados[perguntaAtual]?.questao}</h2>
            <input 
              placeholder='Digite aqui sua resposta'
              value={respostaAtual}
              onChange={handleRespostaChange} 
            /><br/><br/>
            <button onClick={proximaPergunta}>Próxima pergunta</button>
          </>
        ) : (
          <h2>Muito obrigado!</h2>
        )}
      </div>
    </>
  );
}



