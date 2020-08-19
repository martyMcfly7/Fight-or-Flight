// Victor Ortiz & Justin Yim   6/4/19

/*
 * **************************
 * Initialize Game Objects
 * Player, Items, Enemies...
 * **************************
 */

/////////////
//  Items  //
/////////////

// weapons
knife = { name: "Sharp Knife", damage: 2 };

bow = { name: "Hunting Bow", damage: 3 };

sword = { name: "Broadsword", damage: 4 };

axe = { name: "War Axe", damage: 5 };

wand = { name: "Magic Wand", damage: 6 };

godSpear = { name: "Spear of the Hero", damage: 10 };

// Potions
smallPotion = { heal: 5 };

largePotion = { heal: 15 };

/////////////
// Player  //
/////////////

// player object, which consists of a name, health, and experience and item(s)
player = {
    name: "",
    health: 0,
    weapon: knife,
    currentXP: 0,
    treasures: 0
};

/////////////
// Enemies //
/////////////

ogre = { name: "Ogre", hp: 15, attack: 10, xpGranted: 25, escapeChance: .25, drop: wand };

troll = { name: "Troll", hp: 8, attack: 3, xpGranted: 5, escapeChance: .60, drop: bow };

centaur = { name: "Centaur", hp: 12, attack: 4, xpGranted: 15, escapeChance: .35, drop: axe };

gargoyle = { name: "Gargoyle", hp: 10, attack: 5, xpGranted: 10, escapeChance: .40, drop: sword };

minotaur = { name: "Minotaur", hp: 14, attack: 6, xpGranted: 10, escapeChance: .50, drop: knife };

// ...Game objects finished initializing
// Begin Methods for game functions...

// Set up game
function startOfGame() {
    player.name = prompt("What is your name?"); {
        if (player.name == "" | player.name == null) {
            player.name = "Player One";
        }
    }
    document.getElementById("playerName").innerHTML = player.name;
    player.health = 25;
    player.weapon = knife;
    player.currentXP = 0;
    player.treasures = 0;
	updateUI();
    console.log("Welcome to Fight or Flight!\n\n" +
        "You are an adventurer seeking to grow strong enough to leave your home. \n" +
        "Defeat monsters to gain experience, keep fighting until you are confident \n" +
        "enough to leave on a real adventure!\n\n" +
        "Player Name set to: " + player.name + "\n\n");
}

// win game at 100 experience points
function winGame() {
    if (player.currentXP >= 100) {
        alert("Congratulations " + player.name + "!\n\n" +
            "You have become a veteran adventurer and monster slayer.\n" +
            "You decide to rest to prepare for tomorrow...");
        setColor("gold");
        console.clear();
        gameSummary();
        console.log(sessionStorage.getItem("thisPlay"));
        playAgain();
    }
}

// lose game at 0 or less health
function endOfGame() {
    if (player.health < 1) {
        stopTimer();
        setColor("red");
        alert("Game Over!");
        console.clear();
        console.log("\n" + player.name + " has been killed!\n\n");
        gameSummary();
        console.log(sessionStorage.getItem("thisPlay"));
        playAgain();
    }
}

// ask player to play again
function playAgain() {
    if (confirm("Play again " + player.name + "?")) {
        setColor("grey");
        console.clear();
        startOfGame();
    }
    else {
        setColor("grey");
        player.health = 25;
        player.currentXP = 0;
        updateUI();
        console.clear();
        gameSummary();
        console.log(sessionStorage.getItem("thisPlay"));
    }
}

// method to store play history and show the user
function gameSummary() {
    var message = "**** Last Play Record ****\n\n" + "Player Name: " + player.name + "\n\n" +
        "Total Experience: " + player.currentXP + "\n\n" +
        "Equipped Weapon: " + player.weapon.name + "\n\n" +
        "**** Last Play Record ****\n\n";
    sessionStorage.setItem("thisPlay", message);
}

// update status on page & check if win or end of game condition
function updateUI() {
    document.getElementById("numHealth").innerHTML = player.health;
    document.getElementById("numCurrentXP").innerHTML = player.currentXP;
    document.getElementById("currentWeapon").innerHTML = player.weapon.name;
    document.getElementById("weaponDamage").innerHTML = player.weapon.damage;
    document.getElementById("treasureCount").innerHTML = player.treasures;
    // check if experience points are 100 or more, if so player wins
    winGame();
    // zero or less health, game over
    endOfGame();
}

// change background color
function setColor(color) {
    document.body.style.background = color;
}

// method that generates a random event encounter
function callRandomEvent() {
    // random number from 0 to 1 multiply by cases, round to nearest whole integer
    var randomNum = Math.floor(Math.random() * 6) // multiply by total number of cases + 1
    switch (randomNum) {
        case 1:
            stopTimer();
            eventOne();
            startTimer();
            document.getElementById("actionView").src = "images/startRoad.jpg";
            break;
        case 2:
            stopTimer();
            eventTwo();
            startTimer();
            document.getElementById("actionView").src = "images/startRoad.jpg";
            break;
        case 3:
            stopTimer();
            eventThree();
            startTimer();
            document.getElementById("actionView").src = "images/startRoad.jpg";
            break;
        case 4:
            stopTimer();
            eventFour();
            startTimer();
            document.getElementById("actionView").src = "images/startRoad.jpg";
            break;
        case 5:
            stopTimer();
            eventFive();
            startTimer();
            document.getElementById("actionView").src = "images/startRoad.jpg";
            break;
    }
}

/**************************************************************************
 There are 5 random events that can occur, below are all possible events
 **************************************************************************/

// first random event is finding a healing potion
function eventOne() {
    document.getElementById("actionView").src = "images/smallPotion.jpg";
    if (confirm("You found a Small Health Potion!\n\n" +
        "'OK' to drink it or 'Cancel' to save it.")) {
        setColor("green");
        if (player.health <= 50) {
            player.health += smallPotion.heal;
            console.log("You gained " + smallPotion.heal + " health.");
        }
        else
            console.log("You greedily gulp the potion down, but nothing happens...\n" +
                "No overhealing!");
    }
    else {
        // if player does not drink it, it is added to the treasure count
        player.treasures ++;
        setColor("grey");
        console.log("You decide to stash the potion in your bag.");
    }
    updateUI();
}

// second random event is finding a large health potion
function eventTwo() {
    document.getElementById("actionView").src = "images/bigPotion.jpg";
    if (confirm("You found a Large Health Potion!\n\n" +
        "'OK' to drink it or 'Cancel' to save it.")) {
        setColor("green");
        if (player.health <= 50) {
            player.health += largePotion.heal;
            console.log("You gained " + largePotion.heal + " health.");
        }                
    }
    else {
        player.treasures += 1;
        setColor("grey");
        console.log("You decide to stash potion in your bag.");
    }
    updateUI();
}

// third random event is responsible for monster encounters
function eventThree() {
    alert("You see something ahead...\n" +
        "It's a monster!");
    setColor("yellow");
    callRandomEnemy();
}

// fourth random event you encounter a shrine
function eventFour() {
    document.getElementById("actionView").src = "images/shrine.jpg";
    if (confirm("You encounter a shrine to the gods...\n" +
        "Offer your stashed items to the shrine?")) {
        setColor("grey");
        console.log("You offer your treasures to the shrine.");
        if (player.treasures >= 15) {
            player.treasures -= 15;
            player.weapon = godSpear;
            setColor("gold");            
            console.log("A loud crack of lightning shoots down and carves a crater next to you.\n" +
                "Crackling with energy, an ornate spear is embedded in the ground. You pick it up.");
        }
        else {
            player.treasures -= player.treasures;
            console.log("Your offering wasn't enough to please the gods...");
        }
        updateUI();
    }
    else {
        setColor("grey");
        console.log("You walk past the shrine. The Gods can find their own offerings.");
    }
}

// fifth random event you encounter a dead adventurer
function eventFive() {
    document.getElementById("actionView").src = "images/corpse.jpg";
    if (confirm("A dead adventurer lies across the road.\n" +
        "Loot the body?")) {
        player.treasures += 3;
        setColor("yellow");
        updateUI();
        console.log("Sifting through the remains, you find several gold coins and take them.");
    }
    else {
        setColor("grey");
        console.log("You let the dead rest, theirs is not yours to take.");
    }
}

// method that generates a random enemy encounter
function callRandomEnemy() {
    // random number from 0 to 1 multiply by cases, round to nearest whole integer
    var randomNum = Math.floor(Math.random() * 6) // multiply by total number of cases + 1
    switch (randomNum) {
        case 1:
            enemyOne();
            break;
        case 2:
            enemyTwo();
            break;
        case 3:
            enemyThree();
            break;
        case 4:
            enemyFour();
            break;
        case 5:
            enemyFive();
            break;
    }
}

// first random method that generates an ogre encounter
function enemyOne() {    
    document.getElementById("actionView").src = "images/ogre.jpg";
    if (confirm("You got attacked by an Orge!\n" +
        "Try to fight it?\n\n" +
        "'OK' to fight or 'Cancel' to try to escape.")) {
        setColor("grey");
        // call method to fight ogre
        deathMatch(ogre);       
    }
    else {
        // call escape method to test if escape action fails or succeeds
        if (escape(ogre)) {
            setColor("green");
            console.log("You got away by the skin of your teeth!");
        }
        else {
            setColor("red");
            player.health -= ogre.attack;
            console.log("You got injured trying to escape, you lost " + enemy.attack + " health.");
            deathMatch(ogre);   
        }
    }
}

// second random method that generates a troll encounter
function enemyTwo() {
    document.getElementById("actionView").src = "images/troll.jpg";
    if (confirm("You got attacked by a Troll!\n" +
        "Try to fight it?\n\n" +
        "'OK' to fight or 'Cancel' to try to escape.")) {
        setColor("grey");
        deathMatch(troll);    
    }
    else {
        if (escape(troll)) {
            setColor("green");
            console.log("You got away by the skin of your teeth!");
        }
        else {
            setColor("red");
            player.health -= troll.attack;
            console.log("You got injured trying to escape, you lost " + enemy.attack + " health.");
            deathMatch(troll);
        }
    }
}

// third random method that generates an centaur encounter
function enemyThree() {
    document.getElementById("actionView").src = "images/centaur.jpg";
    if (confirm("You got attacked by a Centaur!\n" +
        "Try to fight it?\n\n" +
        "'OK' to fight or 'Cancel' to try to escape.")) {
        setColor("grey");
        deathMatch(centaur);
    }
    else {
        if (escape(centaur)) {
            setColor("green");
            console.log("You got away by the skin of your teeth!");
        }
        else {
            setColor("red");
            player.health -= centaur.attack;
            console.log("You got injured trying to escape, you lost " + enemy.attack + " health.");
            deathMatch(centaur);
        }
    }
}

// fourth random method that generates an gargoyle encounter
function enemyFour() {
    document.getElementById("actionView").src = "images/gargoyle.jpg";
    if (confirm("You got attacked by a Gargoyle!\n" +
        "Try to fight it?\n\n" +
        "'OK' to fight or 'Cancel' to try to escape.")) {
        setColor('grey');
        deathMatch(gargoyle);
    }
    else {
        if (escape(gargoyle)) {
            setColor("green");
            console.log("You got away by the skin of your teeth!");
        }
        else {
            setColor("red");
            player.health -= gargoyle.attack;
            console.log("You got injured trying to escape, you lost " + enemy.attack + " health.");
            deathMatch(gargoyle);
        }
    }
}

// fifth random method that generates an minotaur encounter
function enemyFive() {
    document.getElementById("actionView").src = "images/minotaur.jpg";
    if (confirm("You got attacked by a Minotaur!\n" +
        "Try to fight it?\n\n" +
        "'OK' to fight or 'Cancel' to try to escape.")) {
        setColor("grey");
        deathMatch(minotaur);
    }
    else {
        if (escape(minotaur)) {
            setColor("green");
            console.log("You got away by the skin of your teeth!");
        }
        else {
            setColor("red");
            player.health -= minotaur.attack;
            console.log("You got injured trying to escape, you lost " + enemy.attack + " health.");
            deathMatch(minotaur);
        }
    }
}

//////////////////////////////////////////////////
// Time methods that determine pace of the game //
//////////////////////////////////////////////////

ticks = 0; // start at zero ticks
// clockTick function to time called events
function clockTick() {
    // ticks in 1/2 seconds
    ticks = (ticks + 1) % 1000;

    // calls a random event every 2 seconds
    if ((ticks % 4) == 0)
        callRandomEvent();
}

interval = 0; // startTimer & stopTimer variable
// startTimer sets clockTick to run at 500 milliseconds
function startTimer() {
    interval = setInterval(clockTick, 500);
}

// stops the clockTick function
function stopTimer() {
    clearInterval(interval);
}

///////////////////////////////////////////////////////////////////////////////////////////////
// event listeners that allow user to use enter and space to start / pause game              //
// source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_trigger_button_enter //
///////////////////////////////////////////////////////////////////////////////////////////////

// use enter key to start game
addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("startClockTicks").click();
    }
});

// use spacebar key to pause game
addEventListener("keyup", function (event) {
    if (event.keyCode === 32) {
        event.preventDefault();
        document.getElementById("stopClockTicks").click();
    }
});

//////////////////////////////////////////
// Procedures for dealing with monsters //
//////////////////////////////////////////

// method where you deal damage to enemy or kill the enemy
function fight(enemy, enemyHP) {

    if (player.weapon.damage < enemyHP) {
        setColor("red");
        player.health -= enemy.attack;
        enemyHP -= player.weapon.damage;
        console.log("You dealt " + player.weapon.damage + " damage to the " + enemy.name +
            " and lost " + enemy.attack + " health.");
        updateUI();
    }
    else if (player.weapon.damage >= enemyHP) {
        enemyHP -= player.weapon.damage;
        setColor("gold");
        player.currentXP += enemy.xpGranted;
        console.log("You slew the monster and gained " + enemy.xpGranted + " experience!");
        if (confirm("The " + enemy.name + " dropped a " + enemy.drop.name + ". Equip it? \n\n " +
            "You will replace your current weapon.")) {
            player.weapon = enemy.drop;
        }
        else {
            console.log("You add the " + enemy.drop.name + " to your stash.");
            player.treasures += 1;
        }
        updateUI();
    }        
    return enemyHP;
}

// method where player must either A: kill the monster or B: successfully flees the fight
function deathMatch(enemy) {
    var currentEnemyHealth = enemy.hp;
    currentEnemyHealth = fight(enemy, currentEnemyHealth);
    // fight loop continues until either the player or monster is dead
    while (player.health > 0 && currentEnemyHealth > 0) {
        
        if (player.weapon.damage < enemy.hp) {
            if (confirm("Continue the fight or flee?\n\n" +
                "'OK' to fight or 'Cancel' to try to escape.")) {
                currentEnemyHealth = fight(enemy, currentEnemyHealth);
            }
            else {
                if (escape(enemy)) {                    
                    break;
                }
                else if (!escape(enemy)) {                    
                    currentEnemyHealth = fight(enemy, currentEnemyHealth);
                }
            }
        }
        else {
            setColor("gold");
            player.currentXP += enemy.xpGranted;
            console.log("You gained " + enemy.xpGranted + " experience!");
            updateUI();
            break;
        }     
    }
}

// boolean method that determines if player made a successful escape attempt
function escape(enemy) {
    var chance = Math.random();
    if (chance > enemy.escapeChance) {
        setColor("green");                    
        console.log("Your escape roll was: " + Math.floor(chance * 100) + "%\n" /*+ 
            "You got away by the skin of your teeth!"*/);
        return true;
    }
    else {
        setColor("red");
        console.log("Your escape roll was: " + Math.floor(chance * 100) + "%\n" +
            "Escape failed, you have to fight again!");
        return false;
    }
}

function checkStatus(player) {
    var properties = [];
    for (property in player) {
        properties.push(property);
    }
    console.log(properties);
}
