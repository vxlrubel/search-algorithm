
let players = [];      // Will hold fetched players
let playerMap = {};    // Will hold the hash map

// 1. Fetch players from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        players = data.players;
        buildPlayerMap();
    })
    .catch(error => {
        console.error('Error loading player data:', error);
    });

// 2. Build the lookup map after loading
function buildPlayerMap() {
    players.forEach((player, index) => {
        const lowerName = player.toLowerCase();
        if (!playerMap[lowerName]) {
            playerMap[lowerName] = [];
        }
        playerMap[lowerName].push(index);
    });
}

// 3. Get DOM elements
const input = document.getElementById('player-search-hash-table');
const resultDiv = document.getElementById('show-hash-table-result');

// 4. Listen for typing
input.addEventListener('input', function() {
    const searchValue = input.value.trim().toLowerCase();

    if (searchValue === "") {
        resultDiv.innerHTML = ""; // Clear if empty
        return;
    }

    const indexes = playerMap[searchValue];

    if (indexes && indexes.length > 0) {
        resultDiv.innerHTML = `
            <ul>
                ${indexes.map(i => `<li>${players[i]}</li>`).join("")}
            </ul>
        `;
    } else {
        resultDiv.innerHTML = "❌ No players found";
    }
});
















let b_players = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        b_players = data.players.sort((a, b) => a.localeCompare(b));
        console.log(data)
    })
    .catch(error => {
        console.error('Error loading player data:', error);
    });

// 2. Get DOM elements
const b_input = document.getElementById('player-search');
const b_resultDiv = document.getElementById('show-result');

// 3. Binary search function (to find **all matches**)
function binarySearchAll(array, target) {
    target = target.toLowerCase();
    let low = 0;
    let high = array.length - 1;
    let foundIndexes = [];

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let midValue = array[mid].toLowerCase();

        if (midValue === target) {
            // Found one match, now find duplicates around mid
            foundIndexes.push(mid);

            // Check left side
            let left = mid - 1;
            while (left >= 0 && array[left].toLowerCase() === target) {
                foundIndexes.push(left);
                left--;
            }

            // Check right side
            let right = mid + 1;
            while (right < array.length && array[right].toLowerCase() === target) {
                foundIndexes.push(right);
                right++;
            }

            break; // Done
        }
        else if (target < midValue) {
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
    }

    return foundIndexes.sort((a, b) => a - b);
}

// 4. Listen for typing
b_input.addEventListener('input', function() {

    const searchValue = b_input.value.trim().toLowerCase();

    if (searchValue === "") {
        b_resultDiv.innerHTML = "";
        return;
    }

    const indexes = binarySearchAll(b_players, searchValue);

    if (indexes.length > 0) {
        b_resultDiv.innerHTML = `
            <ul>
                ${indexes.map(i => `<li>${b_players[i]}</li>`).join("")}
            </ul>
        `;
    } else {
        b_resultDiv.innerHTML = "❌ No players found";
    }
});