import { promises as fs } from 'fs';

const times = [];

(async () => {
  const data = JSON.parse(await fs.readFile('2003.json'));

  data[0].partidas.forEach((partidas) => {
    times.push({ time: partidas.mandante, pontuacao: 0 });
    times.push({ time: partidas.visitante, pontuacao: 0 });
  });

  data.forEach((rodada) => {
    rodada.partidas.forEach((partida) => {
      const timeMandante = times.find((item) => item.time === partida.mandante);
      const timeVisitante = times.find((item) => item.time === partida.visitante);
      if (partida.placar_mandante > partida.placar_visitante) {
        timeMandante.pontuacao += 3;
      } else if (partida.placar_mandante < partida.placar_visitante) {
        timeVisitante.pontuacao += 3;
      } else {
        timeMandante.pontuacao += 1;
        timeVisitante.pontuacao += 1;
      }
    });
  });

  times.sort((a, b) => b.pontuacao - a.pontuacao);
  console.log(times);

  fs.writeFile('times.json', JSON.stringify(times, null, 2));
})();
