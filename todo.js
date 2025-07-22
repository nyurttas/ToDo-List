//HTML Elementlerini seçerek bir değişkene atıyoruz
// const bodyElement = document.querySelector("#body")
const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const addButton = document.querySelector("#add")
const firstBody = document.querySelector("#first-body")
const secondBody = document.querySelector("#second-body")
const serchInput = document.querySelector("#search")
const todoList = document.querySelector("#todo-list")
const clearButton = document.querySelector("#clear")

// İlk yaptığımız işlem eventleri oluşturacak yapıyı kurmak

loadEventListener()
function loadEventListener() {
    form.addEventListener("submit", addToDo)
    document.addEventListener("DOMContentLoaded",loadApp) // sayfa yüklendiğinde loadApp fonksiyonunu çağırır
    // loadApp fonksiyonu, sayfa yüklendiğinde çalışacak olan fonksiyondur
    todoList.addEventListener("click", deleteToDo) // ToDo'ya tıklama olayını dinler
    clearButton.addEventListener("click", clearAllToDos) // Clear butonuna tıklama olayını dinler   
    serchInput.addEventListener("keyup", searchToDo) // arama kutusuna yazma olayını dinler 
}
// 1. Adım To Do Ekliyoruz
function addToDo(e){
    const newTodo = todoInput.value.trim();
    if(newTodo === ""){
        console.log("Boş değer girilemez...");
    }else{
        createToDoListItem(newTodo);
        addTodoToLocalStorage(newTodo);     
    }
    e.preventDefault();
}

//2. Adım
function createToDoListItem(todo){
    // <li class="list-group-item bg-dark text-light d-flex justify-content-between align-items-center"><span>HTML</span><i class="fa-solid fa-trash"></i></li>
    const todoItem = document.createElement("li");
    todoItem.className = "list-group-item bg-dark text-light";
    todoItem.classList.add("d-flex","justify-content-between","align-items-center");
    const spanElement = document.createElement("span");
    spanElement.appendChild(document.createTextNode(todo));
    todoItem.appendChild(spanElement);
    todoItem.innerHTML += `<i class="fa-solid fa-trash"></i>`;
    todoList.appendChild(todoItem);
    todoInput.value = "";
    todoInput.focus();

    //todoItem.textContent = newTodo;
    // todoItem.appendChild(document.createTextNode(newTodo));
    // todoList.appendChild(todoItem);
    //console.log(newTodo);
}

//3. Adım Local Storage üzerinden veri çekip değeri dönmek.
function getTodosFromLocalStorage(){
    let todos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        :[];
    return todos;
}

//4. Adım Local Storage Üzerine Yeni todo eklemek.
function addTodoToLocalStorage(todo){
    let todos = getTodosFromLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

    
        // console.log(todos);
        // console.log(typeof todos);
}

// 5. Adım Sayfa ilk açılırken sayfada todoları göstermek
function loadApp(){
    let todos = getTodosFromLocalStorage();

    //console.log(todos);
    todos.forEach((todo) => {
        createToDoListItem(todo);
    })

}    





// 6.Adım To do silme fonksiyonu
function deleteToDo(e) {
    if (e.target.className === "fa-solid fa-trash") { // eğer tıklanan element delete-item classına sahipse
        console.log(e.target.parentElement)
     e.target.parentElement.remove() // tıklanan elementin parent elementini siler


      deleteToDoFromLocalStorage(e.target.parentElement.firstChild.textContent) // deleteToDoFromLocalStorage fonksiyonunu çağırır ve e değerini gönderir  

    }
}

// 7.Adım Local Storage'dan ToDo'ları silme fonksiyonu
function deleteToDoFromLocalStorage(deletedtodo) {
    let todos = getTodosFromlocalStorage() 

    //FOREACH ile diziyi döngüye alır ve silmek istediğimiz todo'yu buluruz    
    // todos.forEach ((todo, index) => {
        //     if (todo === e.target.parentElement.firstChild.textContent) { // eğer todo değeri tıklanan elementin parent elementinin text içeriğine eşitse
        //         todos.splice(index, 1) // todos dizisinden o elementi siler
        //     }
        // })

        //FILTER ile diziyi filtreleyerek ilgili elemanı silmek (daha kolay ve okunaklı)


        todos = todos.filter(todo => todo !== deletedtodo) // todos dizisini filtreler ve silmek istediğimiz todo'yu buluruz
        // todos dizisini güncelleriz
        localStorage.setItem("todos", JSON.stringify(todos)) // todos dizisini localStorage'a kaydeder
}

//8.Adım Clear butonuna tıklama fonksiyonu 
function clearAllToDos() {
   
    while (todoList.firstElementChild != null) { // todoList'in ilk çocuğu varken döngüye girer

        todoList.removeChild(todoList.firstElementChild) // todoList'in ilk çocuğunu siler
    }
    localStorage.removeItem("todos") // localStorage'dan todos değerini siler
    // localStorage.clear() // localStorage'daki tüm verileri siler
}

//9.Adım search fonksiyonu
function searchToDo(e) {
    const searchText = e.target.value.toLowerCase() // arama kutusundaki değeri alır ve küçük harfe çevirir
    const listToDoItems = document.querySelectorAll("li") // tüm li elementlerini alır
     listToDoItems.forEach(item => { // todos dizisini döngüye alır
        const itemText = item.firstElementChild.textContent.toLowerCase() // her bir li elementinin text içeriğini alır ve küçük harfe çevirir
        if (itemText.indexOf(searchText) === -1) { // eğer arama kutusundaki değer li elementinin text içeriğinde yoksa
            item.setAttribute("style", "display:none !important") // li elementini gizler. important nedir? // CSS'de !important ile bir stilin önceliğini artırırız. Bu, belirli bir stilin diğer stillerden daha öncelikli olmasını sağlar.
            // item.style.display = "none" // li elementini gizler      

            
        } else {
            item.setAttribute("style", "display:block") // li elementini gösterir
        }
       
    })
}