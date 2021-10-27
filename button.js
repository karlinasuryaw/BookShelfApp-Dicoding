function createButton(buttonTypeClass, textButton, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = textButton;

    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}
function createUndoButton() {
    return createButton("green", "Unfinished", function(event){
        undoCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("red", "Delete",function(event){
        removeCompleted(event.target.parentElement);

    });
}

function createCheckButton() {
    return createButton("green", "Completed", function(event){
         addTaskToCompleted(event.target.parentElement);
    });
}
