const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const doggos = document.querySelector(".doggos");

function addNewDoggo() {
    const dogPromise = fetch(DOG_URL);
    dogPromise
        .then(function (response) {
            const processingDogPromise = response.json();
            return processingDogPromise;
        })
        .then(function (processedDogResponse) {
            const img = document.createElement("img");
            img.setAttribute("src", processedDogResponse.message);
            img.setAttribute("alt", "Cute doggo");
            doggos.appendChild(img);
        });
}

document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);
