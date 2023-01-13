let addButton = document.querySelector('.addButton');
let sect2 = document.querySelector('.sect2');

let screen = document.querySelector('.screen');
let noteContainer = document.querySelector('.noteContainer');
let noteHead = document.querySelector('.noteHead');
let noteText = document.querySelector('.noteText');
let exit = document.querySelector('.exit');

let flag = true;
let noteData = [{}];
let index = 0;
let indexNote = 0;

window.addEventListener('keydown', keyCheck)

addButton.addEventListener('click', addNote)
screen.addEventListener('click', screenClick)

sect2.addEventListener('click', selectNote)
sect2.addEventListener('mouseover', deleteAnimationOver)
sect2.addEventListener('mouseout', deleteAnimationOut)


function addNote(){
    sect2.innerHTML += `
        <div class="noteContainerDisable" id="${index}">
            <div class="noteHeadDisable"></div>
            <div class="noteTextDisable"></div>
            <div class="deleteNote">DELETE</div> 
        </div>
    `
    screen.style.width = `100%`;
    screen.style.height = `100%`;
    
}

function screenClick(e){
    if (e.target.className == 'screen' || e.target.className == 'exit')
    {
        if (flag)
        {
            sect2.childNodes[sect2.childNodes.length - 2].querySelector('.noteHeadDisable').innerHTML = `${noteHead.value}`;
            sect2.childNodes[sect2.childNodes.length - 2].querySelector('.noteTextDisable').innerHTML = `${noteText.innerHTML}`;
    
            noteData[index] = {
                head: `${noteHead.value}`,
                textContent: `${noteText.innerHTML}`
            }
            index++;
        }
        else{
            document.getElementById(`${indexNote}`).childNodes[1].innerHTML = `${noteHead.value}`;
            document.getElementById(`${indexNote}`).childNodes[3].innerHTML = `${noteText.innerHTML}`;
            flag = true;
        }
        

        screen.style.width = `0%`;
        screen.style.height = `0%`;
        noteHead.value = '';
        noteText.innerHTML = '';
    }
}

function selectNote(e){
    if (e.target.parentElement.className == 'noteContainerDisable' && e.target.className != 'deleteNote')
    {
        indexNote = e.target.parentElement.id;
        noteHead.value = e.target.parentElement.querySelector('.noteHeadDisable').innerHTML;
        noteText.innerHTML = e.target.parentElement.querySelector('.noteTextDisable').innerHTML;

        screen.style.width = `100%`;
        screen.style.height = `100%`;
        flag = false;
    }
    else if (e.target.parentElement.className == 'noteContainerDisable' && e.target.className == 'deleteNote')
    {
        for (i=0; i<noteData.length; i++)
        {
            if (noteData[i]['head'] == e.target.parentElement.querySelector('.noteHeadDisable').innerHTML && noteData[i]['textContent'] == e.target.parentElement.querySelector('.noteTextDisable').innerHTML)
            {
                noteData.splice(i, 1);
                break;
            }
        }
        index--;

        e.target.parentElement.style.opacity = '0';
        setTimeout(() => {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement)
        }, 550)
    }
}

// ----- Animation -----//

function deleteAnimationOver(e){
    if (e.target.parentElement.className == 'noteContainerDisable' || e.target.parentElement.className == 'noteTextDisable')
    {
        e.target.parentElement.childNodes[e.target.parentElement.childNodes.length - 2].style.display = 'flex';
        e.target.parentElement.childNodes[e.target.parentElement.childNodes.length - 2].style.width = '100%';
        e.target.parentElement.childNodes[e.target.parentElement.childNodes.length - 2].style.height = '8%';
    }
    console.log(e.target.parentElement.childNodes[e.target.parentElement.childNodes.length - 2]);
}

function deleteAnimationOut(e){
    if (e.target.parentElement.className == 'noteContainerDisable' || e.target.parentElement.className == 'noteTextDisable')
    {
        e.target.parentElement.childNodes[e.target.parentElement.childNodes.length - 2].style.display = 'none';
        e.target.parentElement.childNodes[e.target.parentElement.childNodes.length - 2].style.width = '0';
        e.target.parentElement.childNodes[e.target.parentElement.childNodes.length - 2].style.height = '0';
    }
}

// ----- Another functional + keyPress -----// 

function keyCheck(e){
    if (e.key == 'Escape')
    {
        if (flag)
        {
            sect2.childNodes[sect2.childNodes.length - 2].querySelector('.noteHeadDisable').innerHTML = `${noteHead.value}`;
            sect2.childNodes[sect2.childNodes.length - 2].querySelector('.noteTextDisable').innerHTML = `${noteText.innerHTML}`;
    
            noteData[index] = {
                head: `${noteHead.value}`,
                textContent: `${noteText.innerHTML}`
            }
            index++;
        }
        else{
            document.getElementById(`${indexNote}`).childNodes[1].innerHTML = `${noteHead.value}`;
            document.getElementById(`${indexNote}`).childNodes[3].innerHTML = `${noteText.innerHTML}`;
            flag = true;
        }
        

        screen.style.width = `0%`;
        screen.style.height = `0%`;
        noteHead.value = '';
        noteText.innerHTML = '';
    }
}

new Sortable(sect2, {
    swap: true, // Enable swap plugin
	swapClass: 'highlight', // The class applied to the hovered swap item
    animation: 150,
});