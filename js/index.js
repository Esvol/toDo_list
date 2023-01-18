let mainBody = document.getElementById('body');
let inputExercize = document.querySelector('.inputExercize');
let inputStartTime = document.querySelector('.inputStartTime');
let inputEndTime = document.querySelector('.inputEndTime');
let addCondition = document.getElementsByClassName('addCondition');

let confirmButton = document.querySelector('.buttonConfirm');
let deleteAll = document.querySelector('.deleteAll');

let sect2 = document.querySelector('.sect2');
let f1_label = document.querySelector('.f1_label');
let f2 = document.forms['f2'];

let indexEdit = 0;
let indexEditPosition = 0;
let keyPress;
let index = 0;
let tasks = [];

mainBody.addEventListener('click', bodyTouch)
inputStartTime.addEventListener('keydown', keyCheck)
inputEndTime.addEventListener('keydown', keyCheck)

confirmButton.addEventListener('click', clickButton)
deleteAll.addEventListener('click', deleteButton)

sect2.addEventListener('click', addTextArea)
sect2.addEventListener('input', commentAdd)
f2.addEventListener('input', writeTime)

// Main functional // 

function writeTime(e){
    if (e.target.className ==  'inputStartTime')
    {
        if (!/^\d$/.test(keyPress))
        {
            inputStartTime.value = inputStartTime.value.replace(/^\D$/, '');
        }
        if(/^\d{2}$/.test(inputStartTime.value) && keyPress != 'Backspace')
        {
            inputStartTime.value += ':';
        }
        if(inputStartTime.value.length == 2 && keyPress == 'Backspace')
        {
            inputStartTime.value = inputStartTime.value.slice(0, 1);
        }
        // if(inputStartTime.value.length == 6)
        // {
        //     inputStartTime.value = inputStartTime.value.slice(0, inputStartTime.value.length-1);
        //     inputEndTime.focus();
        //     inputEndTime.value += `${keyPress}`;
        // }
    }
    else if (e.target.className == 'inputEndTime'){
        if (!/^\d$/.test(keyPress))
        {
            inputEndTime.value = inputEndTime.value.replace(/^\D$/, '');
        }
        if(/^\d{2}$/.test(inputEndTime.value) && keyPress != 'Backspace')
        {
            inputEndTime.value += ':';
        }
        if(inputEndTime.value.length == 2 && keyPress == 'Backspace')
        {
            inputEndTime.value = inputEndTime.value.slice(0, 1);
        }
    }
}

function clickButton(){
    if (confirmButton.innerHTML == `Confirm` && inputExercize.value != '' && /^\d{2}:\d{2}$/.test(inputStartTime.value) && /^\d{2}:\d{2}$/.test(inputEndTime.value) && inputStartTime.value.slice(0,2)<=23 && inputEndTime.value.slice(0,2)<=23 && (inputStartTime.value.slice(0,2)<inputEndTime.value.slice(0,2) || (inputStartTime.value.slice(0,2)==inputEndTime.value.slice(0,2) && inputStartTime.value.slice(3,5)<inputEndTime.value.slice(3,5))))
    {
        if (inputStartTime.value != '' && inputEndTime.value != '')
        {
            sect2.innerHTML += `
            <div class="taskContainer">
                <div class="taskHead">
                    <div class="checkBoxer"></div>
                    <div class="taskinfo" id="t${index}">${inputExercize.value}</div>
                    <div class="startTaskTime" id="s${index}">${inputStartTime.value}</div>
                    <div class="ruska">-</div>
                    <div class="endTaskTime" id="e${index}">${inputEndTime.value}</div>
                    <button class="editButton" id="${index}">Edit</button>
                    <button class="deleteButton" id="${index}">Delete</button>
                </div>
                <div class="addCondition" required="required"></div>
            </div>`
        }  
        else{
            sect2.innerHTML += `
            <div class="taskContainer">
                <div class="taskHead">
                    <div class="checkBoxer"></div>
                    <div class="taskinfo" id="t${index}">${inputExercize.value}</div>
                    <div class="startTaskTime hidee" id="s${index}">${inputStartTime.value}</div>
                    <div class="ruska hidee">-</div>
                    <div class="endTaskTime hidee" id="e${index}">${inputEndTime.value}</div>
                    <button class="editButton" id="${index}">Edit</button>
                    <button class="deleteButton" id="${index}">Delete</button>
                </div>
                <div class="addCondition" required="required"></div>
            </div>`
        }


        tasks[index] = {
            name: `${inputExercize.value}`,
            startTime: `${inputStartTime.value}`,
            endTime: `${inputEndTime.value}`,
            comment: '',
            check: false
        }
        
        localStorage.setItem(`${index}`, JSON.stringify(tasks[index]));  
            
        index++;
        inputStartTime.value = '';
        inputEndTime.value = '';
        inputExercize.value = '';
        resultChecker();
        deleteAllButton();
    }
    else if (confirmButton.innerHTML == `Edit` && inputExercize.value != '' && /^\d{2}:\d{2}$/.test(inputStartTime.value) && /^\d{2}:\d{2}$/.test(inputEndTime.value) && inputStartTime.value.slice(0,2)<=23 && inputEndTime.value.slice(0,2)<=23 && (inputStartTime.value.slice(0,2)<inputEndTime.value.slice(0,2) || (inputStartTime.value.slice(0,2)==inputEndTime.value.slice(0,2) && inputStartTime.value.slice(3,5)<inputEndTime.value.slice(3,5)))){

        if (!document.getElementById(`t${indexEdit}`))
        {
            inputStartTime.value = '';
            inputEndTime.value = '';
            inputExercize.value = '';
            confirmButton.innerHTML = `Confirm`;
        }
        else if (document.getElementById(`s${indexEdit}`).innerHTML != '' && document.getElementById(`e${indexEdit}`).innerHTML != '' ) 
        {

            for (let i=0; i<tasks.length; i++)
            {
                if (tasks[i].name == document.getElementById(`t${indexEdit}`).innerHTML && tasks[i].startTime == document.getElementById(`s${indexEdit}`).innerHTML && tasks[i].endTime == document.getElementById(`e${indexEdit}`).innerHTM)
                {
                    indexEditPosition = i;
                    break;
                }
            }

            document.getElementById(`t${indexEdit}`).innerHTML = inputExercize.value;
            document.getElementById(`s${indexEdit}`).innerHTML = inputStartTime.value;
            document.getElementById(`e${indexEdit}`).innerHTML = inputEndTime.value;

            tasks[indexEditPosition].name = `${inputExercize.value}`;
            tasks[indexEditPosition].startTime = `${inputStartTime.value}`;
            tasks[indexEditPosition].endTime = `${inputEndTime.value}`;

            localStorage.removeItem(`${indexEditPosition}`);
            localStorage.setItem(`${indexEditPosition}`, JSON.stringify(tasks[indexEditPosition]));

            inputStartTime.value = '';
            inputEndTime.value = '';
            inputExercize.value = '';
            confirmButton.innerHTML = `Confirm`;
        }
        else
        {
            document.getElementById(`t${indexEdit}`).innerHTML = inputExercize.value;
            inputStartTime.value = '';
            inputEndTime.value = '';
            inputExercize.value = '';
            inputStartTime.removeAttribute('disabled');
            inputEndTime.removeAttribute('disabled');
            confirmButton.innerHTML = `Confirm`;
        }
    }
}

function addTextArea(e){
    if (e.target.className == 'taskinfo' || e.target.className == 'taskinfo taskinfo_checked')
    {
        e.target.parentElement.parentElement.children[1].classList.toggle('toggleAdd');
        e.target.parentElement.parentElement.children[1].toggleAttribute('contenteditable');
    }
    if(e.target.className == `checkBoxer` || e.target.className == `checkBoxer checkBoxer_checked`)
    {
        checkBox(e);
    }
    if (e.target.className == `editButton`)
    {
        edit(e);
    }
    if (e.target.className == `deleteButton`)
    {
        deleteEl(e);
    }
}

function bodyTouch(e){
    if (e.target.id == 'body' || e.target.className == 'sect1' || e.target.className == 'sect2' || e.target.className == 'header')
    {
        for (let i=0; i<sect2.children.length; i++)
        {
            if (addCondition[i].className = `addCondition toggleAdd`) addCondition[i].classList.remove('toggleAdd');
            if (addCondition[i].hasAttribute(`contenteditable`)) addCondition[i].removeAttribute('contenteditable');
        }
    }
}

function checkBox(e){
    e.target.classList.toggle("checkBoxer_checked");
    e.target.parentElement.childNodes[3].classList.toggle('taskinfo_checked');
    if (e.target.className == `checkBoxer checkBoxer_checked`)
    {
        for (let i=0; i<tasks.length; i++)
        {
            if (tasks[i]['name'] == e.target.parentElement.querySelector('.taskinfo').innerHTML && tasks[i]['startTime'] == e.target.parentElement.querySelector('.startTaskTime').innerHTML && tasks[i]['endTime'] == e.target.parentElement.querySelector('.endTaskTime').innerHTML)
            {
                tasks[i]['check'] = true;
                localStorage.removeItem(`${i}`);
                localStorage.setItem(`${i}`, JSON.stringify(tasks[i]));
                break;
            }
        }
    }
    else{
        for (let i=0; i<tasks.length; i++)
        {
            if (tasks[i]['name'] == e.target.parentElement.querySelector('.taskinfo').innerHTML && tasks[i]['startTime'] == e.target.parentElement.querySelector('.startTaskTime').innerHTML && tasks[i]['endTime'] == e.target.parentElement.querySelector('.endTaskTime').innerHTML)
            {
                tasks[i]['check'] = false;
                localStorage.removeItem(`${i}`);
                localStorage.setItem(`${i}`, JSON.stringify(tasks[i]));
                break;
            }
        }
    }
    resultChecker();
}

function resultChecker(){
    let counter = 0;
    for (let i=0; i<tasks.length; i++)
    {
        if (tasks[i]['check'] == `true` || tasks[i]['check'] == true)
        {
            counter++;
        }
    }
    document.querySelector('.resultChecker').innerHTML = `${parseInt((counter*100)/tasks.length)}%`;
}

function edit(e){
    indexEdit = e.target.id;
    
    inputExercize.value = e.target.parentElement.querySelector('.taskinfo').innerHTML;
    inputStartTime.value = e.target.parentElement.querySelector('.startTaskTime').innerHTML;
    inputEndTime.value = e.target.parentElement.querySelector('.endTaskTime').innerHTML;
    confirmButton.innerHTML = `Edit`;

    if (e.target.parentElement.querySelector('.startTaskTime').innerHTML == '' && e.target.parentElement.querySelector('.endTaskTime').innerHTML == '') 
    {
        inputStartTime.setAttribute('disabled' ,'disabled');
        inputEndTime.setAttribute('disabled' ,'disabled');
    }    
}

function deleteEl(e){
    for (i=0; i<tasks.length; i++)
    {
        if (tasks[i]['name'] == e.target.parentElement.querySelector('.taskinfo').innerHTML && tasks[i]['startTime'] == e.target.parentElement.querySelector('.startTaskTime').innerHTML && tasks[i]['endTime'] == e.target.parentElement.querySelector('.endTaskTime').innerHTML)
        {
            tasks.splice(i, 1);
            break;
        }
    }

    index--;

    let len = localStorage.length;
    for(let i=0; i<len; i++)
    {
        localStorage.removeItem(`${i}`);
    }

    for(let i=0; i<tasks.length; i++){
        localStorage.setItem(`${i}`, JSON.stringify(tasks[i]));
    }

    e.target.parentElement.parentElement.style.opacity = `0`;
    setTimeout(() => {
        e.target.parentElement.parentElement.parentNode.removeChild(e.target.parentElement.parentElement)
    }, 550)

    deleteAllButton();

    if (tasks.length>=1) resultChecker();
    else document.querySelector('.resultChecker').innerHTML = '0%';
}

function deleteAllButton(){
    if (tasks.length >= 5){
        document.querySelector('.deleteAll').style.display = `flex`;
    }
    else{
        document.querySelector('.deleteAll').style.display = `none`;
    }
}

function deleteButton(){
    while (sect2.firstChild) {
        sect2.removeChild(sect2.firstChild);
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })

    let len = localStorage.length;
    for(let i=0; i<len; i++)
    {
        localStorage.removeItem(`${i}`);
    }
    
    index = 0;
    tasks.length = 0;
    deleteAllButton();
}

function commentAdd(e){
    for (i=0; i<tasks.length; i++)
    {
        if (tasks[i]['name'] == e.target.parentElement.querySelector('.taskinfo').innerHTML && tasks[i]['startTime'] == e.target.parentElement.querySelector('.startTaskTime').innerHTML && tasks[i]['endTime'] == e.target.parentElement.querySelector('.endTaskTime').innerHTML)
        {
            tasks[i]['comment'] = e.target.innerHTML;
            localStorage.removeItem(`${i}`);
            localStorage.setItem(`${i}`, JSON.stringify(tasks[i]));
        }
    }
}

// Key functional // 

document.addEventListener('keydown', function(e){
    if (e.key == `Enter` && e.target.className == 'inputExercize')
    {
        inputStartTime.focus(); 
    }
    else if (e.key == `Enter` && e.target.className == 'inputStartTime') 
    {
        inputEndTime.focus();
    }

    // && (/^\d{2}:\d{2}$/.test(inputStartTime.value) && /^\d{2}:\d{2}$/.test(inputEndTime.value)) || (inputStartTime.value == '' && inputEndTime.value == '')
    if (e.key == `Enter` && e.target.className != 'inputExercize' && e.target.className != 'inputStartTime' && e.target.className != 'addCondition toggleAdd')
    {
        confirmButton.click();
        confirmButton.style.color = `rgb(216, 216, 216)`;
        confirmButton.style.backgroundColor = `#29313b`;
        confirmButton.style.border = `0.5px solid rgb(91, 91, 91)`;
    }
})

document.addEventListener('keyup', function(e){
    // && inputStartTime.value == '' && inputEndTime.value == ''
    if (e.key == `Enter` && e.target.className != 'inputExercize' && e.target.className != 'addCondition toggleAdd')
    {
        confirmButton.style.color = `black`;
        confirmButton.style.backgroundColor = `#445262`;
        confirmButton.style.border = `0.5px solid black`;
        confirmButton.removeAttribute('style');
    }
})

function keyCheck(e){
    keyPress = e.key;
}

// localStorage.clear();

localSt();

new Sortable(sect2, {
    swap: true, // Enable swap plugin
	swapClass: 'highlight', // The class applied to the hovered swap item
    animation: 150,
});

function localSt(){
    for (let i=0; i<localStorage.length; i++)
    {
        if (/^\d{1,}$/.test(localStorage.key(i)))
        {
            let info = localStorage.getItem(`${localStorage.key(i)}`)
            info = JSON.parse(info);

            if (info.check == 'true' || info.check == true)
            {
                if (info.startTime == '' && info.endTime == '')
                {
                    sect2.innerHTML += `
                    <div class="taskContainer">
                        <div class="taskHead">
                            <div class="checkBoxer checkBoxer_checked"></div>
                            <div class="taskinfo taskinfo_checked" id="t${index}">${info.name}</div>
                            <div class="startTaskTime hidee" id="s${index}">${info.startTime}</div>
                            <div class="ruska hidee">-</div>
                            <div class="endTaskTime hidee" id="e${index}">${info.endTime}</div>
                            <button class="editButton" id="${index}">Edit</button>
                            <button class="deleteButton" id="${index}">Delete</button>
                        </div>
                        <div class="addCondition" required="required">${info.comment}</div>
                    </div>`
                }
                else {
                    sect2.innerHTML += `
                    <div class="taskContainer">
                        <div class="taskHead">
                            <div class="checkBoxer checkBoxer_checked"></div>
                            <div class="taskinfo taskinfo_checked" id="t${index}">${info.name}</div>
                            <div class="startTaskTime" id="s${index}">${info.startTime}</div>
                            <div class="ruska">-</div>
                            <div class="endTaskTime" id="e${index}">${info.endTime}</div>
                            <button class="editButton" id="${index}">Edit</button>
                            <button class="deleteButton" id="${index}">Delete</button>
                        </div>
                        <div class="addCondition" required="required">${info.comment}</div>
                    </div>`
                }
            }
            else if (info.check == 'false' || info.check == false){
                if (info.startTime == '' && info.endTime == '')
                {
                sect2.innerHTML += `
                    <div class="taskContainer">
                        <div class="taskHead">
                            <div class="checkBoxer"></div>
                            <div class="taskinfo" id="t${index}">${info.name}</div>
                            <div class="startTaskTime hidee" id="s${index}">${info.startTime}</div>
                            <div class="ruska hidee">-</div>
                            <div class="endTaskTime hidee" id="e${index}">${info.endTime}</div>
                            <button class="editButton" id="${index}">Edit</button>
                            <button class="deleteButton" id="${index}">Delete</button>
                        </div>
                        <div class="addCondition" required="required">${info.comment}</div>
                    </div>`
                }
                else{
                    sect2.innerHTML += `
                    <div class="taskContainer">
                        <div class="taskHead">
                            <div class="checkBoxer"></div>
                            <div class="taskinfo" id="t${index}">${info.name}</div>
                            <div class="startTaskTime" id="s${index}">${info.startTime}</div>
                            <div class="ruska">-</div>
                            <div class="endTaskTime" id="e${index}">${info.endTime}</div>
                            <button class="editButton" id="${index}">Edit</button>
                            <button class="deleteButton" id="${index}">Delete</button>
                        </div>
                        <div class="addCondition" required="required">${info.comment}</div>
                    </div>`
                }
            }
            
            tasks[index] = {
                name: `${info.name}`,
                startTime: `${info.startTime}`,
                endTime: `${info.endTime}`,
                comment: `${info.comment}`,
                check: `${info.check}`
            }
            index++;
        }
        resultChecker();
        deleteAllButton();
    }
}


// ------ Сміття -------//

// if (inputExercize.value != '' && /^\d{2}:\d{2}$/.test(inputStartTime.value) && /^\d{2}:\d{2}$/.test(inputEndTime.value) && inputStartTime.value.slice(0,2)<=23 && inputEndTime.value.slice(0,2)<=23 && (inputStartTime.value.slice(0,2)<inputEndTime.value.slice(0,2) || (inputStartTime.value.slice(0,2)==inputEndTime.value.slice(0,2) && inputStartTime.value.slice(3,5)<inputEndTime.value.slice(3,5))))