(function() {
  var result;
  var currentValue;
  var startButton = document.getElementById('start_btn');
  var stopButton = document.getElementById('stop_btn');
  var counter2 = document.getElementById('counter');
  var inputValue;
  let counter;

  function hide_stop_btn() {
    stopButton.style.display = 'none';
  }

  startButton.addEventListener('click', start);

  function getInitialValue() {
    if (result === undefined) {
      inputValue = counter2.value;
      const arr = inputValue.split(':');
      const hoursInSeconds = parseInt(arr[0]) * 60 * 60;
      const minutesInSeconds = parseInt(arr[1]) * 60;
      const seconds = parseInt(arr[2]);
      return sum(hoursInSeconds, minutesInSeconds, seconds);
    } else {
      inputValue = result;
      const arr = inputValue.split(':');
      const hoursInSeconds = parseInt(arr[0]) * 60 * 60;
      const minutesInSeconds = parseInt(arr[1]) * 60;
      const seconds = parseInt(arr[2]);
      return sum(hoursInSeconds, minutesInSeconds, seconds);
    }
  }

  function start() {
    if (result === undefined) {
      ('There is no Stops');
    } else {
      document.getElementById('list').innerHTML = result;
    }

    startButton.style.display = 'none';
    stopButton.style.display = '';
    document.getElementById('texter').innerHTML = 'Counting ...';
    currentValue = getInitialValue();
    showTime();

    counter = setInterval(function() {
      --currentValue;
      showTime();

      if (currentValue <= 0) {
        clearInterval(counter);
      }
    }, 1000);
  }

  function showTime() {
    if (result === '00:00:00') {
      counter2.value = '00:00:00';
    } else {
      result = counter2.value = formatTime(currentValue);
    }
  }

  function twoDigits(number) {
    return number < 10 ? `0${number}` : number;
  }

  function formatTime(seconds) {
    sec = seconds % 60;
    minutes = Math.floor((seconds % 3600) / 60);
    hours = Math.floor(seconds / 3600);
    return [twoDigits(hours), twoDigits(minutes), twoDigits(sec)].join(':');
  }

  function sum() {
    return [...arguments].reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);
  }

  stopButton.addEventListener('click', function() {
    clearInterval(counter);
    document.getElementById('texter').innerHTML = 'Counting Stopped';
    stopButton.style.display = 'none';
    startButton.style.display = '';
  });

  window.addEventListener('load', function() {
    hide_stop_btn();
  });
})();
