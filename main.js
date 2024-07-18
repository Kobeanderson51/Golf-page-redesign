document.addEventListener('DOMContentLoaded', () => {
    const courses = {
        1: {
            yardagesFront: [365, 70, 276, 105, 340, 240, 86, 370, 280],
            parsFront: [5, 3, 4, 3, 5, 4, 3, 5, 4],
            yardagesBack: [362, 260, 135, 230, 210, 82, 300, 242, 391],
            parsBack: [5, 4, 3, 4, 4, 3, 4, 4, 5]
        },
        2: {
            yardagesFront: [333, 150, 285, 356, 324, 452, 379, 164, 452],
            parsFront: [4, 3, 4, 4, 4, 5, 4, 3, 5],
            yardagesBack: [419, 351, 168, 340, 382, 264, 177, 347, 457],
            parsBack: [5, 4, 3, 4, 4, 4, 3, 4, 5]
        },
        3: {
            yardagesFront: [263, 177, 436, 136, 320, 113, 353, 370, 290],
            parsFront: [4, 3, 5, 3, 4, 3, 4, 4, 4],
            yardagesBack: [263, 177, 436, 136, 320, 113, 353, 370, 290],
            parsBack: [4, 3, 5, 3, 4, 3, 4, 4, 4]
        },
        4: {
            yardagesFront: [365, 360, 450, 155, 370, 145, 330, 360, 480],
            parsFront: [4, 4, 5, 3, 4, 3, 4, 4, 5],
            yardagesBack: [140, 360, 360, 440, 120, 375, 140, 390, 470],
            parsBack: [3, 4, 4, 5, 3, 4, 3, 4, 5]
        },
        5: {
            yardagesFront: [439, 181, 341, 378, 385, 156, 443, 345, 305],
            parsFront: [5, 3, 4, 4, 4, 3, 5, 4, 4],
            yardagesBack: [480, 347, 114, 279, 300, 291, 405, 149, 481],
            parsBack: [5, 4, 3, 4, 4, 4, 4, 3, 5]
        },
        6: {
            yardagesFront: [309, 493, 268, 155, 523, 397, 182, 355, 396],
            parsFront: [4, 5, 4, 3, 5, 4, 3, 4, 4],
            yardagesBack: [350, 585, 372, 375, 495, 166, 391, 167, 357],
            parsBack: [4, 5, 4, 4, 5, 3, 4, 3, 4]
        },
        7: {
            yardagesFront: [368, 483, 135, 370, 317, 341, 330, 136, 433],
            parsFront: [5, 5, 3, 4, 4, 4, 4, 3, 5],
            yardagesBack: [469, 393, 214, 373, 159, 307, 425, 353, 396],
            parsBack: [5, 4, 3, 4, 3, 4, 5, 4, 4]
        },
        8: {
            yardagesFront: [339, 459, 371, 152, 468, 372, 179, 345, 328],
            parsFront: [4, 5, 4, 3, 5, 4, 3, 4, 4],
            yardagesBack: [335, 265, 129, 466, 157, 368, 407, 460, 360],
            parsBack: [4, 4, 3, 5, 3, 4, 4, 5, 4]
        },
    };

    let selectedCourse = 1;
    let playerCount = 4;

    function updateCourse(course) {
        const { yardagesFront, parsFront, yardagesBack, parsBack } = courses[course];

        yardagesFront.forEach((yardage, index) => {
            document.getElementById(`yardage${index + 1}`).textContent = yardage;
            document.getElementById(`par${index + 1}`).textContent = parsFront[index];
        });

        yardagesBack.forEach((yardage, index) => {
            document.getElementById(`yardage${index + 10}`).textContent = yardage;
            document.getElementById(`par${index + 10}`).textContent = parsBack[index];
        });

        updateTotalParAndYardage();
    }

    updateCourse(selectedCourse);

    document.getElementById('course').addEventListener('change', function () {
        selectedCourse = parseInt(this.value);
        updateCourse(selectedCourse);
    });

    document.getElementById('resetButton').addEventListener('click', function () {
        const playerInputs = document.querySelectorAll('input[type="number"]');
        playerInputs.forEach(input => input.value = '');

        const finalScoresContainer = document.getElementById('finalScoresContent');
        finalScoresContainer.innerHTML = '';

        updateTotalParAndYardage();
    });

    document.getElementById('calculateTotalButton').addEventListener('click', function () {
        const finalScoresContainer = document.getElementById('finalScoresContent');
        finalScoresContainer.innerHTML = '';

        for (let i = 1; i <= playerCount; i++) {
            const frontNineInputs = Array.from(document.querySelectorAll(`#p${i}-input1, #p${i}-input2, #p${i}-input3, #p${i}-input4, #p${i}-input5, #p${i}-input6, #p${i}-input7, #p${i}-input8, #p${i}-input9`));
            const backNineInputs = Array.from(document.querySelectorAll(`#p${i}-input10, #p${i}-input11, #p${i}-input12, #p${i}-input13, #p${i}-input14, #p${i}-input15, #p${i}-input16, #p${i}-input17, #p${i}-input18`));
            const allInputs = frontNineInputs.concat(backNineInputs);

            const playerName = document.getElementById(`player${i}`).value;
            const outScore = calculateOutScore(frontNineInputs);
            const inScore = calculateOutScore(backNineInputs);
            const totalScore = calculateTotalScore(allInputs);
            const parAdjustedScore = calculateParAdjustedScore(courses[selectedCourse].parsFront.concat(courses[selectedCourse].parsBack), allInputs.map(input => parseInt(input.value) || 0));
            const yardageAdjustedScore = calculateYardageAdjustedScore(courses[selectedCourse].yardagesFront.concat(courses[selectedCourse].yardagesBack), allInputs.map(input => parseInt(input.value) || 0));
            const golfScore = getGolfScore(parAdjustedScore - totalScore, yardageAdjustedScore);

            const playerScoresDiv = document.createElement('div');
            playerScoresDiv.classList.add('player-scores');
            playerScoresDiv.innerHTML = `
                <div class="final-scores">
                    <h3>${playerName}</h3>
                    <p><strong>Out:</strong> <span id="p${i}-out">${outScore}</span></p>
                    <p><strong>In:</strong> <span id="p${i}-in">${inScore}</span></p>
                    <p><strong>Total:</strong> ${totalScore}</p>
                    <p><strong>Golf Score:</strong> ${golfScore}</p>
                </div>
            `;
            finalScoresContainer.appendChild(playerScoresDiv);
        }

        updateTotalParAndYardage();
    });

    for (let i = 1; i <= playerCount; i++) {
        const frontNineInputs = Array.from(document.querySelectorAll(`#p${i}-input1, #p${i}-input2, #p${i}-input3, #p${i}-input4, #p${i}-input5, #p${i}-input6, #p${i}-input7, #p${i}-input8, #p${i}-input9`));
        const backNineInputs = Array.from(document.querySelectorAll(`#p${i}-input10, #p${i}-input11, #p${i}-input12, #p${i}-input13, #p${i}-input14, #p${i}-input15, #p${i}-input16, #p${i}-input17, #p${i}-input18`));
        const allInputs = frontNineInputs.concat(backNineInputs);

        allInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                let totalScore = calculateTotalScore(allInputs);
                let parAdjustedScore = calculateParAdjustedScore(courses[selectedCourse].parsFront.concat(courses[selectedCourse].parsBack), allInputs.map(input => parseInt(input.value) || 0));
                let yardageAdjustedScore = calculateYardageAdjustedScore(courses[selectedCourse].yardagesFront.concat(courses[selectedCourse].yardagesBack), allInputs.map(input => parseInt(input.value) || 0));

                document.getElementById(`p${i}-out`).textContent = calculateOutScore(frontNineInputs);
                document.getElementById(`p${i}-in`).textContent = calculateOutScore(backNineInputs);
                document.getElementById(`p${i}-total`).textContent = totalScore;
                document.getElementById(`p${i}-total-back`).textContent = totalScore;
                document.getElementById(`p${i}-par-adjusted`).textContent = parAdjustedScore;
                document.getElementById(`p${i}-yardage-adjusted`).textContent = yardageAdjustedScore;

                updateTotalParAndYardage();
            });
        });
    }

    function updateTotalParAndYardage() {
        const totalParFrontElement = document.getElementById('total-par-front');
        const totalYardageFrontElement = document.getElementById('total-yardage-front');
        const totalParBackElement = document.getElementById('total-par-back');
        const totalYardageBackElement = document.getElementById('total-yardage-back');
        const totalpartotal = document.getElementById('total-par-total');
        const totalAllYardage = document.getElementById('total-all-yardage');

        let totalParFront = courses[selectedCourse].parsFront.reduce((acc, par) => acc + par, 0);
        let totalYardageFront = courses[selectedCourse].yardagesFront.reduce((acc, yardage) => acc + yardage, 0);
        let totalParBack = courses[selectedCourse].parsBack.reduce((acc, par) => acc + par, 0);
        let totalYardageBack = courses[selectedCourse].yardagesBack.reduce((acc, yardage) => acc + yardage, 0);
        let totalParTotal = totalParFront + totalParBack;
        let totalAllYardageValue = totalYardageFront + totalYardageBack;
        
        totalAllYardage.textContent = totalAllYardageValue;
        totalpartotal.textContent = totalParTotal;
        totalParFrontElement.textContent = totalParFront;
        totalYardageFrontElement.textContent = totalYardageFront;
        totalParBackElement.textContent = totalParBack;
        totalYardageBackElement.textContent = totalYardageBack;
    }

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
            return score.toString();
        } else {
            return "+" + score.toString();
        }
    }

    function calculateOutScore(scores) {
        return scores.reduce((acc, input) => acc + (parseInt(input.value) || 0), 0);
    }

    document.getElementById('playerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const player1 = document.getElementById('player1').value;
        const player2 = document.getElementById('player2').value;
        const player3 = document.getElementById('player3').value;
        const player4 = document.getElementById('player4').value;

        document.getElementById('player1-name').textContent = player1;
        document.getElementById('player2-name').textContent = player2;
        document.getElementById('player3-name').textContent = player3;
        document.getElementById('player4-name').textContent = player4;
        document.getElementById('player1-name-back').textContent = player1;
        document.getElementById('player2-name-back').textContent = player2;
        document.getElementById('player3-name-back').textContent = player3;
        document.getElementById('player4-name-back').textContent = player4;
    });

    updateTotalParAndYardage();
});
