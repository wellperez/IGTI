// + Carlos R. L. Rodrigues
// @ http://jsfromhell.com/string/extenso [rev. #3]

String.prototype.extenso = function (c) {
  const ex = [
    ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'],
    ['dez', 'vinte', 'trinta', 'quarenta', 'cinqüenta', 'sessenta', 'setenta', 'oitenta', 'noventa'],
    ['cem', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'],
    ['mil', 'milhão', 'bilhão', 'trilhão', 'quadrilhão', 'quintilhão', 'sextilhão', 'setilhão', 'octilhão', 'nonilhão', 'decilhão', 'undecilhão', 'dodecilhão', 'tredecilhão', 'quatrodecilhão', 'quindecilhão', 'sedecilhão', 'septendecilhão', 'octencilhão', 'nonencilhão'],
  ];
  let a;
  var n;
  let v;
  let i;
  var n = this.replace(c ? /[^,\d]/g : /\D/g, '').split(',');
  const e = ' e ';
  const $ = 'real';
  const d = 'centavo';
  let sl;
  for (var f = n.length - 1, l, j = -1, r = [], s = [], t = ''; ++j <= f; s = []) {
    j && (n[j] = ((`.${n[j]}`) * 1).toFixed(2).slice(2));
    if (!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
    for (a = -1, l = v.length; ++a < l; t = '') {
      if (!(i = v[a] * 1)) continue;
      i % 100 < 20 && (t += ex[0][i % 100])
					|| i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ''));
      s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t))
					+ ((t = l - a - 2) > -1 ? ` ${i > 1 && t > 0 ? ex[3][t].replace('ão', 'ões') : ex[3][t]}` : ''));
    }
    a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(' ') + e + a) : s.join('') || ((!j && (n[j + 1] * 1 > 0) || r.length) ? '' : ex[0][0]));
    a && r.push(a + (c ? (` ${v.join('') * 1 > 1 ? j ? `${d}s` : (/0{6,}$/.test(n[0]) ? 'de ' : '') + $.replace('l', 'is') : j ? d : $}`) : ''));
  }
  return r.join(e);
};

function start() {
  const input = document.querySelector('#num');
  const output = document.querySelector('#num-of-range');
  const outputInWriting = document.querySelector('#num-in-writing');

  output.value = 500;
  outputInWriting.value = input.value.extenso();

  input.oninput = () => {
    output.value = input.value;
    outputInWriting.value = input.value.extenso();
  };
}

window.addEventListener('load', start);
