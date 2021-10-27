const STORAGE_KEY = "BOOKS";
 
let books = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(books);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   let data = JSON.parse(serializedData);
   if(data !== null)
       books = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composeBookObject(task, author, timestamp, isDone) {
   return {
       id: +new Date(),
       task,
       author,
       timestamp,
       isDone
   };
}
 
function get_book(bookId) {
   for(book of books){
       if(book.id === bookId)
           return book;
   }
   return null;
}
 
function book_idx(bookId) {
   let index = 0
   for (book of books) {
       if(book.id === bookId)
           return index;

       index++;
   }
 
   return -1;
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    for(book of books){
        const newBook = makeBook(book.task, book.author, book.timestamp, book.isDone);
        newBook[BOOK_IID] = book.id;
  
        if(book.isDone){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
 }