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
  notification.style.transform = 'translateY(-20px)';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 300);
}

function navigateToTask() {
  // Здесь код для перехода на страницу задачи
  hideNotification();
}

function showNotificationWithProgress(message, duration = 5000) {
  const notification = document.createElement('div');
  notification.className = 'notification progress-notification';
  notification.innerHTML = `
    <span>${message}</span>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  `;
  document.body.appendChild(notification);

  const progressFill = notification.querySelector('.progress-fill');

  let startTime = null;

  function animateProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    progressFill.style.width = `${progress * 100}%`;

    if (progress < 1) {
      requestAnimationFrame(animateProgress);
    } else {
      hideNotification(notification);
    }
  }

  requestAnimationFrame(animateProgress);
}