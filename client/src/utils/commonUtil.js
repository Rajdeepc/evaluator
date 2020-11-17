const copyToClipBoard = (txtElem) => {
  txtElem.select();
  document.execCommand("copy");
}

const targetElementById = (id) => {
  const textBox =  document.getElementById(id);
  return textBox
}

const setValueToSessionStorage = (keyName, userSessionObj) => {
  sessionStorage.setItem(keyName, JSON.stringify(userSessionObj))
}

const getValueFromSession = (key) => {
  const sessionData = JSON.parse(sessionStorage.getItem(key));
  return sessionData
}


const shuffleArray = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

  // a unique random key generator
  const getUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  }


export {
  getUniqueId,
  shuffleArray,
  copyToClipBoard,
  targetElementById,
  setValueToSessionStorage,
  getValueFromSession
}