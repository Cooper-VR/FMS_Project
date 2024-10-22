console.log('main.js');

const info = document.getElementById('info');

let button1visible = false;
let button2visible = false;
let button3visible = false;
let button4visible = false;
let button5visible = false;
let button6visible = false;

function setBools(){
    button1visible = false;
    button2visible = false;
    button3visible = false;
    button4visible = false;
    button5visible = false;
    button6visible = false;
}

function button1(){
    
    button1visible = !button1visible;

    button2visible = false;
    button3visible = false;
    button4visible = false;
    button5visible = false;
    button6visible = false;

    info.style.left = '5vw';

    if (button1visible){
        info.style.visibility = 'visible';
    } else {
        info.style.visibility = 'hidden';
    }

    info.innerHTML = "This is a set a games that are used to test and imporive fine motor skills";
    //info.setAttribute('style', 'left: 5vw;');
    console.log('button1');
}

function button2(){
    button1visible = false;
    button3visible = false;
    button4visible = false;
    button5visible = false;
    button6visible = false;

    button2visible = !button2visible;
    if (button2visible){
        info.style.visibility = 'visible';
    } else {
        info.style.visibility = 'hidden';
    }

    info.innerHTML = 'game 1';
    info.style.left = '21vw';
    console.log('button2');
}

function button3(){
    button1visible = false;
    button2visible = false;
    button4visible = false;
    button5visible = false;
    button6visible = false;

    button3visible = !button3visible;
    if (button3visible){
        info.style.visibility = 'visible';
    } else {
        info.style.visibility = 'hidden';
    }

    info.innerHTML = 'Button 3 was clicked';
    info.style.left = '37vw';
    console.log('button3');
}

function button4(){
    button1visible = false;
    button2visible = false;
    button3visible = false;
    button5visible = false;
    button6visible = false;

    button4visible = !button4visible;
    if (button4visible){
        info.style.visibility = 'visible';
    } else {
        info.style.visibility = 'hidden';
    }

    info.innerHTML = 'Button 4 was clicked';
    info.style.left = '53vw';
    console.log('button4');
}

function button5(){
    button1visible = false;
    button2visible = false;
    button3visible = false;
    button4visible = false;
    button6visible = false;

    button5visible = !button5visible;
    if (button5visible){
        info.style.visibility = 'visible';
    } else {
        info.style.visibility = 'hidden';
    }

    info.innerHTML = 'Button 5 was clicked';
    info.style.left = '69vw';
    console.log('button5');
}

function button6(){
    button1visible = false;
    button2visible = false;
    button3visible = false;
    button4visible = false;
    button5visible = false;

    button6visible = !button6visible;
    if (button6visible){
        info.style.visibility = 'visible';
    } else {
        info.style.visibility = 'hidden';
    }

    info.innerHTML = 'Click one of the games below and play. To return to this screen click the back button in the top right corner';
    info.style.left = '85vw';
    console.log('button6');
}