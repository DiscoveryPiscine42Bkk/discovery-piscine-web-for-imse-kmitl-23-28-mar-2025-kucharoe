$(document).ready(function () {
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }

    function getCookies() {
        let cookies = document.cookie.split("; ");
        let todos = [];
        cookies.forEach(cookie => {
            let index = cookie.indexOf("=");
            if (index !== -1) {
                let key = cookie.substring(0, index);
                let value = cookie.substring(index + 1);
                todos.push({ id: key, text: decodeURIComponent(value) });
            }
        });
        return todos;
    }

    function createTodo(txt, id = Date.now()) {
        let node = $(`<div data-id="${id}">${txt}</div>`);
        node.css({
            "margin": "10px auto",
            "background-color": "#14bbd8",
            "padding": "10px",
            "border-radius": "10px",
            "cursor": "pointer",
            "display": "block",
            "text-align": "center",
            "width": "fit-content"
        });
        node.on("click", function () {
            if (confirm("Do you want to delete?")) {
                $(this).remove();
                document.cookie = id + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            }
        });
        $("#ft_list").prepend(node);
    }

    function loadTodos() {
        let todos = getCookies();
        todos.forEach(todo => createTodo(todo.text, todo.id));
    }

    $("#newTodo").on("click", function () {
        let txt = prompt("Please Enter TODO LIST:");
        if (txt) {
            let id = Date.now();
            setCookie(id, txt, 7);
            createTodo(txt, id);
        }
    });

    loadTodos();
});