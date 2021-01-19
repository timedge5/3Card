const cardArray = [
    'img/3.png',
    'img/4.png',
    'img/5.png',
    'img/6.png',
    'img/7.png',
    'img/8.png',
    'img/9.png',
    'img/10.png',
    'img/J.png',
    'img/Q.png',
    'img/K.png',
]


$(document).ready(() => {
    $('.roundCounter').hide();
    $('.nextRound').hide();
    $('.playerNameInput').val('');
    $('.gameOver').hide();
    $('.playAgain').hide();
    // function to add player fields for more players
    addPlayerField();

    // function to start the game when go is clicked
    startGame();
    nextRound();
    restartGame();
});

// add player
function addPlayerField() {
    var i = ($('.playerField').children().length) + 1;
    $('.addPlayer').click(() => {
        if ($('.playerField').children().length >= 4) {
            console.log('woah');
            alert('Too many players! Let\'s stick to 4.');
        } else {
            $('.playerField').append(`<div class="player${i}">
        <input type="text" class="playerNameInput" id='player${i}NameInput' placeholder="Player ${i} Name">
        <h2 class='player${i}Name'></h2> <p class='score' id='p${i}score'>0</p> <input type="text" class='scoreInput' id='p${i}scoreInput' placeholder='Round Score'>
        </div>`);
            i++;
        }
    });

}

// check for max number of players (6)
// function checkNumberOfPlayers() {
//     if (($('.playerField').children().length+1) >=6 ) {

//     }
// }

// set player name from input
function setPlayerName() {
    let numOfPlayers = $('.playerField').children().length;
    for (let i = 1; i <= numOfPlayers; i++) {
        let playerName = $(`#player${i}NameInput`).val();
        $(`.player${i}Name`).text(playerName);
    }
}

// init game start
function startGame() {
    $('.startGame').click(() => {
        setPlayerName();
        $('.playerField input').hide();
        $('.playerField').addClass('scoreboardDisplay');
        $('.playerField div h2').css('display', 'flex');
        $('.addPlayers').hide();
        $('.startGame').hide();
        $('.addPlayer').hide();
        $('.roundCounter').show();
        $('.nextRound').show();
        $('.score').css('display', 'flex');
        $('.scoreInput').css('display', 'flex');
    })
}

// set player score
function setPlayerScore() {
    let numOfPlayers = $('.playerField').children().length;
    for (let i = 1; i <= numOfPlayers; i++) {
        if (isNaN(parseInt($(`#p${i}scoreInput`).val()))) {
            var scoreUpdate = 0;
        } else scoreUpdate = parseInt($(`#p${i}scoreInput`).val());
        let currentScore = parseInt($(`#p${i}score`).text());
        let updatedScore = scoreUpdate + currentScore;
        $(`#p${i}score`).text(updatedScore);
        $(`#p${i}scoreInput`).val('');
    }
}
// next round counter
function nextRound() {
    let i = 4;
    $('.nextRound').click(() => {
        checkRound(i);
        $('.roundCard').attr('src', cardArray[i - 3]);
        i++;
        setPlayerScore();
    })
}

// check if round is 13, and then reverse the order
function checkRound(val) {
    if (val === 13) {
        let i = 12;
        $('.nextRound').click(() => {
            checkEndRound(i);
            $('.roundCard').attr('src', cardArray[i - 3]);
            i--;
        })
    }
}

// check if it is the last round, and point to function that will show the end page
function checkEndRound(val) {
    if (val < 3) {
        $('.roundCounter').hide();
        $('.gameOver').show();
        $('.nextRound').hide();
        $('.playAgain').show();
        $('.scoreInput').css('display', 'none');
    }
}

// restart game
function restartGame() {
    $('.playAgain').click(() => {
        $('.gameOver').hide();
        $('.playerField input').show();
        $('.playerField').removeClass('scoreboardDisplay');
        $('.playerField div h2').css('display', 'none');
        $('.addPlayers').show();
        $('.startGame').show();
        $('.addPlayer').show();
        $('.score').css('display', 'none');
        $('.scoreInput').css('display', 'none');
        $('.playAgain').hide();
    })
}