const busca = document.querySelector(".btn-pesquisa");
const container = document.querySelector(".container");
const infos = document.querySelector(".infos");
const erro = document.querySelector(".error");
const inputCidade = document.querySelector(".input-pesquisa");
const apiKey = "65f2647b73260cf99fa90da36e57e92c";

busca.addEventListener("click", () => {
  pegarClima(document.querySelector(".input-pesquisa").value);
});

inputCidade.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    pegarClima(document.querySelector(".input-pesquisa").value);
  }
});

function pegarClima(cidade) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cidade +
      "&units=metric&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data) => displayClima(data));
}

function displayClima(data) {
  if (data.name == undefined) {
    container.classList.remove("expandir-sucesso");
    infos.classList.remove("fade-in");

    container.classList.add("expandir-erro");
    erro.classList.add("fade-in");
  } else {
    container.classList.remove("expandir-erro");
    erro.classList.remove("fade-in");

    container.classList.add("expandir-sucesso");
    infos.classList.add("fade-in");

    document.querySelector(".local").innerText = "Clima em " + data.name;
    document.querySelector(".temp-principal").innerText =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".sens-termica").innerText =
      "Sens. Térmica: " + Math.round(data.main.feels_like) + "°C";
    document.querySelector(".ventos").innerText =
      "Ventos: " + data.wind.speed + "km/h";
    document.querySelector(".humidade").innerText =
      "Humidade: " + data.main.humidity + "%";
    document.querySelector(".tempo").innerText =
      "Tempo: " + data.weather[0].description;
    document.querySelector(".icone").src =
      "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  }
}
