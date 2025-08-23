//Storing Form details as object
const form=document.getElementById("feedback-form");
const existingFeedbacks = JSON.parse(localStorage.getItem('all-feedbacks') || '[]');


form.addEventListener('submit',function(event) {
    event.preventDefault(); 
    const formdata= new FormData(form);
    const formobj= Object.fromEntries(formdata.entries())
    console.log(formobj);
    existingFeedbacks.push(formobj);
    localStorage.setItem('all-feedbacks', JSON.stringify(existingFeedbacks));
    console.log(existingFeedbacks);
    alert('Form submitted successfully!');
    form.reset(); 
});

//character count for feedback textarea
const feedbackTA = document.getElementById('feedback');
const charCount = document.getElementById('character-count');
feedbackTA.addEventListener('input', function() {
    const count = feedbackTA.value.length;
    charCount.textContent = `Characters: ${count} `;
});

//session Storage to display welcome back message
const nameInput = document.getElementById('name');
const welcomeMessage = document.getElementById('welcome-message');

nameInput.addEventListener('change', () => {
    const currentName = nameInput.value.trim();
    if (currentName) {
        sessionStorage.setItem('name', currentName);
        welcomeMessage.innerHTML = `Welcome, <i class="text-yellow-200">${currentName}!</i>`;
    } else {
        sessionStorage.removeItem('name'); 
        welcomeMessage.innerHTML = `Hello, <i class="text-yellow-200">Student!</i>`;
    }
});

// to show all feedbacks in local storage

function displayAllFeedbacks() {
  const feedbackList = document.getElementById('feedback-list');
  const allFeedbacks = JSON.parse(localStorage.getItem('all-feedbacks')) || [];

  feedbackList.innerHTML = ''; // Clear existing feedbacks

  allFeedbacks.forEach(feedback => {
    const feedbackItem = document.createElement('div');
    feedbackItem.className = 'bg-gray-800 border border-gray-700 hover:shadow-xl transition-shadow duration-300 p-6 rounded-xl';

    feedbackItem.innerHTML = `
      <h3 class="text-xl font-bold text-yellow-300 mb-2">${feedback.name}</h3>
      <p class="text-sm text-gray-400 mb-1"><span class="font-semibold text-white">Email:</span> ${feedback.email}</p>
      <p class="text-sm text-gray-400 mb-1"><span class="font-semibold text-white">Department:</span> ${feedback.department}</p>
      <p class="text-sm text-gray-400 mb-1"><span class="font-semibold text-white">Rating:</span> ${feedback.rank}</p>
      <p class="text-sm text-gray-300 mt-3"><span class="font-semibold text-white">Feedback:</span><br>${feedback.feedback}</p>
    `;

    feedbackList.appendChild(feedbackItem);
  });
}

document.addEventListener('DOMContentLoaded', displayAllFeedbacks);
window.addEventListener('submit', displayAllFeedbacks);

// Clear all feedbacks
const clearFeedbacksButton = document.getElementById('clear-feedbacks');
clearFeedbacksButton.addEventListener('click', () => {
  localStorage.removeItem('all-feedbacks');
  displayAllFeedbacks();}
);
