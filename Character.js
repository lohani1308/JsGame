import { getDiceRollArray, getDicePlaceholderHtml ,getPercentage } from './utils.js'

function Character(data) {
    Object.assign(this, data);
    
    this.maxHealth=this.health;

    this.diceArray = getDicePlaceholderHtml(this.diceCount);

    this.getDiceHtml = function () {
        this.currentDiceScore = getDiceRollArray(this.diceCount);
        this.diceArray = this.currentDiceScore.map(function(num){
            return `<div class="dice">${num}</div>`
            }).join("")
    }

    this.getHealthBarHtml=function(){
        const percentage=getPercentage(this.health,this.maxHealth);

        return`
            <div class="health-bar-outer">
                <div class="health-bar-inner ${percentage < 26 ? "danger":""} " style="width: ${percentage}%">
                </div>
            </div>
        `
    }
    
    

    this.takeDamage = function(attackScoreArray){
        const score=attackScoreArray.reduce((a,b)=>a+b,0);

        this.health-=score;
        
        if(this.health<=0){
            this.dead=true;
            this.health=0;
            //console.log(this);
        }

        getPercentage(this.health,this.maxHealth);
    }

    
    this.getCharacterHtml = function () {
        const { elementId, name, avatar, health, diceCount } = this;
        const healthBar=this.getHealthBarHtml();

        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${this.diceArray}
                </div>
            </div>`
    }
}

export default Character