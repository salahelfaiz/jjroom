window.onload = function() {
  // Time settings
  const allowedStartTime = 20; // 7 PM in 24-hour format
  const allowedEndTime = 19; // 8 PM in 24-hour format
  const timezoneOffset = 0; // Morocco time is UTC+0

  function checkAvailability() {
    const now = new Date();
    const currentHour = now.getUTCHours() + timezoneOffset;

    if (currentHour >= allowedStartTime && currentHour < allowedEndTime) {
      document.getElementById('availability_container').style.display = 'none';
      document.getElementById('main_content').style.display = 'block';
    } else {
      document.getElementById('availability_container').style.display = 'block';
      document.getElementById('main_content').style.display = 'none';
      displayCountdown();
    }
  }

  function displayCountdown() {
    const now = new Date();
    const nextStart = new Date(now.getTime());
    nextStart.setUTCHours(allowedStartTime, 0, 0, 0);
    if (now.getUTCHours() >= allowedEndTime) {
      nextStart.setUTCDate(nextStart.getUTCDate() + 1);
    }

    const countdownInterval = setInterval(() => {
      const now = new Date();
      const timeDiff = nextStart.getTime() - now.getTime();

      if (timeDiff <= 0) {
        clearInterval(countdownInterval);
        checkAvailability();
        return;
      }

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      document.getElementById('countdown').textContent = `Disponible dans ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }

  // Initial check
  checkAvailability();
};
