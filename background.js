let intervalID;

function setIconState(state) {
  let iconDetails = {};
  if (state === "on") {
    iconDetails = {
      path: {
        "16-on": "images/icon16-on.png",
      }
    };
  } else if (state === "off") {
    iconDetails = {
      path: {
        "16-off": "images/icon16-off.png"
      }
    };
  }
  chrome.action.setIcon(iconDetails);
}

function clickScreen() {
    let flashDiv = document.createElement('div');
    flashDiv.style.position = 'fixed';
    flashDiv.style.left = '0';
    flashDiv.style.top = '0';
    flashDiv.style.width = '100%';
    flashDiv.style.height = '100%';
    flashDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // Semi-transparent white
    flashDiv.style.zIndex = '2147483647'; // Max value to ensure it's on top
    document.body.appendChild(flashDiv);

    setTimeout(() => {
        document.body.removeChild(flashDiv);
    }, 300); // Remove the flash after 300 milliseconds

    clickCount++;
    chrome.storage.local.set({ 'clickCount': clickCount });

    document.body.click();
}


function setBadgeState(state) {
    if (state === "on") {
        chrome.action.setBadgeText({text: 'ON'});
        chrome.action.setBadgeBackgroundColor({color: '#0F0'}); // Green color
    } else if (state === "off") {
        chrome.action.setBadgeText({text: "OFF"});
        chrome.action.setBadgeBackgroundColor({color: '#F00'}); // Red color
    }
}

document.getElementById("start").addEventListener("click", function() {
  setIconState("on");
  setBadgeState("on");

  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/icon16-on.png',
    title: 'Keep-Alive Status',
    message: 'Keep-Alive Started!'
  });

  intervalID = setInterval(clickScreen, 5000);
});

document.getElementById("stop").addEventListener("click", function() {
  setIconState("off");
  setBadgeState("off");
  clearInterval(intervalID);
  
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/icon16-off.png',
    title: 'Keep-Alive Status',
    message: 'Keep-Alive Stopped!'
  });
});
