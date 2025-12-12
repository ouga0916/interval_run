function Clear() {
    localStorage.clear();
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
}

function Load() {
    const ul = document.querySelector("ul");
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement("li");
        li.textContent = localStorage.getItem(arr[i]);
        const br = document.createElement("br");
        br.textContent = "";
        ul.appendChild(li);
        ul.appendChild(br);
    }
}

    const clearBtn = document.querySelector("#clear");
    let arr = JSON.parse(localStorage.getItem("keyDate") || "[]");
    clearBtn.addEventListener("click", Clear);

    Load();
