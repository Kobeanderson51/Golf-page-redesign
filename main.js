document.addEventListener('DOMContentLoaded', function() {
    const playerCount = 4;
    let parValues = [4, 4, 4, 3, 5, 4, 3, 4, 5];
    let yardageValues = [450, 400, 350, 300, 450, 400, 350, 300, 450];

    document.getElementById('playerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const playerNames = [];
        for (let i = 1; i <= playerCount; i++) {
            const playerName = document.getElementById(`player${i}`).value.trim();
            playerNames.push(playerName);
        }

        for (let i = 0; i < playerNames.length; i++) {
            const playerNameElement = document.getElementById(`player${i + 1}-name`);
            playerNameElement.textContent = playerNames[i];
        }
    });

    document.getElementById('resetButton').addEventListener('click', function() {
        const playerInputs = document.querySelectorAll('input[type="number"]');
        playerInputs.forEach(input => input.value = '');

        const finalScoresContainer = document.getElementById('finalScoresContent');
        finalScoresContainer.innerHTML = '';
    });

    document.getElementById('calculateTotalButton').addEventListener('click', function() {
        const finalScoresContainer = document.getElementById('finalScoresContent');
        finalScoresContainer.innerHTML = '';

        for (let i = 1; i <= playerCount; i++) {
            const playerInputs = Array.from(document.querySelectorAll(`#p${i}-input1, #p${i}-input2, #p${i}-input3, #p${i}-input4, #p${i}-input5, #p${i}-input6, #p${i}-input7, #p${i}-input8, #p${i}-input9`));
            const playerName = document.getElementById(`player${i}-name`).textContent;
            const outScore = calculateOutScore(playerInputs);
            const totalScore = calculateTotalScore(playerInputs);
            const parAdjustedScore = calculateParAdjustedScore(parValues, playerInputs.map(input => parseInt(input.value) || 0));
            const yardageAdjustedScore = calculateYardageAdjustedScore(yardageValues, playerInputs.map(input => parseInt(input.value) || 0));
            const golfScore = getGolfScore(parAdjustedScore - totalScore, yardageAdjustedScore);

            const playerScoresDiv = document.createElement('div');
            playerScoresDiv.classList.add('player-scores');
            playerScoresDiv.innerHTML = `
                <div class="final-scores">
                    <h3>${playerName}</h3>
                    <p><strong>Out:</strong> ${outScore}</p>
                    <p><strong>Total:</strong> ${totalScore}</p>
                    <p><strong>Golf Score:</strong> ${golfScore}</p>
                </div>
            `;
            finalScoresContainer.appendChild(playerScoresDiv);
        }
    });

    for (let i = 1; i <= playerCount; i++) {
        const playerInputs = Array.from(document.querySelectorAll(`#p${i}-input1, #p${i}-input2, #p${i}-input3, #p${i}-input4, #p${i}-input5, #p${i}-input6, #p${i}-input7, #p${i}-input8, #p${i}-input9`));
        const outElement = document.getElementById(`p${i}-out`);
        const totalElement = document.getElementById(`p${i}-total`);

        playerInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                let totalScore = calculateTotalScore(playerInputs);
                let parAdjustedScore = calculateParAdjustedScore(parValues, playerInputs.map(input => parseInt(input.value) || 0));
                let yardageAdjustedScore = calculateYardageAdjustedScore(yardageValues, playerInputs.map(input => parseInt(input.value) || 0));

                outElement.textContent = calculateOutScore(playerInputs.slice(0, 9));
                totalElement.textContent = getGolfScore(parAdjustedScore - totalScore, yardageAdjustedScore);
                updateTotalParAndYardage();
            });
        });
    }

    function updateTotalParAndYardage() {
        const totalParElement = document.getElementById('total-par');
        const totalYardageElement = document.getElementById('total-yardage');

        let totalPar = parValues.reduce((acc, par) => acc + par, 0);
        let totalYardage = yardageValues.reduce((acc, yardage) => acc + yardage, 0);

        totalParElement.textContent = totalPar;
        totalYardageElement.textContent = totalYardage;
    }

    const parInputs = document.querySelectorAll('.input-par');
    parInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            parValues[index] = parseInt(input.value) || 0;
            updateTotalParAndYardage();
        });
    });

    const yardageInputs = document.querySelectorAll('.input-yardage');
    yardageInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            yardageValues[index] = parseInt(input.value) || 0;
            updateTotalParAndYardage();
        });
    });

    function calculateTotalScore(scores) {
        return scores.reduce((acc, input) => acc + (parseInt(input.value) || 0), 0);
    }

    function calculateParAdjustedScore(parValues, scores) {
        let parAdjustedScore = 0;
        scores.forEach((score, i) => {
            parAdjustedScore += score - parValues[i];
        });
        return parAdjustedScore;
    }

    function calculateYardageAdjustedScore(yardageValues, scores) {
        let yardageAdjustedScore = 0;
        scores.forEach((score, i) => {
            yardageAdjustedScore += score - yardageValues[i];
        });
        return yardageAdjustedScore;
    }

    function getGolfScore(score, yardageAdjustedScore) {
        if (isNaN(score)) {
            return "";
        } else if (score === 0 && yardageAdjustedScore === 0) {
            return "E";
        } else if (score < 0 && yardageAdjustedScore < 0) {
            return `${score}`;
        } else {
            return `+${score}`;
        }
    }

    function calculateOutScore(scores) {
        return scores.reduce((acc, input) => acc + (parseInt(input.value) || 0), 0);
    }
});
