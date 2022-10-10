import characterData from './data.js'
import Character from './Character.js'

let monsterArray=["orc","demon","goblin"];

function getNewMonsterData(){
    const nextMonsterData=characterData[monsterArray.shift()];
    return nextMonsterData ? new Character(nextMonsterData):{}
}

function endTemplete(endMessage,endEmoji){
   return (`
    <div class="end-game">
        <h2>Game Over</h2>
        <h3>${endMessage}</h3>
        <p class="end-emoji">${endEmoji}</p>
    </div>
    `)
}

const endGame=()=>{
    const endMessage=(wizard.health===0 && NewMonster.health===0) ? "No Victors - all creatures are dead":
    wizard.health > 0 ? "The Wizard Wins":
    "The Orc Wins";

    const endEmoji= (wizard.health===0 && NewMonster.health===0) ? "☠️":wizard.health>0 ?"😀":"☠️";

    setTimeout(()=>{document.body.innerHTML=endTemplete(endMessage,endEmoji);},1500);
    
}



function attack(){
    wizard.getDiceHtml();
    NewMonster.getDiceHtml();
    wizard.takeDamage(wizard.currentDiceScore);
    NewMonster.takeDamage(NewMonster.currentDiceScore);
    render();

    if(wizard.dead){
        endGame();
    }
    else if(NewMonster.dead){
        document.getElementById("attack-button").setAttribute('disabled', '');
            
        if(monsterArray.length > 0){
            setTimeout(()=>{
                NewMonster=getNewMonsterData();
                render();
            },2000);  
            
            //document.getElementById("attack-button").removeAttribute('disabled');
        }
        else{
            endGame();
        }
    }
}


function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
    document.getElementById('monster').innerHTML = NewMonster.getCharacterHtml();
}

document.getElementById("attack-button").addEventListener('click', attack)

const wizard = new Character(characterData.hero)
let NewMonster = getNewMonsterData();

render();
