const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList"; 
const BOOK_IID = "itemId";


function makeBook(data, author, time_year, isDone) {
 
    const textTitle = document.createElement("h3");
    textTitle.innerText = data;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;
 
    const texttime_year = document.createElement("h5");    
    texttime_year.innerText = time_year;


    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(textTitle, textAuthor, texttime_year);

    if(isDone){
        container.append(
            createUndoButton(),
            createTrashButton());
    } else {
        container.append(
            createCheckButton(),
            createTrashButton());
    }
 
    return container;
}


function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID );
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const txt_book = document.getElementById("inputBookTitle").value;
    const author_book = document.getElementById("inputBookAuthor").value;
    const time_year = document.getElementById("inputBookYear").value;
    const isRead = document.getElementById("inputBookIsComplete").checked;
    let book = makeBook(txt_book, author_book, time_year, false);
    let bookObject = composeBookObject(txt_book, author_book, time_year, false);

    if (isRead) {
        book = makeBook(txt_book, author_book, time_year, true);
        bookObject = composeBookObject(txt_book, author_book, time_year, true);       

        listCompleted.append(book);
    } else {       
    
        uncompletedBOOKList.append(book);
    }

    book[BOOK_IID] = bookObject.id;
    books.push(bookObject);
    updateDataToStorage();
    
}

function addTaskToCompleted(taskElement) {
    const tsk_title = taskElement.querySelector(".book_item > h3").innerText;
    const tsk_author = taskElement.querySelector(".book_item > p").innerText;
    const tsk_year = taskElement.querySelector(".book_item > h5").innerText;
 
    const newBook = makeBook(tsk_title, tsk_author, tsk_year, true);
    const book = get_book(taskElement[BOOK_IID]);
    book.isDone = true;
    newBook[BOOK_IID] = book.id;

    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    listCompleted.append(newBook);
    taskElement.remove();
    alert("Dimasukkan kedalam list selesai dibaca");
    updateDataToStorage()
}

function removeCompleted(taskElement) {
    const bookPosition = book_idx(taskElement[BOOK_IID]);
    books.splice(bookPosition, 1);    
    taskElement.remove(); 
    alert("Buku berhasil dihapus");    
    updateDataToStorage();

}

function undoCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const tsk_title = taskElement.querySelector(".book_item > h3").innerText;
    const tsk_author = taskElement.querySelector(".book_item > p").innerText;
    const tsk_year = taskElement.querySelector(".book_item > h5").innerText;
    
    const newBook = makeBook(tsk_title, tsk_author, tsk_year, false);

    const book = get_book(taskElement[BOOK_IID]);
    book.isDone = false;
    newBook[BOOK_IID] = book.id;
    
    listUncompleted.append(newBook);
    taskElement.remove();
    alert("Dimasukkan kedalam list belum selesai dibaca");

    updateDataToStorage();
}

const search = document.getElementById("searchBook");
search.addEventListener("keyup",searchBook);
function searchBook(element) {
   
    const cari = element.target.value.toLowerCase();
    let itemList = document.querySelectorAll(".book_item");

    itemList.forEach((item) => {
        const isi = item.firstChild.textContent.toLowerCase();
        if(isi.indexOf(cari) != -1) {
            item.setAttribute("style", "display: block;");
        } else {
            item.setAttribute("style", "display: none !important;");
        }
    });    
}