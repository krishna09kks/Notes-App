showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById('addbtn');
addBtn.addEventListener('click', function(e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');

    let title = localStorage.getItem('title');
    if(title == null){
        titleObj = [];
    }
    else{
        titleObj = JSON.parse(title);
    }

    let body = localStorage.getItem('body');
    if(body == null){
        bodyObj = [];
    }
    else{
        bodyObj = JSON.parse(body);
    }

    titleObj.push(addTitle.value);
    localStorage.setItem("title", JSON.stringify(titleObj));

    bodyObj.push(addTxt.value);
    localStorage.setItem("body", JSON.stringify(bodyObj));

    addTitle.value = "";
    addTxt.value = "";

    showNotes();
})

// Function to show elements from localStorage
function showNotes() {
    let title = localStorage.getItem('title');
    if(title == null){
        titleObj = [];
    }
    else{
        titleObj = JSON.parse(title);
    }

    let body = localStorage.getItem('body');
    if(body == null){
        bodyObj = [];
    }
    else{
        bodyObj = JSON.parse(body);
    }

    let html = "";

    titleObj.forEach(function(element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 17rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element}</h5>
                        <p class="card-text"> ${bodyObj[index]}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });

    let notesElm = document.getElementById("noteCard");
    console.log(notesElm);
    if (titleObj.length != 0) {
        notesElm.innerHTML = html;
    } 
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    let title = localStorage.getItem("title");
    if (title == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(title);
    }

    titleObj.splice(index, 1);
    localStorage.setItem("title", JSON.stringify(titleObj));

    let body = localStorage.getItem("body");
    if (body == null) {
        bodyObj = [];
    } else {
        bodyObj = JSON.parse(body);
    }

    bodyObj.splice(index, 1);
    localStorage.setItem("body", JSON.stringify(bodyObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
