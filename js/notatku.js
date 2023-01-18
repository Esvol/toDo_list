let addButton = document.querySelector('.addButton');
let sect2 = document.querySelector('.sect2');
let f1 = document.forms['f1'];

let screen = document.querySelector('.screen');
let noteContainer = document.querySelector('.noteContainer');
let noteHead = document.querySelector('.noteHead');
let noteText = document.querySelector('.noteText');
let important = document.querySelector('.important');
let exit = document.querySelector('.exit');
let deleteAll = document.querySelector('.deleteAll');

let flag = true;
let noteData = [];
let index = 0;
let indexNote = 0;
let indexEdit = 0;

window.addEventListener('keydown', keyCheck)

addButton.addEventListener('click', addNote)
screen.addEventListener('click', screenClick)
deleteAll.addEventListener('click', deleteButton)

f1.addEventListener('click', selectImportant)
sect2.addEventListener('click', selectNote)
sect2.addEventListener('mouseover', deleteAnimationOver)
sect2.addEventListener('mouseout', deleteAnimationOut)


function addNote(){
    setTimeout(function(){
        sect2.innerHTML += `
            <div class="noteContainerDisable" id="${index}">
                <div class="important"></div>
                <div class="noteHeadDisable"></div>
                <textarea class="noteTextDisable" disabled></textarea>
                <div class="deleteNote">DELETE</div> 
            </div>
        `
        f1.style.opacity = 1;
        f1.style.display = 'flex';
    }, 115)

    screen.style.width = `100%`;
    screen.style.height = `100%`;
    screen.style.opacity = 1;

    noteContainer.style.width = `800px`;
    noteContainer.style.height = `800px`;

    noteHead.focus();
}

function screenClick(e){
    if (e.target.className == 'screen' || e.target.className == 'exit')
    {
        if (flag)
        {
            sect2.childNodes[sect2.childNodes.length - 2].querySelector('.noteHeadDisable').innerHTML = `${noteHead.value}`;
            sect2.childNodes[sect2.childNodes.length - 2].querySelector('.noteTextDisable').innerHTML = `${noteText.value}`;

            noteData[index] = {
                head: `${noteHead.value}`,
                textContent: `${noteText.value}`,
                importantButton: `rgb(255, 255, 255)`
            }

            localStorage.setItem(`n${index}`, JSON.stringify(noteData[index]));

            index++;
        }
        else{ // for edit

            for (let i=0; i<noteData.length; i++)
            {
                if (noteData[i].head == document.getElementById(`${indexNote}`).querySelector('.noteHeadDisable').innerHTML && noteData[i].textContent == document.getElementById(`${indexNote}`).querySelector('.noteTextDisable').innerHTML)
                {
                    indexEdit = i;
                    break;
                }
            }

            document.getElementById(`${indexNote}`).querySelector('.noteHeadDisable').innerHTML = `${noteHead.value}`;
            document.getElementById(`${indexNote}`).querySelector('.noteTextDisable').innerHTML = `${noteText.value}`;

            noteData[indexEdit].head = `${noteHead.value}`;
            noteData[indexEdit].textContent = `${noteText.value}`;

            localStorage.removeItem(`n${indexEdit}`);
            localStorage.setItem(`n${indexEdit}`, JSON.stringify(noteData[indexEdit]));

            flag = true;
        }
        
        screen.style.width = `0%`;
        screen.style.height = `0%`;
        screen.style.opacity = '0';
        noteContainer.style.width = `0`;
        noteContainer.style.height = `0`;
        noteHead.value = '';
        noteText.value = '';
        deleteAllButton();
    }
}

function selectNote(e){
    if (e.target.parentElement.className == 'noteContainerDisable' && e.target.className != 'deleteNote' && e.target.className != 'important')
    {
        indexNote = e.target.parentElement.id;
        noteHead.value = e.target.parentElement.querySelector('.noteHeadDisable').innerHTML;
        noteText.value = e.target.parentElement.querySelector('.noteTextDisable').innerHTML;

        screen.style.width = `100%`;
        screen.style.height = `100%`;
        noteContainer.style.width = `800px`;
        noteContainer.style.height = `800px`;
        screen.style.opacity = 1;
        noteHead.focus();
        flag = false;
    }
    else if (e.target.className == 'deleteNote')
    {
        for (i=0; i<noteData.length; i++)
        {
            if (noteData[i].head == e.target.parentElement.querySelector('.noteHeadDisable').innerHTML && noteData[i].textContent == e.target.parentElement.querySelector('.noteTextDisable').innerHTML)
            {
                noteData.splice(i, 1);
                break;
            }
        }

        let len = localStorage.length;
        for(let i=0; i<len; i++)
        {
            localStorage.removeItem(`n${i}`)
        }

        for(let i=0; i<noteData.length; i++){
            localStorage.setItem(`n${i}`, JSON.stringify(noteData[i]));
        }

        index--;
        e.target.parentElement.style.opacity = '0';
        setTimeout(() => {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement)
        }, 550)

        if (index == 0)
        {
            f1.style.opacity = 0;
            setTimeout(() => {
                f1.style.display = 'none';
            }, 500)
        }

        deleteAllButton();
    }
    else if (e.target.className == 'important')
    {
        if (e.target.style.backgroundColor == `rgb(218, 80, 80)`) e.target.style.backgroundColor = `white`;
        if (e.target.style.backgroundColor == `rgb(128, 218, 80)`) e.target.style.backgroundColor = `rgb(218, 80, 80)`;
        if (e.target.style.backgroundColor == `rgb(230, 222, 68)`) e.target.style.backgroundColor = `rgb(128, 218, 80)`;
        if (getComputedStyle(e.target).getPropertyValue("background-color") == `rgb(255, 255, 255)`) e.target.style.backgroundColor = `rgb(230, 222, 68)`

        for (i=0; i<noteData.length; i++)
        {
            if (noteData[i].head == e.target.parentElement.querySelector('.noteHeadDisable').innerHTML && noteData[i].textContent == e.target.parentElement.querySelector('.noteTextDisable').innerHTML)
            {
                noteData[i].importantButton = `${e.target.style.backgroundColor}`
                localStorage.removeItem(`n${i}`);
                localStorage.setItem(`n${i}`, JSON.stringify(noteData[i]));
                break;
            }
        }
    }
}

function deleteAllButton(){
    if (noteData.length >= 5){
        document.querySelector('.deleteAll').style.display = `flex`;
    }
    else{
        document.querySelector('.deleteAll').style.display = `none`;
    }
}

function deleteButton(){
    for (let i=0; i<sect2.children.length; i++)
    {
        sect2.getElementsByClassName('noteContainerDisable')[i].style.opacity = '0';
    }

    setTimeout(function(){
        while (sect2.firstChild) {
            sect2.removeChild(sect2.firstChild);
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, 250)

    let len = localStorage.length;
    for(let i=0; i<len; i++)
    {
        localStorage.removeItem(`n${i}`);
    }
    
    index = 0;
    noteData.length = 0;

    f1.style.opacity = 0;
    setTimeout(() => {
        f1.style.display = 'none';
    }, 500)        

    deleteAllButton();
}

function selectImportant(e){
    if (e.target.className == `whiteButton`)
    {
        for (let i=0; i<sect2.children.length; i++)
        {            
            if (getComputedStyle(sect2.getElementsByClassName('important')[i]).getPropertyValue('background-color') == 'white' || getComputedStyle(sect2.getElementsByClassName('important')[i]).getPropertyValue('background-color') == 'rgb(255, 255, 255)')
            {
                sect2.getElementsByClassName('noteContainerDisable')[i].style.display = 'flex';
                sect2.getElementsByClassName('noteContainerDisable')[i].style.opacity = '1';
            }
            else{
                sect2.getElementsByClassName('noteContainerDisable')[i].style.opacity = '0';
                setTimeout(() => {
                    sect2.getElementsByClassName('noteContainerDisable')[i].style.display = 'none';
                }, 200)
            }
        }
    }

    if (e.target.className == `greenButton`)
    {
        for (let i=0; i<sect2.children.length; i++)
        {
            if (sect2.getElementsByClassName('important')[i].style.backgroundColor == 'rgb(230, 222, 68)')
            {
                sect2.getElementsByClassName('noteContainerDisable')[i].style.display = 'flex';
                sect2.getElementsByClassName('noteContainerDisable')[i].style.opacity = '1';
            }
            else{
                sect2.getElementsByClassName('noteContainerDisable')[i].style.opacity = '0';
                setTimeout(() => {
                    sect2.getElementsByClassName('noteContainerDisable')[i].style.display = 'none';
                }, 200)
            }
        }
    }


    if (e.target.className == `yellowButton`)
    {
        for (let i=0; i<sect2.children.length; i++)
        {
            if (sect2.getElementsByClassName('important')[i].style.backgroundColor == 'rgb(128, 218, 80)')
            {
                sect2.getElementsByClassName('noteContainerDisable')[i].style.display = 'flex';
                sect2.getElementsByClassName('noteContainerDisable')[i].style.opacity = '1';
            }
            else{
                sect2.getElementsByClassName('noteContainerDisable')[i].style.opacity = '0';
                setTimeout(() => {
                    sect2.getElementsByClassName('noteContainerDisable')[i].style.display = 'none';
                }, 200)
            }
        }
    } 

    if (e.target.className == `redButton`)
    {
        for (let i=0; i<sect2.children.length; i++)
        {
            if (sect2.getElementsByClassName('important')[i].style.backgroundColor == 'rgb(218, 80, 80)')
            {
                sect2.getElementsByClassName('noteContainerDisable')[i].style.display = 'flex';
                sect2.getElementsByClassName('noteContainerDisable')[i].style.opacity = '1';
            }
            else{
                sect2.getElementsByClassName('noteContainerDisable')[i].style.opacity = '0';
                setTimeout(() => {
                    sect2.getElementsByClassName('noteContainerDisable')[i].style.display = 'none';
                }, 200)
            }
        }
    }  

    if (e.target.className == `resetAllcolor`)
    {
        for (let i=0; i<sect2.children.length; i++)
        {
            setTimeout(() => {
                sect2.getElementsByClassName('noteContainerDisable')[i].style.opacity = '1';
                sect2.getElementsByClassName('noteContainerDisable')[i].style.display = 'flex';
            }, 150)   
        }
    }  
}

// ----- Animation -----//

function deleteAnimationOver(e){
    if (e.target.parentElement.className == 'noteContainerDisable' || e.target.parentElement.className == 'noteTextDisable')
    {
        e.target.parentElement.querySelector('.deleteNote').style.display = 'flex';
        e.target.parentElement.querySelector('.deleteNote').style.width = '100%';
        e.target.parentElement.querySelector('.deleteNote').style.height = '8%';

        if (getComputedStyle(e.target.parentElement.querySelector('.important')).getPropertyValue("background-color") == `rgb(255, 255, 255)`)
        {
            e.target.parentElement.querySelector('.important').style.display = 'flex';
            e.target.parentElement.querySelector('.important').style.width = '20px';
            e.target.parentElement.querySelector('.important').style.height = '20px';
        }
    }
}

function deleteAnimationOut(e){
    if (e.target.parentElement.className == 'noteContainerDisable' || e.target.parentElement.className == 'noteTextDisable')
    {
        e.target.parentElement.querySelector('.deleteNote').style.display = 'none';
        e.target.parentElement.querySelector('.deleteNote').style.width = '0';
        e.target.parentElement.querySelector('.deleteNote').style.height = '0';

        if (getComputedStyle(e.target.parentElement.querySelector('.important')).getPropertyValue("background-color") == `rgb(255, 255, 255)`)
        {
            e.target.parentElement.querySelector('.important').style.display = 'none';
            e.target.parentElement.querySelector('.important').style.width = '0';
            e.target.parentElement.querySelector('.important').style.height = '0';
        }
    }
}

// ----- Another functional + keyPress -----// 

function keyCheck(e){
    if (e.key == 'Escape')
    {
        if (flag)
        {
            sect2.childNodes[sect2.childNodes.length - 2].querySelector('.noteHeadDisable').innerHTML = `${noteHead.value}`;
            sect2.childNodes[sect2.childNodes.length - 2].querySelector('.noteTextDisable').innerHTML = `${noteText.value}`;
    
            noteData[index] = {
                head: `${noteHead.value}`,
                textContent: `${noteText.value}`
            }
            index++;
        }
        else{
            for (let i=0; i<noteData.length; i++)
            {
                if (noteData[i].head == document.getElementById(`${indexNote}`).querySelector('.noteHeadDisable').innerHTML && noteData[i].textContent == document.getElementById(`${indexNote}`).querySelector('.noteTextDisable').innerHTML)
                {
                    indexEdit = i;
                    break;
                }
            }

            document.getElementById(`${indexNote}`).querySelector('.noteHeadDisable').innerHTML = `${noteHead.value}`;
            document.getElementById(`${indexNote}`).querySelector('.noteTextDisable').innerHTML = `${noteText.value}`;

            noteData[indexEdit].head = `${noteHead.value}`;
            noteData[indexEdit].textContent = `${noteText.value}`;

            localStorage.removeItem(`n${indexEdit}`);
            localStorage.setItem(`n${indexEdit}`, JSON.stringify(noteData[indexEdit]));

            flag = true;
        }
        

        screen.style.width = `0%`;
        screen.style.height = `0%`;
        noteContainer.style.width = `0`;
        noteContainer.style.height = `0`;
        screen.style.opacity = '0';
        noteHead.value = '';
        noteText.value = '';
        deleteAllButton();
    }
}

new Sortable(sect2, {
    swap: true, // Enable swap plugin
	swapClass: 'highlight', // The class applied to the hovered swap item
    animation: 150,
});

// ----- localStorage thing -----// 

//localStorage.clear();

localSt();

function localSt(){
    for (let i=0; i<localStorage.length; i++)
    {
        if (/^n\d{1,}$/.test(localStorage.key(i)))
        {
            let noteDataLocal = localStorage.getItem(`${localStorage.key(i)}`)
            noteDataLocal = JSON.parse(noteDataLocal);
            if (noteDataLocal.importantButton == `rgb(255, 255, 255)` || noteDataLocal.importantButton == `white`)
            {
                sect2.innerHTML += `
                <div class="noteContainerDisable" id="${index}">
                    <div class="important" style="background-color: ${noteDataLocal.importantButton};"></div>
                    <div class="noteHeadDisable">${noteDataLocal.head}</div>
                    <textarea class="noteTextDisable" disabled>${noteDataLocal.textContent}</textarea>
                    <div class="deleteNote">DELETE</div> 
                </div>
                `
            }
            else if (noteDataLocal.importantButton != `rgb(255, 255, 255)` && noteDataLocal.importantButton != `white`){
                sect2.innerHTML += `
                <div class="noteContainerDisable" id="${index}">
                    <div class="important" style="background-color: ${noteDataLocal.importantButton}; display: flex; width: 20px; height: 20px;"></div>
                    <div class="noteHeadDisable">${noteDataLocal.head}</div>
                    <textarea class="noteTextDisable" disabled>${noteDataLocal.textContent}</textarea>
                    <div class="deleteNote">DELETE</div> 
                </div>
                `
            }
            
            noteData[index] = {
                head: `${noteDataLocal.head}`,
                textContent: `${noteDataLocal.textContent}`,
                importantButton: `${noteDataLocal.importantButton}`
            }

            index++;
            deleteAllButton();
        }   
    }
    if (noteData.length >=1)
    {
        f1.style.opacity = 1;
        f1.style.display = 'flex';
    }
}

