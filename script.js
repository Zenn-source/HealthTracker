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

    // Sort by priority (highest first)
    goals.sort((a, b) => b.priority - a.priority);

    // Display goals in the goalList section
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

let selectedPriority = 3; // Default priority

// Handle priority selection
priorityBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        priorityBtns.forEach(button => button.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedPriority = e.target.dataset.priority;
    });
});

// Function to save and display goals
function displayGoals() {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    
    // Sort the goals by priority (descending)
    goals.sort((a, b) => b.priority - a.priority);

    // Clear the current display
    goalItemsContainer.innerHTML = '';

    // Render the sorted goals
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

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.deleteGoalBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const goalIndex = e.target.dataset.index;
            deleteGoal(goalIndex);
        });
    });
}

// Handle saving a goal
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

        // Store goal in local storage
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.push(newGoal);
        localStorage.setItem('goals', JSON.stringify(goals));

        // Display the updated goals
        displayGoals();
    } else {
        alert("Please fill out all fields before saving.");
    }
});

// Function to delete a goal
function deleteGoal(index) {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.splice(index, 1);
    localStorage.setItem('goals', JSON.stringify(goals));

    // Display the updated goals
    displayGoals();
}

// Display stored goals on page load
window.onload = () => {
    displayGoals();
};

// Back button to redirect to the dashboard
backBtn.addEventListener('click', () => {
    window.location.href = 'dashboard.html';
});

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    
    startButton.addEventListener('click', function () {
        // Fade out the landing page
        document.body.classList.add('fade-out');

        // Wait for the fade-out effect to complete before redirecting
        setTimeout(() => {
            // Redirect to the dashboard page (update the URL if needed)
            window.location.href = "dashboard.html";
        }, 700);  // This should match the duration of the fade-out effect (0.7s)
    });
});
