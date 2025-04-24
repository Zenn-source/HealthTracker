document.getElementById("startButton").addEventListener("click", function() {
    document.body.classList.add("fade-out");

    setTimeout(function() {
        window.location.href = "dashboard.html";
    }, 1000); 
});

window.addEventListener('load', function () {
    document.body.classList.add('fade-in');
});

document.addEventListener('DOMContentLoaded', () => {
    const goalList = document.getElementById('goalList');
    let goals = JSON.parse(localStorage.getItem('goals')) || [];

    goals.sort((a, b) => b.priority - a.priority);

    goals.forEach(goal => {
        const goalItem = document.createElement('div');
        goalItem.classList.add('goal-item');
        goalItem.innerHTML = `
            <h3>${goal.name}</h3>
            <p>${goal.desc}</p>
            <p>Due: ${goal.due}</p>
            <p>Priority: ${goal.priority}</p>
        `;
        goalList.appendChild(goalItem);
    });
});

const saveGoalBtn = document.getElementById('saveGoalBtn');
const priorityBtns = document.querySelectorAll('.priority-btn');
const goalItemsContainer = document.getElementById('goalItemsContainer');
const backBtn = document.getElementById('backBtn');

let selectedPriority = 3; 

priorityBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        priorityBtns.forEach(button => button.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedPriority = e.target.dataset.priority;
    });
});

function displayGoals() {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    
    goals.sort((a, b) => b.priority - a.priority);

    goalItemsContainer.innerHTML = '';

    goals.forEach((goal, index) => {
        const goalItem = document.createElement('li');
        goalItem.classList.add('goal-item');
        goalItem.innerHTML = `
            <h3>${goal.name} (Priority: ${goal.priority})</h3>
            <p>${goal.desc}</p>
            <p>Due: ${goal.due}</p>
            <button class="deleteGoalBtn" data-index="${index}">Mark as Done</button>
        `;
        goalItemsContainer.appendChild(goalItem);
    });

    const deleteButtons = document.querySelectorAll('.deleteGoalBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const goalIndex = e.target.dataset.index;
            deleteGoal(goalIndex);
        });
    });
}

saveGoalBtn.addEventListener('click', () => {
    const goalName = document.getElementById('goalName').value;
    const goalDesc = document.getElementById('goalDesc').value;
    const goalDue = document.getElementById('goalDue').value;

    if (goalName && goalDesc && goalDue) {
        const newGoal = {
            name: goalName,
            desc: goalDesc,
            due: goalDue,
            priority: selectedPriority
        };

        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.push(newGoal);
        localStorage.setItem('goals', JSON.stringify(goals));

        displayGoals();
    } else {
        alert("Please fill out all fields before saving.");
    }
});

function deleteGoal(index) {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.splice(index, 1);
    localStorage.setItem('goals', JSON.stringify(goals));

    displayGoals();
}

window.onload = () => {
    displayGoals();
};

backBtn.addEventListener('click', () => {
    window.location.href = 'dashboard.html';
});

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    
    startButton.addEventListener('click', function () {
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 700); 
    });
});
