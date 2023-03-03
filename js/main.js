'use strict';
// --------
// FUNZIONI
// --------

// FUNZIONE CHE PERMETTE DI CREARE UN ELEMENTO HTML
// PERMETTE DI AGGIUNGERE 2 CLASSI A PIACERE E 1 INCREMENTALE 
// PERMETTE INOLTRE DI INSERIRE IL NUMERO SELEZIONATO IN UN ARRAY 
function myCreateElement(htmlElement,className1,className2='',htmlValue){
    const element = document.createElement(htmlElement);
    element.classList.add(className1);
    element.classList.add(className2);
    element.classList.add('cell-'+htmlValue);
    element.innerHTML = ('<i class="fa-solid fa-bomb hidden"></i>');
    element.addEventListener('click', function gameCalcoulator(){
        game(element,bombCell,htmlValue)    
    })
    return element;
}



// FUNZIONE AL CLICK DELL'ELEMENTO 
function game(element,arrayBomb,htmlValue){
    // VERIFICO CHE IL NUMERO NON SIA GIA PRESENTE NELL'ARRAY 
    if (arrayBomb.indexOf(htmlValue) === -1 ){
        element.classList.add('modeSelected');
        console.log(htmlValue);
        score++
        scoreElement.innerHTML=(score)

        if (score === (cellNumber - arrayBomb.length)){
            hoverContent.classList.remove('hidden');
            winImg.classList.remove('hidden')
        }
    }else{
        for( let i = 0; i<arrayBomb.length; i++){
           element = document.querySelector('.cell-'+arrayBomb[i])
           element.classList.add('loseCell')
           const elementBomb = document.querySelector('.cell-'+arrayBomb[i]+' i') 
           elementBomb.classList.remove('hidden')
        }
        hoverContent.classList.remove('hidden');
        loseImg.classList.remove('hidden')

    }
}

function winSituation(score,arrayBomb){

}


// FUNZIONE CHE APPENDE QUALCOSA AD UN ELEMENTO HTML 
function myAppendElement(containerElement, htmlElement){
    containerElement.append(htmlElement);
}

// FUNZIONE CHE, COMBINATA ALLE 2 DI SOPRA PERMETTE DI INSERIRE PIU' ELEMENTI
// IN UN CONTAINER 
function createTable(numeroCelle,doveInserirle,classeCelle){
    doveInserirle.innerHTML=('');
    for(let i = 1; i<= numeroCelle; i++){
        const createdElement = myCreateElement('div','cell',classeCelle,i);
        myAppendElement(doveInserirle, createdElement);
    }
}

// FUNZIONE CHE AGGIUNGE UNA CLASSE 
function myAddClass (elemento,nomeClasse){
    elemento.classList.add(nomeClasse);
}

// FUNZIONE CHE RIMUOVE 1 CLASSE
function myRemoveClass (elemento1,nomeClasse1){
    elemento1.classList.remove(nomeClasse1);
}

// FUNZIONE CHE CREA UN NUMERO CASUALE 
function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// FUNZIONI CHE CREA UN ARRAY DI X NUMERI CASUALI E ASSEGNA
function randomNumbers (numeroDiValori,max,min,arrayDiDestinazione){
    arrayDiDestinazione.length = 0
    while(numeroDiValori > arrayDiDestinazione.length){
        let number = randomNumber(min, max);
        if (arrayDiDestinazione.indexOf(number) === -1 ){
           arrayDiDestinazione.push(number); 
        }
    }
}


// ----
// MAIN
// ----
let score = 0;

// 1= easy, 2= normal, 3 = hard 
let situation;


let cellNumber;


const containerBoard = document.querySelector('.board');
const startGame = document.querySelector('.startMenu');

const containerBoardMain = document.getElementById('containerBoard');
const initailMenu = document.getElementById('initialMenu');

const classHidden = 'hidden';
const classInitialMenu = 'initial';

const hoverContent = document.getElementById('hoverContent')
const loseImg = document.getElementById('loseScreen');
const winImg = document.getElementById('winScreen');
const repetButton = document.querySelector('.repet');

const scoreElement = document.getElementById('scoreNumber')

const headerButtonEasy = document.getElementById('easyButton');
const headerButtonNormal = document.getElementById('normalButton');
const headerButtonHard = document.getElementById('hardButton');

const debug = document.getElementById('debug');

let bombCell = [];

repetButton.addEventListener('click',function(){
    window.location.reload(true);
})

headerButtonEasy.addEventListener('click',function(){
    // RIMUOV CLASSI INIZIALI
    myRemoveClass (containerBoardMain,classHidden);
    myRemoveClass (menuHeader,classInitialMenu);
    
    // IMPOSTO LA MODALITA'
    cellNumber = 100;

    score=0

    // CREO LA TABELLA 
    createTable(cellNumber,containerBoard,'easy');

    // DICO DOVE SARANNO LE BOMBE 
    randomNumbers (16,cellNumber,1,bombCell);
    console.log(bombCell)


})

headerButtonNormal.addEventListener('click',function(){
    // RIMUOV CLASSI INIZIALI
    myRemoveClass (containerBoardMain,classHidden)
    myRemoveClass (menuHeader,classInitialMenu)

    // IMPOSTO LA MODALITA'
    cellNumber = 81;

    score=0

    // CREO LA TABELLA 
    createTable(cellNumber,containerBoard,'normal');

    // DICO DOVE SARANNO LE BOMBE 
    randomNumbers (16,cellNumber,1,bombCell);
    console.log(bombCell)


})

headerButtonHard.addEventListener('click',function(){
    // RIMUOV CLASSI INIZIALI
    myRemoveClass (containerBoardMain,classHidden)
    myRemoveClass (menuHeader,classInitialMenu)

    // IMPOSTO LA MODALITA'
    cellNumber= 49;

    score=0

    // CREO LA TABELLA 
    createTable(cellNumber,containerBoard,'hard');

    // DICO DOVE SARANNO LE BOMBE 
    randomNumbers (16,cellNumber,1,bombCell);
    console.log(bombCell)

    
})




debug.addEventListener('click',function(){
    for( let i = 0; i<bombCell.length; i++){
        const elementBomb = document.querySelector('.cell-'+bombCell[i]+' i') 
        elementBomb.classList.toggle('hidden')
     }

})