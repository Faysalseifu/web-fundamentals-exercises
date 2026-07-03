let button =
document.querySelector("#btn");

let quoteBox =
document.querySelector("#quote");

button.addEventListener(
    "click",
    getQuote
);

async function getQuote() {

    let response =
    await fetch(
    "https://api.quotable.io/random"
    );

    let data =
    await response.json();

    quoteBox.innerHTML =
    `
    <h3>${data.content}</h3>
    <p>- ${data.author}</p>
    `;

}



function App() {
  return (
    <h1>Hello React</h1>
  );
}