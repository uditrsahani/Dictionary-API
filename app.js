// alert(
//   "This website is made by a Siam University student. This is not the university's official website."
// );
document.getElementById("fetchDataBtn").addEventListener("click", fetchData);

function fetchData() {
  // Replace 'https://api.example.com/data' with the actual URL of your API
  let word = document.getElementById("search").value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the fetched data
      // console.log(data);
      console.log(data);
      const word = data[0].word;
      const phonetic = data[0].phonetic;
      const audio = data[0].phonetics[0].audio;
      // Assuming there's always at least one phonetic entry
      const origin = data[0].origin;

      //DOM Variable
      const output = document.getElementById("dictionary-container");
      const wordOutput = document.getElementById("word");
      const phoneticOutput = document.getElementById("phonetic");
      const audioOutput = document.getElementById("audio");
      const meaningOutput = document.getElementById("meaning");
      const exampleOutput = document.getElementById("example");
      const audiorror = document.getElementById("audioerror");

      //Displaying ouput
      wordOutput.innerText = "Word: " + word;

      if (phonetic) {
        phoneticOutput.innerText = "Phonetic: " + phonetic;
      }

      // let audioArray = audio.split(".");
      // console.log(audioArray[audioArray.length - 1])

      audio.split(".");
      if (audio.length >= 1) {
        console.log("Audio is okay");
        audioOutput.style.display = "";
        audioOutput.src = audio;
        audiorror.innerText = "";
      } else {
        console.log("Audio is not okay");
        audioOutput.style.display = "none";
        audiorror.innerText = "Audio: Not available for this word.";
      }

      //definitions
      const partofspeech = document.getElementById("partofspeech");
      const definition = document.getElementById("definition");
      const synonyms = document.getElementById("synonyms");
      const antonyms = document.getElementById("antonyms");
      data.forEach((entry) => {
        entry.meanings.forEach((meaning) => {
          meaning.definitions.forEach((def) => {
            console.log(`Word: ${entry.word}`);
            partofspeech.innerHTML = `Part of Speech: ${meaning.partOfSpeech}`;

            definition.innerHTML = `Definition: ${def.definition}`;

            synonyms.innnerHTML = `Synonyms: ${def.synonyms}`;

            antonyms.innerHTML = `Antonyms: ${def.antonyms}`;
          });
        });
      });
    })
    .catch((error) => {
      // Handle errors
      const wordOutput = document.getElementById("word");
      const phoneticOutput = document.getElementById("phonetic");
      const audioOutput = document.getElementById("audio");
      const meaningOutput = document.getElementById("meaning");

      wordOutput.innerText = "Word: " + "Please enter a correct word!";
      console.error("Error fetching data:", error);
      audioOutput.style.display = "none";
      phoneticOutput.innerText = "Phonetic: ";
      meaningOutput.innerText = "Meaning: ";
    });
}
