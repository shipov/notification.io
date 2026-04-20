const notifications = document.querySelector(".notifications"),
buttons = document.querySelectorAll(".buttons .btn");

const toastDetails = {
    timer: 5000,
    success: {
        icon: 'fa-circle-check',
        text: 'Success: This is a success toast.',
    }
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}

const createToast = (id) => {
    // Getting the icon and text for the toast based on the id passed
    const { icon, text } = toastDetails[id];
    const toast = document.createElement("li"); // Creating a new 'li' element for the toast
    toast.className = `toast ${id}`; // Setting the classes for the toast
    // Setting the inner HTML for the toast
    toast.innerHTML = `<div class="notification success" id="task-created-notification">
        <div class="notification-icon"><img src="icon_n.svg" width="100%"></div>
        <div class="notification-content">
            <h4>Задача успешно создана</h4>
            <div class="wrap">
                <p>Вы можете перейти к её редактированию<br>или назначить исполнителя.</p>
                <div class="wrap_button">
                    <button class="btn-primary" onclick="navigateToTask()">Перейти к задаче</button>
                    <button class="btn-close" onclick="hideNotification()">Закрыть</button>
                </div>
            </div>
            <button class="notification-close" onclick="removeToast(this.parentElement)"></button>
        </div>
    </div>`;
    notifications.appendChild(toast); // Append the toast to the notification ul
    // Setting a timeout to remove the toast after the specified duration
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

// Adding a click event listener to each button to create a toast when clicked
buttons.forEach(btn => {
    btn.addEventListener("click", () => createToast(btn.id));
});


function showNotification() {
  const notification = document.getElementById('task-created-notification');
  notification.style.display = 'flex';

  setTimeout(() => {
    hideNotification();
  }, 50);
}

function hideNotification() {
  const notification = document.getElementById('task-created-notification');
  notification.style.opacity = '0';
  notification.style.transform = 'translateY(-200px)';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 300);
}

function navigateToTask() {
  // Здесь код для перехода на страницу задачи
  hideNotification();
}