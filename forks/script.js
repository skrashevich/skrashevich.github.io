const apiEndpoint = 'https://github.com/dermotduffy/frigate-hass-card/network/meta'; // Replace with your API endpoint

fetch(apiEndpoint, {
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer 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'
  }
})
  .then(response => response.json())
  .then(data => {
    // Display users
    const usersDiv = document.getElementById('users');
    data.users.forEach(user => {
      const userDiv = document.createElement('div');
      const name = document.createElement('p');
      name.innerText = `Name: ${user.name}`;
      const repo = document.createElement('p');
      repo.innerText = `Repo: ${user.repo}`;
      const heads = document.createElement('p');
      heads.innerText = `Heads: ${user.heads.map(head => `${head.name} (${head.id})`).join(', ')}`;
      userDiv.appendChild(name);
      userDiv.appendChild(repo);
      userDiv.appendChild(heads);
      usersDiv.appendChild(userDiv);
    });

    // Display dates
    const datesDiv = document.getElementById('dates');
    data.dates.forEach(date => {
      const dateDiv = document.createElement('div');
      dateDiv.innerText = date;
      datesDiv.appendChild(dateDiv);
    });

    // Display blocks
    const blocksDiv = document.getElementById('blocks');
    data.blocks.forEach(block => {
      const blockDiv = document.createElement('div');
      const name = document.createElement('p');
      name.innerText = `Name: ${block.name}`;
      const start = document.createElement('p');
      start.innerText = `Start: ${block.start}`;
      const count = document.createElement('p');
      count.innerText = `Count: ${block.count}`;
      blockDiv.appendChild(name);
      blockDiv.appendChild(start);
      blockDiv.appendChild(count);
      blocksDiv.appendChild(blockDiv);
    });

    // Display focus
    const focusDiv = document.getElementById('focus');
    focusDiv.innerText = data.focus;

    // Display nethash
    const nethashDiv = document.getElementById('nethash');
    nethashDiv.innerText = data.nethash;

    // Display spacemap
    const spacemapDiv = document.getElementById('spacemap');
    data.spacemap.forEach(row => {
      const rowDiv = document.createElement('div');
      row.forEach(value => {
        const valueDiv = document.createElement('div');
        valueDiv.innerText = value;
        rowDiv.appendChild(valueDiv);
      });
      spacemapDiv.appendChild(rowDiv);
    });
  })
  .catch(error => console.log(error));
