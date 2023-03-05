'use strict';
// --------------------------------------------------------
// FUNZIONI------------------------------------------------
// --------------------------------------------------------

// FUNZIONE CHE PERMETTE DI CREARE UN ELEMENTO HTML
// PERMETTE DI AGGIUNGERE 2 CLASSI A PIACERE E 1 INCREMENTALE 
// PERMETTE INOLTRE DI INSERIRE IL NUMERO SELEZIONATO IN UN ARRAY 
function myCreateElement(htmlElement,className1,className2='',htmlValue){

    // Inserisce dentro una var un elemento html e lo crea 
    const element = document.createElement(htmlElement);

    // aggiunge le varie classi 
    element.classList.add(className1);
    element.classList.add(className2);
    element.classList.add('cell-'+htmlValue);

    // Inserisce in tutte le celle l'elemento bomba e lo nasconde 
    element.innerHTML = ('<i class="fa-solid fa-bomb hidden"></i>');

    // aggiunge l'evento a ogni cella: scatena la funzione GAME
    element.addEventListener('click', function gameCalcoulator(){
        game(element,bombCell,htmlValue);  
    })

    // DA COME RISULTATO L'ELEMENTO HTML CON LE CLASSI AGGIUNTE PRIMA
    return element;
}

// FUNZIONE AL CLICK DELL'ELEMENTO 
function game(element,arrayBomb,htmlValue){
    // VERIFICO CHE IL NUMERO NON SIA GIA PRESENTE NELL'ARRAY DELLE BOMBE
    // E NELL'ARRAY DEI NUMERI SELEZIONATI
    if ((arrayBomb.indexOf(htmlValue) === -1) && (selectedElement.includes(htmlValue) === false)){
    // SE VERO:

        // aggiungo la classe che lo fa diventare selezionato
        element.classList.add('modeSelected');
        console.log(htmlValue);

        // incremento il punteggio
        score++;

        // scrivo il punteggio nella variabile score element 
        scoreElement.innerHTML=(score);

        // aggiungo la cella selezionata nell'array delle celle selezionate 
        selectedElement.push(htmlValue);

        // se il punteggio è uguale al numero di celle - il numero di bome 
        // VINCI
        if (score === (cellNumber - arrayBomb.length)){
            hoverContent.classList.remove('hidden');
            winImg.classList.remove('hidden');
        }
    }

    // INVECE SE L'ELEMENTO E' GIA' PRESENTE NELLE CELLE SELEZIONATE
    else if(selectedElement.includes(htmlValue) === true){} //NON FARE NULLA
    // ALTRIMENTI
    else{
        // MOSTRA TUTTE LE BOMBE 
        for( let i = 0; i<arrayBomb.length; i++){
           element = document.querySelector('.cell-'+arrayBomb[i]);
           element.classList.add('loseCell');
           const elementBomb = document.querySelector('.cell-'+arrayBomb[i]+' i') ;
           elementBomb.classList.remove('hidden');
        }
        // PERDI 
        hoverContent.classList.remove('hidden');
        loseImg.classList.remove('hidden');
    }
}


// FUNZIONE CHE APPENDE QUALCOSA AD UN ELEMENTO HTML 
function myAppendElement(containerElement, htmlElement){
    containerElement.append(htmlElement);
}

// FUNZIONE CHE PERMETTE DI INSERIRE PIU' ELEMENTI
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
    arrayDiDestinazione.length = 0;
    while(numeroDiValori > arrayDiDestinazione.length){
        let number = randomNumber(min, max);
        if (arrayDiDestinazione.indexOf(number) === -1 ){
           arrayDiDestinazione.push(number); 
        }
    }
}


// ----------------------------------------------------------
// MAIN------------------------------------------------------
// ----------------------------------------------------------

// PUNTEGGIO INIZIALE
let score = 0;

// 1= easy, 2= normal, 3 = hard 
let situation;


// NUMERO DI CELLE 
let cellNumber;


// ARRAY DEGLI ELEMENTI SELEZIONATI E DELLE BOMBE
let selectedElement=[];
let bombCell = [];


// CLASSI UTILI
const classHidden = 'hidden';
const classInitialMenu = 'initial';
 

// VARIABILI CONTENENTI GLI ELEMENTI HTML 
    //board
const containerBoard = document.querySelector('.board');
const containerBoardMain = document.getElementById('containerBoard');
    // menu delle difficoltà
const startGame = document.querySelector('.startMenu');
const initailMenu = document.getElementById('initialMenu');
const headerButtonEasy = document.getElementById('easyButton');
const headerButtonNormal = document.getElementById('normalButton');
const headerButtonHard = document.getElementById('hardButton');
    //schermata nascosta, immagini win e lose e bottone per ricominciare
const hoverContent = document.getElementById('hoverContent');
const loseImg = document.getElementById('loseScreen');
const winImg = document.getElementById('winScreen');
const repetButton = document.querySelector('.repet');
    // punteggio
const scoreElement = document.getElementById('scoreNumber');
    // debug 
const debug = document.getElementById('debug');


// BOTTONE CHE FA RINCOMINCIARE IL GIOCO 
repetButton.addEventListener('click',function(){
    window.location.reload(true);
})


// BOTTONE PER INIZIARE IL GIOCO IN MODALITA' FACILE
headerButtonEasy.addEventListener('click',function(){
    // RIMUOV CLASSI INIZIALI
    myRemoveClass (containerBoardMain,classHidden);
    myRemoveClass (menuHeader,classInitialMenu);
    
    // IMPOSTO LA MODALITA'
    cellNumber = 100;

    // IMPOSTO IL PUNTEGGIO A 0
    score=0;

    // CREO LA TABELLA 
    createTable(cellNumber,containerBoard,'easy');

    // DICO DOVE SARANNO LE BOMBE 
    randomNumbers (16,cellNumber,1,bombCell);
    console.log(bombCell);


})

// BOTTONE PER INIZIARE IL GIOCO IN MODALITA' MEDIA
headerButtonNormal.addEventListener('click',function(){
    // RIMUOV CLASSI INIZIALI
    myRemoveClass (containerBoardMain,classHidden);
    myRemoveClass (menuHeader,classInitialMenu);

    // IMPOSTO LA MODALITA'
    cellNumber = 81;

    // IMPOSTO IL PUNTEGGIO A 0
    score=0;

    // CREO LA TABELLA 
    createTable(cellNumber,containerBoard,'normal');

    // DICO DOVE SARANNO LE BOMBE 
    randomNumbers (16,cellNumber,1,bombCell);
    console.log(bombCell);


})

// BOTTONE PER INIZIARE IL GIOCO IN MODALITA' DIFFICILE NN
headerButtonHard.addEventListener('click',function(){
    // RIMUOV CLASSI INIZIALI
    myRemoveClass (containerBoardMain,classHidden);
    myRemoveClass (menuHeader,classInitialMenu);

    // IMPOSTO LA MODALITA'
    cellNumber= 49;

    // IMPOSTO IL PUNTEGGIO A 0
    score=0;

    // CREO LA TABELLA 
    createTable(cellNumber,containerBoard,'hard');

    // DICO DOVE SARANNO LE BOMBE 
    randomNumbers (16,cellNumber,1,bombCell);
    console.log(bombCell);

    
})



// DEBUG
debug.addEventListener('click',function(){
    for( let i = 0; i<bombCell.length; i++){
        const elementBomb = document.querySelector('.cell-'+bombCell[i]+' i') ;
        elementBomb.classList.toggle('hidden');
     }

})