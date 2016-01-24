// -- Turning off the annoying linter ---
/*global $*/
/*global document*/

//--------- global variables ------------
// creating the card ranks: rank[]
var rank = "A 2 3 4 5 6 7 8 9 10 J Q K".split(" ");
// creating the card suits: suit[]
var suit = ['H', 'S', 'D', 'C'];
// -- below version will be better with object array for deck[] --//
//var suit = ["Hearts", "Spades", "Diamonds", "Clubs"]
// creating an empty array which will hold the deck
var deck = [];
// creating an empty array which will temporarily hold card values
var values = [];
// creating a variable to store the number of players 1-3
var number_of_players;
// creating a variable to store cards for player 1
var player1_cards = [];
// creating a variable to store cards for player 2
var player2_cards = [];
// creating a variable to store cards for player 3
var player3_cards = [];
// creating a variable to store cards for dealer
var dealer_cards = [];
// creating a variable to store values of player 1 cards
var player1_value = 0;
// creating a variable to store values of player 2 cards
var player2_value = 0;
// creating a variable to store values of player 3 cards
var player3_value = 0;
// creating a variable to store values of the dealer's cards
var dealer_value = 0;
// creating a variable to store player 1 bank - starting with 100
var player1_bank = 100;
// creating a variable to store player 2 bank - starting with 100
var player2_bank = 100;
// creating a variable to store player 3 bank - starting with 100
var player3_bank = 100;
// creating a variable to store player 1 bet
var player1_bet = 0;
// creating a variable to store player 2 bet
var player2_bet = 0;
// creating a variable to store player 3 bet
var player3_bet = 0;

// ---------- end of global variables ---------

console.log('loaded');

$(document).ready(runSetup);

function runSetup() {
    $('#rules').click(rules);
    $('#start').click(start_game);
}

// -*-*-* function that builds deck as string array -*-*-
function build_deck() {
    for (var r = 0; r < rank.length; r++) {
        for (var s = 0; s < suit.length; s++) {
            deck.push(rank[r] + suit[s]);
            // -----The above creates the deck array as strings - the below creates the deck as objects.  
            // Objects may be better but will see --//            
            //            deck.push({
            //                "rank": rank[r],
            //                "suit": suit[s]
            //            });
            // ---------------------------------------- //
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////

// -*-*-* function to show/hide rules -*-*-
function rules() {
    console.log('show rules');
    // ---- update css to show the rules div --
    $('.rules').css('display', 'block');
    // ---- update css to hide the rules div --
    $('#close_rules').click(function () {
        $('.rules').css('display', 'none');
    });
}

// -*-*-* function to start game -*-*-
function start_game() {
    console.log('Starting the game');
    build_deck();
    console.log('deck built');
    $('#start').css('display', 'none');
    $('#playerselect').css('display', 'block');
    $('#1pls').click(function () {
        number_of_players = 1;
        console.log('1 player');
        $('#playerselect').css('display', 'none');
        console.log('How much would you each like to bet?');
        player1_betting();
    });
    $('#2pls').click(function () {
        number_of_players = 2;
        console.log('2 players');
        $('#playerselect').css('display', 'none');
        console.log('How much would you each like to bet?');
        player1_betting();
    });
    $('#3pls').click(function () {
        number_of_players = 3;
        console.log('3 players');
        $('#playerselect').css('display', 'none');
        console.log('How much would you each like to bet?');
        player1_betting();
    });
}

function player1_betting() {
    $('#pl1bets').css('display', 'block');
    $('#pl1bet1').click(function () {
        $('#pl1bet1').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player1_bet = 2;
        player1_bank -= player1_bet;
        console.log("Player 1 bets " + player1_bet + " and has " + player1_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl1bet2').click(function () {
        $('#pl1bet2').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player1_bet = 4;
        player1_bank -= player1_bet;
        console.log("Player 1 bets " + player1_bet + " and has " + player1_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl1bet3').click(function () {
        $('#pl1bet3').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player1_bet = 6;
        player1_bank -= player1_bet;
        console.log("Player 1 bets " + player1_bet + " and has " + player1_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl1bet4').click(function () {
        $('#pl1bet4').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player1_bet = 8;
        player1_bank -= player1_bet;
        console.log("Player 1 bets " + player1_bet + " and has " + player1_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl1bet5').click(function () {
        $('#pl1bet5').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player1_bet = 10;
        player1_bank -= player1_bet;
        console.log("Player 1 bets " + player1_bet + " and has " + player1_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    if (number_of_players === 1) {
        $('#pl1bet_h2').append("Your bank = " + player1_bank + ", how much would you like to bet?");
        $('.next').css('display', 'none');
    } else if (number_of_players === 2 || number_of_players === 3) {
        $('#pl1bet_h2').append("Player 1 your bank = " + player1_bank + ", how much would you like to bet?");
        $('.deal').css('display', 'none');
        $('.next').click(function () {
            if (player1_bet !== 0) {
                player2_betting();
            }
        });
    }
}

function player2_betting() {
    $('.next').off('click');
    $('.deal').off('click');
    $('.deal').css('display', 'inline-block');
    $('#pl1bets').css('display', 'none');
    $('#pl2bets').css('display', 'block');
    $('#pl2bet_h2').append("Player 2 your bank = " + player2_bank + ", how much would you like to bet?");
    $('#pl2bet1').click(function () {
        $('#pl2bet1').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player2_bet = 2;
        player2_bank -= player2_bet;
        console.log("Player 2 bets " + player2_bet + " and has " + player2_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl2bet2').click(function () {
        $('#pl2bet2').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player2_bet = 4;
        player2_bank -= player2_bet;
        console.log("Player 2 bets " + player2_bet + " and has " + player2_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl2bet3').click(function () {
        $('#pl2bet3').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player2_bet = 6;
        player2_bank -= player2_bet;
        console.log("Player 2 bets " + player2_bet + " and has " + player2_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl2bet4').click(function () {
        $('#pl2bet4').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player2_bet = 8;
        player2_bank -= player2_bet;
        console.log("Player 2 bets " + player2_bet + " and has " + player2_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl2bet5').click(function () {
        $('#pl2bet5').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player2_bet = 10;
        player2_bank -= player2_bet;
        console.log("Player 2 bets " + player2_bet + " and has " + player2_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    if (number_of_players === 2) {
        $('.next').css('display', 'none');
    } else if (number_of_players === 3) {
        $('.deal').css('display', 'none');
        $('.next').click(function () {
            if (player2_bet !== 0) {
                player3_betting();
            }
        });
    }
}

function player3_betting() {
    $('.deal').off('click');
    $('.deal').css('display', 'inline-block');
    $('#pl2bets').css('display', 'none');
    $('#pl3bets').css('display', 'block');
    $('#pl3bet_h2').append("Player 3 your bank = " + player3_bank + ", how much would you like to bet?");
    $('#pl3bet1').click(function () {
        $('#pl3bet1').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player3_bet = 2;
        player3_bank -= player3_bet;
        console.log("Player 3 bets " + player3_bet + " and has " + player3_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl3bet2').click(function () {
        $('#pl3bet2').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player3_bet = 4;
        player3_bank -= player3_bet;
        console.log("Player 3 bets " + player3_bet + " and has " + player3_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl3bet3').click(function () {
        $('#pl3bet3').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player3_bet = 6;
        player3_bank -= player3_bet;
        console.log("Player 3 bets " + player3_bet + " and has " + player3_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl3bet4').click(function () {
        $('#pl3bet4').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player3_bet = 8;
        player3_bank -= player3_bet;
        console.log("Player 3 bets " + player3_bet + " and has " + player3_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
    $('#pl3bet5').click(function () {
        $('#pl3bet5').css('background-color', '#4c4d46').css('color', '#e8e7e2');
        player3_bet = 10;
        player3_bank -= player3_bet;
        console.log("Player 3 bets " + player3_bet + " and has " + player3_bank + " left in the bank.");
        click_deal();
        plbet_off();
    });
}

function plbet_off() {
    $('#pl1bet1').off('click');
    $('#pl1bet2').off('click');
    $('#pl1bet3').off('click');
    $('#pl1bet4').off('click');
    $('#pl1bet5').off('click');
    $('#pl2bet1').off('click');
    $('#pl2bet2').off('click');
    $('#pl2bet3').off('click');
    $('#pl2bet4').off('click');
    $('#pl2bet5').off('click');
    $('#pl3bet1').off('click');
    $('#pl3bet2').off('click');
    $('#pl3bet3').off('click');
    $('#pl3bet4').off('click');
    $('#pl3bet5').off('click');
}

function click_deal() {
    $('.deal').click(function () {
        deal_cards();
        build_table();
    });
}

function build_table() {
    $('#pl1bets').css('display', 'none');
    $('#pl2bets').css('display', 'none');
    $('#pl3bets').css('display', 'none');
    $('#table').css('display', 'block');
    if (number_of_players === 1) {
        $('.player1').css('display', 'block');
    } else if (number_of_players === 2) {
        $('.player1').css('display', 'block');
        $('.player2').css('display', 'block');
    } else if (number_of_players === 3) {
        $('.player1').css('display', 'block');
        $('.player2').css('display', 'block');
        $('.player3').css('display', 'block');
    }
}

// -*-*-* function to deal cards to players and dealer - stored in variables -*-*-
function deal_cards() {
    $('.deal').off('click');
    // based on number_of_players variable
    if (number_of_players === 1) {
        player1_cards.push(get_random_card(), get_random_card());
        console.log("player 1 has " + player1_cards);
        player1_value = card_values(player1_cards);
        console.log("The value of Player 1's cards is " + player1_value);
        pl1cards();
    } else if (number_of_players === 2) {
        player1_cards.push(get_random_card(), get_random_card());
        console.log("player 1 has " + player1_cards);
        player1_value = card_values(player1_cards);
        console.log("The value of Player 1's cards is " + player1_value);
        pl1cards();
        player2_cards.push(get_random_card(), get_random_card());
        console.log("player 2 has " + player2_cards);
        player2_value = card_values(player2_cards);
        console.log("The value of Player 2's cards is " + player2_value);
        pl2cards();
    } else if (number_of_players === 3) {
        player1_cards.push(get_random_card(), get_random_card());
        console.log("player 1 has " + player1_cards);
        player1_value = card_values(player1_cards);
        console.log("The value of Player 1's cards is " + player1_value);
        pl1cards();
        player2_cards.push(get_random_card(), get_random_card());
        console.log("player 2 has " + player2_cards);
        player2_value = card_values(player2_cards);
        console.log("The value of Player 2's cards is " + player2_value);
        pl2cards();
        player3_cards.push(get_random_card(), get_random_card());
        console.log("player 3 has " + player3_cards);
        player3_value = card_values(player3_cards);
        console.log("The value of Player 3's cards is " + player3_value);
        pl3cards();
    }
    dealer_cards.push(get_random_card(), get_random_card());
    console.log("dealer has " + dealer_cards);
    dealer_value = card_values(dealer_cards);
    console.log("The value of the Dealer's cards is " + dealer_value);
    dealer_first();
    console.log("deck has " + deck.length + " remaining!");
    hit_stand();
}

function pl1cards() {
    for (var c = 0; c < player1_cards.length; c++) {
        var card = player1_cards[c];
        $('#pl1cards').append('<img src="images/' + card + '.png" alt="' + card + '" id="' + card + '" class="card">');
    }
}

function pl2cards() {
    for (var c = 0; c < player2_cards.length; c++) {
        var card = player2_cards[c];
        $('#pl2cards').append('<img src="images/' + card + '.png" alt="' + card + '" id="' + card + '" class="card">');
    }
}

function pl3cards() {
    for (var c = 0; c < player3_cards.length; c++) {
        var card = player3_cards[c];
        $('#pl3cards').append('<img src="images/' + card + '.png" alt="' + card + '" id="' + card + '" class="card">');
    }
}

function dealer_first() {
    $('#dealercards').append('<img src="images/cardback.png" alt="cardback" id="cardback" class="card">');
    var card = dealer_cards[1];
    $('#dealercards').append('<img src="images/' + card + '.png" alt="' + card + '" id="' + card + '" class="card">');
}

function dealercards() {
    $('#dealercards img').remove();
    for (var c = 0; c < dealer_cards.length; c++) {
        var card = dealer_cards[c];
        $('#dealercards').append('<img src="images/' + card + '.png" alt="' + card + '" id="' + card + '" class="card">');
    }
}

function get_random_card() {
    // -*-*- if the deck[] is empty then rebuild - like having a multiple deck shoe
    if (deck.length === 0) {
        build_deck();
    }
    // -*-*- retrieves random card from deck[]
    var card_location = Math.random() * deck.length;
    card_location = Math.floor(card_location);
    var card = deck[card_location];
    deck.splice(card_location, 1);
    return card;
}

// -*-*-* function to find the card values and store in values[]
function card_values(value) {
    values.length = 0;
    for (var i = 0; i < value.length; i++) {
        var card = value[i].charAt(0);
        if (card == 'A') {
            card = 11;
        } else if (card == 'J' || card == 'Q' || card == 'K') {
            card = 10;
        } else if (card == '1') {
            card = 10;
        }
        values.push(parseFloat(card));
    }
    return sum_of_values();
}

// -*-*-* function to sum the card values for each player
function sum_of_values() {
    var cardValue = 0;
    for (var i = 0; i < values.length; i++) {
        cardValue += values[i];
    }
    return cardValue;
}

function hit_off() {
    $('#Player1_Hit').off('click');
    $('#Player2_Hit').off('click');
    $('#Player3_Hit').off('click');
    $('#Player1_Stand').off('click');
    $('#Player2_Stand').off('click');
    $('#Player3_Stand').off('click');
}

function pl1_bust() {
    console.log("Player 1 is Bust!");
    $('#pl1hitbustblackjack').append("Bust!");
    $('#pl1hitbustblackjack').css('display', 'inline-block');
}

function pl2_bust() {
    console.log("Player 2 is Bust!");
    $('#pl2hitbustblackjack').append("Bust!");
    $('#pl2hitbustblackjack').css('display', 'inline-block');
}

function pl3_bust() {
    console.log("Player 3 is Bust!");
    $('#pl3hitbustblackjack').append("Bust!");
    $('#pl3hitbustblackjack').css('display', 'inline-block');
}

function pl1_blackjack() {
    console.log("Player 1 has 21 YAY!");
    $('#pl1hitbustblackjack').append("BlackJack!");
    $('#pl1hitbustblackjack').css('display', 'inline-block');
}

function pl2_blackjack() {
    console.log("Player 2 has 21 YAY!");
    $('#pl2hitbustblackjack').append("BlackJack!");
    $('#pl2hitbustblackjack').css('display', 'inline-block');
}

function pl3_blackjack() {
    console.log("Player 3 has 21 YAY!");
    $('#pl3hitbustblackjack').append("BlackJack!");
    $('#pl3hitbustblackjack').css('display', 'inline-block');
}

function pl1_stand() {
    console.log("Player 1 Stands with " + player1_cards + " and a value of " + player1_value);
    $('#pl1hitbustblackjack').append("Stand!");
    $('#pl1hitbustblackjack').css('display', 'inline-block');
}

function pl2_stand() {
    console.log("Player 2 Stands with " + player2_cards + " and a value of " + player2_value);
    $('#pl2hitbustblackjack').append("Stand!");
    $('#pl2hitbustblackjack').css('display', 'inline-block');
}

function pl3_stand() {
    console.log("Player 3 Stands with " + player3_cards + " and a value of " + player3_value);
    $('#pl3hitbustblackjack').append("Stand!");
    $('#pl3hitbustblackjack').css('display', 'inline-block');
}

function pl1_hit_stand() {
    $('#Player1_Stand').click(function () {
        hit_off();
        pl1_stand();
        if (number_of_players === 1) {
            dealer_deal();
        } else {
            pl2_hit();
        }
    });
    $('#Player1_Hit').click(function () {
        if (player1_value >= 22) {
            hit_off();
            pl1_bust();
            if (number_of_players === 1) {
                dealer_deal();
            } else {
                pl2_hit();
            }
        } else if (player1_value === 21) {
            hit_off();
            pl1_blackjack();
            if (number_of_players === 1) {
                dealer_deal();
            } else {
                pl2_hit();
            }
        } else if (player1_value < 21) {
            var card = get_random_card();
            player1_cards.push(card);
            $('#pl1cards').append('<img src="images/' + card + '.png" alt="' + card + '" id="' + card + '" class="card">');
            console.log("player 1 has " + player1_cards);
            player1_value = card_values(player1_cards);
            console.log("The value of Player 1's cards is " + player1_value);
            if (player1_value >= 22) {
                hit_off();
                pl1_bust();
                if (number_of_players === 1) {
                    dealer_deal();
                } else {
                    pl2_hit();
                }
            } else if (player1_value === 21) {
                hit_off();
                pl1_blackjack();
                if (number_of_players === 1) {
                    dealer_deal();
                } else {
                    pl2_hit();
                }
            }
        }
    });
}

function pl2_hit_stand() {
    $('#Player2_Stand').click(function () {
        hit_off();
        pl2_stand();
        if (number_of_players === 2) {
            dealer_deal();
        } else {
            pl3_hit();
        }
    });
    $('#Player2_Hit').click(function () {
        if (player2_value >= 22) {
            hit_off();
            pl2_bust();
            if (number_of_players === 2) {
                dealer_deal();
            } else {
                pl3_hit();
            }
        } else if (player2_value === 21) {
            hit_off();
            pl2_blackjack();
            if (number_of_players === 2) {
                dealer_deal();
            } else {
                pl3_hit();
            }
        } else if (player2_value < 21) {
            var card = get_random_card();
            player2_cards.push(card);
            $('#pl2cards').append('<img src="images/' + card + '.png" alt="' + card + '" id="' + card + '" class="card">');
            console.log("player 1 has " + player2_cards);
            player2_value = card_values(player2_cards);
            console.log("The value of Player 2's cards is " + player2_value);
            if (player2_value >= 22) {
                hit_off();
                pl2_bust();
                if (number_of_players === 2) {
                    dealer_deal();
                } else {
                    pl3_hit();
                }
            } else if (player2_value === 21) {
                hit_off();
                pl2_blackjack();
                if (number_of_players === 2) {
                    dealer_deal();
                } else {
                    pl3_hit();
                }
            }
        }
    });
}

function pl3_hit_stand() {
    $('#Player3_Stand').click(function () {
        hit_off();
        pl3_stand();
        dealer_deal();
    });
    $('#Player3_Hit').click(function () {
        if (player3_value >= 22) {
            hit_off();
            pl3_bust();
            dealer_deal();
        } else if (player3_value === 21) {
            hit_off();
            pl3_blackjack();
            dealer_deal();
        } else if (player3_value < 21) {
            var card = get_random_card();
            player3_cards.push(card);
            $('#pl3cards').append('<img src="images/' + card + '.png" alt="' + card + '" id="' + card + '" class="card">');
            console.log("player 3 has " + player3_cards);
            player3_value = card_values(player3_cards);
            console.log("The value of Player 3's cards is " + player3_value);
            if (player3_value >= 22) {
                hit_off();
                pl3_bust();
                dealer_deal();
            } else if (player3_value === 21) {
                hit_off();
                pl3_blackjack();
                dealer_deal();
            }
        }
    });
}


function pl1_hit() {
    if (player1_value >= 22) {
        hit_off();
        pl1_bust();
        if (number_of_players === 1) {
            dealer_deal();
        } else {
            pl2_hit();
        }
    } else if (player1_value === 21) {
        hit_off();
        pl1_blackjack();
        if (number_of_players === 1) {
            dealer_deal();
        } else {
            pl2_hit();
        }
    } else if (player1_value < 21) {
        pl1_hit_stand();
    }
}

function pl2_hit() {
    if (player2_value >= 22) {
        hit_off();
        pl2_bust();
        if (number_of_players === 2) {
            dealer_deal();
        } else {
            pl3_hit();
        }
    } else if (player2_value === 21) {
        hit_off();
        pl2_blackjack();
        if (number_of_players === 2) {
            dealer_deal();
        } else {
            pl3_hit();
        }
    } else if (player2_value < 21) {
        pl2_hit_stand();
    }
}

function pl3_hit() {
    if (player3_value >= 22) {
        hit_off();
        pl3_bust();
        dealer_deal();
    } else if (player3_value === 21) {
        hit_off();
        pl3_blackjack();
        dealer_deal();
    } else if (player3_value < 21) {
        pl3_hit_stand();
    }
}

function hit_stand() {
    if (number_of_players === 1) {
        pl1_hit();
    } else if (number_of_players === 2) {
        pl1_hit();
    } else if (number_of_players === 3) {
        pl1_hit();
    }
}

function dealer_deal() {
    dealercards();
    while (dealer_value < 17) {
        var card = get_random_card();
        dealer_cards.push(card);
        $('#dealercards').append('<img src="images/' + card + '.png" alt="' + card + '" id="' + card + '" class="card">');
        dealer_value = card_values(dealer_cards);
        console.log("Dealer has " + dealer_cards + " with a value of " + dealer_value);
    }
    if (dealer_value >= 17 && dealer_value <= 21) {
        console.log("Dealer has " + dealer_cards + " and stands with a value of " + dealer_value);
        $('#dealerhitbustblackjack').append("Stand!");
        $('#dealerhitbustblackjack').css('display', 'inline-block');
    } else if (dealer_value > 21) {
        console.log("Dealer has " + dealer_cards + " with a value of " + dealer_value + " and is Bust!");
        $('#dealerhitbustblackjack').append("Bust!");
        $('#dealerhitbustblackjack').css('display', 'inline-block');
    }
    winners();
}

function winners() {
    if (number_of_players === 1) {
        player1_results();
    } else if (number_of_players === 2) {
        player1_results();
        player2_results();
    } else if (number_of_players === 3) {
        player1_results();
        player2_results();
        player3_results();
    }
    window.setTimeout(next_or_end, 2000);
}

function next_or_end() {
    $('.winners').fadeIn().css('display', 'block');
    if (number_of_players === 1) {
        $('.pl1bank').css('display', 'block');
        pl1bank();
    } else if (number_of_players === 2) {
        $('.pl1bank').css('display', 'block');
        $('.pl2bank').css('display', 'block');
        pl1bank();
        pl2bank();
    } else if (number_of_players === 3) {
        $('.pl1bank').css('display', 'block');
        $('.pl2bank').css('display', 'block');
        $('.pl3bank').css('display', 'block');
        pl1bank();
        pl2bank();
        pl3bank();
    }
    console.log("Play another hand or quit, you decide!!!!");
    $('#next_hand').click(function () {
        console.log("OK Starting the next hand, how much would you each like to bet?");
        player1_cards.length = 0;
        player2_cards.length = 0;
        player3_cards.length = 0;
        dealer_cards.length = 0;
        player1_value = 0;
        player2_value = 0;
        player3_value = 0;
        dealer_value = 0;
        player1_bet = 0;
        player2_bet = 0;
        player3_bet = 0;
        $('.winners').fadeOut().css('display', 'none');
        $('#table').css('display', 'none');
        remove_css();
        player1_betting();
    });
    $('#quit').click(function () {
        console.log("OK Bye Bye!");
        location.reload(true);
    });
}

function pl1bank() {
    $('#pl1bank').append(player1_bank);
}

function pl2bank() {
    $('#pl2bank').append(player2_bank);
}

function pl3bank() {
    $('#pl3bank').append(player3_bank);
}

function player1_results() {
    if (player1_value === 21 && player1_cards.length == 2 && player1_value != dealer_value) {
        player1_bet += player1_bet * 1.5;
        player1_bank += player1_bet;
        console.log("Player 1 WINS! And now has " + player1_bank + " in the bank.");
    } else if (player1_value <= 21 && player1_value > dealer_value) {
        player1_bet += player1_bet;
        player1_bank += player1_bet;
        console.log("Player 1 WINS! And now has " + player1_bank + " in the bank.");
    } else if (player1_value <= 21 && dealer_value > 21) {
        player1_bet += player1_bet;
        player1_bank += player1_bet;
        console.log("Player 1 WINS! And now has " + player1_bank + " in the bank.");
    } else if (player1_value <= 21 && player1_value === dealer_value) {
        player1_bank += player1_bet;
        console.log("It's a PUSH! Player 1 has " + player1_bank + " in the bank.");
    } else if (player1_value <= 21 && dealer_value <= 21 && player1_value < dealer_value) {
        console.log("Player 1 loses and still has " + player1_bank + " in the bank.");
    } else if (player1_value > 21) {
        console.log("Player 1 is Bust and now has " + player1_bank + " in the bank.");
    }
}

function player2_results() {
    if (player2_value === 21 && player2_cards.length == 2 && player2_value != dealer_value) {
        player2_bet += player2_bet * 1.5;
        player2_bank += player2_bet;
        console.log("Player 2 WINS! And now has " + player2_bank + " in the bank.");
    } else if (player2_value <= 21 && player2_value > dealer_value) {
        player2_bet += player2_bet;
        player2_bank += player2_bet;
        console.log("Player 2 WINS! And now has " + player2_bank + " in the bank.");
    } else if (player2_value <= 21 && dealer_value > 21) {
        player2_bet += player2_bet;
        player2_bank += player2_bet;
        console.log("Player 2 WINS! And now has " + player2_bank + " in the bank.");
    } else if (player2_value <= 21 && player2_value === dealer_value) {
        player2_bank += player2_bet;
        console.log("It's a PUSH! Player 2 has " + player2_bank + " in the bank.");
    } else if (player2_value <= 21 && dealer_value <= 21 && player2_value < dealer_value) {
        console.log("Player 2 loses and still has " + player2_bank + " in the bank.");
    } else if (player1_value > 21) {
        console.log("Player 2 is Bust and now has " + player2_bank + " in the bank.");
    }
}

function player3_results() {
    if (player3_value === 21 && player3_cards.length == 2 && player3_value != dealer_value) {
        player3_bet += player3_bet * 1.5;
        player3_bank += player3_bet;
        console.log("Player 3 WINS! And now has " + player3_bank + " in the bank.");
    } else if (player3_value <= 21 && player3_value > dealer_value) {
        player3_bet += player3_bet;
        player3_bank += player3_bet;
        console.log("Player 3 WINS! And now has " + player3_bank + " in the bank.");
    } else if (player3_value <= 21 && dealer_value > 21) {
        player3_bet += player3_bet;
        player3_bank += player3_bet;
        console.log("Player 3 WINS! And now has " + player3_bank + " in the bank.");
    } else if (player3_value <= 21 && player3_value === dealer_value) {
        player3_bank += player3_bet;
        console.log("It's a PUSH! Player 3 has " + player3_bank + " in the bank.");
    } else if (player3_value <= 21 && dealer_value <= 21 && player3_value < dealer_value) {
        console.log("Player 3 loses and still has " + player3_bank + " in the bank.");
    } else if (player3_value > 21) {
        console.log("Player 3 is Bust and now has " + player3_bank + " in the bank.");
    }
}

function remove_css() {
    $('#pl1bet1').css('background-color', '').css('color', '#4c4d46');
    $('#pl1bet2').css('background-color', '').css('color', '#4c4d46');
    $('#pl1bet3').css('background-color', '').css('color', '#4c4d46');
    $('#pl1bet4').css('background-color', '').css('color', '#4c4d46');
    $('#pl1bet5').css('background-color', '').css('color', '#4c4d46');
    $('#pl2bet1').css('background-color', '').css('color', '#4c4d46');
    $('#pl2bet2').css('background-color', '').css('color', '#4c4d46');
    $('#pl2bet3').css('background-color', '').css('color', '#4c4d46');
    $('#pl2bet4').css('background-color', '').css('color', '#4c4d46');
    $('#pl2bet5').css('background-color', '').css('color', '#4c4d46');
    $('#pl3bet1').css('background-color', '').css('color', '#4c4d46');
    $('#pl3bet2').css('background-color', '').css('color', '#4c4d46');
    $('#pl3bet3').css('background-color', '').css('color', '#4c4d46');
    $('#pl3bet4').css('background-color', '').css('color', '#4c4d46');
    $('#pl3bet5').css('background-color', '').css('color', '#4c4d46');
    $('#pl1bet_h2').text("");
    $('#pl2bet_h2').text("");
    $('#pl3bet_h2').text("");
    $('#dealerhitbustblackjack').text("");
    $('#pl1hitbustblackjack').text("");
    $('#pl2hitbustblackjack').text("");
    $('#pl3hitbustblackjack').text("");
    $('.cards img').remove();
    $('#pl1bank').text("");
    $('#pl2bank').text("");
    $('#pl3bank').text("");
    $('button').unbind();
}
