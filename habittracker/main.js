"use strict";
let habits = [];
function uuid() {
    return Math.random().toString(36).substring(2, 9);
}
function listeyiGuncelle() {
    const liste = document.getElementById("habit-listesi");
    if (!liste)
        return;
    liste.innerHTML = "";
    habits.forEach(habit => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.completed;
        checkbox.addEventListener("change", () => {
            habit.completed = checkbox.checked;
            ilerlemeGuncelle();
        });
        const span = document.createElement("span");
        span.textContent = habit.name;
        const silBtn = document.createElement("button");
        silBtn.textContent = "Sil";
        silBtn.addEventListener("click", () => {
            habits = habits.filter(h => h.id !== habit.id);
            listeyiGuncelle();
            ilerlemeGuncelle();
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(silBtn);
        liste.appendChild(li);
    });
}
function ilerlemeGuncelle() {
    const progressText = document.getElementById("progress");
    if (!progressText)
        return;
    if (habits.length === 0) {
        progressText.textContent = "İlerleme: %0";
        return;
    }
    const tamamlanan = habits.filter(h => h.completed).length;
    const yuzde = Math.round((tamamlanan / habits.length) * 100);
    progressText.textContent = `İlerleme: %${yuzde}`;
}
const form = document.getElementById("habit-form");
const input = document.getElementById("habit-input");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const habitAdi = input.value.trim();
    if (habitAdi === "")
        return;
    const yeniHabit = {
        id: uuid(),
        name: habitAdi,
        completed: false
    };
    habits.push(yeniHabit);
    input.value = "";
    listeyiGuncelle();
    ilerlemeGuncelle();
});
