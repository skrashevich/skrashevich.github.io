//const apiEndpoint = 'https://github.com/dermotduffy/frigate-hass-card/network/meta'; // Replace with your API endpoint
const apiEndpoint = './data.js';

fetch(apiEndpoint, {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer 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'
    }
})
    .then(response => response.json())
    .then(data => {
        // Create users table
        const usersTable = document.getElementById('users-table')
        const usersTableHeader = document.createElement('thead');
        const usersTableBody = document.createElement('tbody');

        // Create header row
        const usersTableHeaderRow = document.createElement('tr');
        const usersTableHeaderName = document.createElement('th');
        const usersTableHeaderRepo = document.createElement('th');
        const usersTableHeaderHeads = document.createElement('th');
        usersTableHeaderName.innerText = 'Name';
        usersTableHeaderRepo.innerText = 'Repo';
        usersTableHeaderHeads.innerText = 'Heads';
        usersTableHeaderRow.appendChild(usersTableHeaderName);
        usersTableHeaderRow.appendChild(usersTableHeaderRepo);
        usersTableHeaderRow.appendChild(usersTableHeaderHeads);
        usersTableHeader.appendChild(usersTableHeaderRow);
        usersTable.appendChild(usersTableHeader);

        // Create body rows
        data.users.forEach(user => {
            const userTableRow = document.createElement('tr');
            const userTableName = document.createElement('td');
            const userTableRepo = document.createElement('td');
            const userTableHeads = document.createElement('td');
            userTableName.innerText = user.name;
            userTableRepo.innerText = user.repo;
            //userTableHeads.innerText = user.heads.map(head => head.name).join("\n"); // Only display the name of each head
            
            const headNames = user.heads.map(head => head.name);
      const headDates = user.heads.map(head => {
        const dateIndex = data.dates.findIndex(date => date === head.id);
        return (dateIndex !== -1) ? data.dates[dateIndex] : '';
      });
      const headRows = headNames.map((name, index) => `${name} (${headDates[index]})`);
      userTableHeads.innerText = headRows.join(', ');
            
            userTableRow.appendChild(userTableName);
            userTableRow.appendChild(userTableRepo);
            userTableRow.appendChild(userTableHeads);
            usersTableBody.appendChild(userTableRow);
        });
        usersTable.appendChild(usersTableBody);

        // Display users table

        // Create dates table
        const datesTable = document.createElement('table');
        const datesTableBody = document.createElement('tbody');

        // Create body rows
        data.dates.forEach(date => {
            const dateTableRow = document.createElement('tr');
            const dateTableCell = document.createElement('td');
            dateTableCell.innerText = date;
            dateTableRow.appendChild(dateTableCell);
            datesTableBody.appendChild(dateTableRow);
        });
        datesTable.appendChild(datesTableBody);

        // Display dates table
        document.body.appendChild(datesTable);

        // Create blocks table
        const blocksTable = document.createElement('table');
        const blocksTableHeader = document.createElement('thead');
        const blocksTableBody = document.createElement('tbody');

        // Create header row
        const blocksTableHeaderRow = document.createElement('tr');
        const blocksTableHeaderName = document.createElement('th');
        const blocksTableHeaderStart = document.createElement('th');
        const blocksTableHeaderCount = document.createElement('th');
        blocksTableHeaderName.innerText = 'Name';
        blocksTableHeaderStart.innerText = 'Start';
        blocksTableHeaderCount.innerText = 'Count';
        blocksTableHeaderRow.appendChild(blocksTableHeaderName);
        blocksTableHeaderRow.appendChild(blocksTableHeaderStart);
        blocksTableHeaderRow.appendChild(blocksTableHeaderCount);
        blocksTableHeader.appendChild(blocksTableHeaderRow);
        blocksTable.appendChild(blocksTableHeader);

        // Create body rows
        data.blocks.forEach(block => {
            const blockTableRow = document.createElement('tr');
            const blockTableName = document.createElement('td');
            const blockTableStart = document.createElement('td');
            const blockTableCount = document.createElement('td');
            blockTableName.innerText = block.name;
            blockTableStart.innerText = block.start;
            blockTableCount.innerText = block.count;
            blockTableRow.appendChild(blockTableName);
            blockTableRow.appendChild(blockTableStart);
            blockTableRow.appendChild(blockTableCount);
            blocksTableBody.appendChild(blockTableRow);
        });
        blocksTable.appendChild(blocksTableBody);

        // Display blocks table
        document.body.appendChild(blocksTable);

        // Display focus
        const focusDiv = document.createElement('div');
        focusDiv.innerText = `Focus: ${data.focus}`;
        document.body.appendChild(focusDiv);

        // Display nethash
        const nethashDiv = document.createElement('div');
        nethashDiv.innerText = `Nethash: ${data.nethash}`;
        document.body.appendChild(nethashDiv);

        // Display spacemap
        const spacemapTable = document.createElement('table');
        const spacemapTableBody = document.createElement('tbody');

        // Create body rows
        data.spacemap.forEach(row => {
            const rowTableRow = document.createElement('tr');
            row.forEach(value => {
                const valueTableCell = document.createElement('td');
                valueTableCell.innerText = value;
                rowTableRow.appendChild(valueTableCell);
            });
            spacemapTableBody.appendChild(rowTableRow);
        });
        spacemapTable.appendChild(spacemapTableBody);

        // Display spacemap table
        document.body.appendChild(spacemapTable);
    })
    .catch(error => console.log(error));