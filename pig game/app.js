/// ON loading what will happe .....
var activePlayer, dice, scores, activePlayer, gamePlaying;
document.querySelector('.dice').style.display = 'none'

// Funtion to Reset to default ...
function setToDefault() {
    scores = [0, 0]
    activePlayer = 0
    gamePlaying = true
    document.querySelector('.dice').style.display = 'none'
    for (i = 0; i <= 1; i++) {
        document.getElementById("score-" + i).textContent = 0
        document.querySelector("#current-" + i).textContent = 0
    }
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-1-panel').classList.remove('active')
}
setToDefault()
/* select the html elements */

function changeActivePlayer() {
    return activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
}

function btn() {
    if (gamePlaying) {
        dice = Math.ceil(Math.random() * 6)
        document.querySelector('.dice').src = 'dice-' + dice + '.png'
        document.querySelector('.dice').style.display = 'block'
        console.log(dice)
        if (dice == 1) {
            scores[activePlayer] = 0
            document.getElementById("score-" + activePlayer).textContent = 0
            document.querySelector("#current-" + activePlayer).textContent = 0
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            activePlayer = changeActivePlayer()
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('active')
            return
        }
        document.querySelector("#current-" + activePlayer).textContent = dice
    }
}

function btnhold() {
    if (gamePlaying) {
        var pts = document.querySelector('#current-' + activePlayer).textContent
        console.log(pts)
        scores[activePlayer] += Number(pts)
        if (scores[activePlayer] >= 10) {
            document.querySelector("#score-" + activePlayer).textContent = "Winner!"
            gamePlaying = false
            return
        }
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]
        document.querySelector("#current-" + activePlayer).textContent = 0
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        activePlayer = changeActivePlayer()
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active')
    }
}

document.querySelector('.btn-new').addEventListener('click', setToDefault)
document.querySelector('.btn-roll').addEventListener('click', btn)
document.querySelector('.btn-hold').addEventListener('click', btnhold)




