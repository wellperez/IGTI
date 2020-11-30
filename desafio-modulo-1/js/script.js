function createParagraph(firstName, lastName, age) {
  const para = document.createElement('P'); // Create a <p> node
  para.textContent = `${firstName} ${lastName}, ${age} anos.`;
  return para;
}

function createImg(src) {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('circle');
  return img;
}

function disableBtn() {
  document.getElementById('user').addEventListener('keyup', () => {
    const userInput = document.getElementById('user').value;
    if (userInput !== '') {
      document.getElementById('send').removeAttribute('disabled');
    } else {
      document.getElementById('send').setAttribute('disabled', null);
    }
  });
}

async function loadUsers() {
  const response = await fetch('http://localhost:3000/results');
  const json = await response.json();
  const user = await Object.values(json);
  return user;
}

function createLi() {
  const li = document.createElement('li');
  li.classList.add('collection-item');
  li.classList.add('avatar');
  return li;
}

function createStatisticsParagraph(
  maleGenderParam,
  femaleGenderParam,
  othersGendersParam,
  sumOfAgesParam,
  qntUserStatisticsParam,
) {
  const maleGender = document.createElement('P');
  maleGender.textContent = `Sexo masculino: ${maleGenderParam}`;

  const femaleGender = document.createElement('P');
  femaleGender.textContent = `Sexo feminino: ${femaleGenderParam}`;

  const othersGenders = document.createElement('P');
  othersGenders.textContent = `Outros Gêneros: ${othersGendersParam}`;

  const sumOfAges = document.createElement('P');
  sumOfAges.textContent = `Soma das Idades: ${sumOfAgesParam}`;

  const averageAge = document.createElement('P');
  averageAge.textContent = `Média das Idades: ${Math.round(
    sumOfAgesParam / qntUserStatisticsParam,
    -2,
  )}`;

  const statistics = document.getElementById('statistics');

  statistics.append(
    maleGender,
    femaleGender,
    othersGenders,
    sumOfAges,
    averageAge,
  );
}

async function handleSubmit(event) {
  // Evitando o refresh
  event.preventDefault();

  const userInput = document.querySelector('#user');
  const userInputValue = userInput.value.toLowerCase();

  const users = await loadUsers();

  const results = document.getElementById('results-ul');
  results.textContent = '';

  const statistics = document.getElementById('statistics');
  statistics.textContent = '';

  let ageStatistics = 0;
  const genderStatistics = { male: 0, female: 0, others: 0 };
  let qntUserStatistics = 0;

  users.map((user) => {
    const firstName = user.name.first;
    const lastName = user.name.last;
    const { age } = user.dob;
    const picture = user.picture.large;
    const { gender } = user;

    if (
      firstName.toLowerCase().includes(userInputValue)
      || lastName.toLowerCase().includes(userInputValue)
    ) {
      // ESTRUTURA PARA ADICIONAR OS USUÁRIOS NO HTML
      const li = createLi();

      li.appendChild(createImg(picture));
      li.appendChild(createParagraph(firstName, lastName, age));

      results.appendChild(li);

      // ESTRUTURA PARA REALIZAR AS ESTATÍSTICAS
      ageStatistics += age;
      qntUserStatistics += 1;

      if (gender === 'female') {
        genderStatistics.female += 1;
      } else if (gender === 'male') {
        genderStatistics.male += 1;
      } else {
        genderStatistics.others += 1;
      }
    }

    return true;
  });

  if (qntUserStatistics > 0) {
    const h3 = document.getElementById('users-title');
    h3.textContent = `${qntUserStatistics} usuário(s) encontrado(s)`;
    document.getElementById('results-ul').removeAttribute('hidden');

    createStatisticsParagraph(
      genderStatistics.male,
      genderStatistics.female,
      genderStatistics.others,
      ageStatistics,
      qntUserStatistics,
    );
  } else {
    alert('Nenhum usuário encontrado!');
    location.reload();
  }
}

function start() {
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

  disableBtn();

  document.getElementById('user').focus();
}

start();
