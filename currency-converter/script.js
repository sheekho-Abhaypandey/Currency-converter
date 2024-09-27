
const Base_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
console.log(Base_URL);
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for( let code in countryList){
//     console.log(code,countryList[code]);
// }

for (let select of dropdown) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  // console.log(amtval);
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
  console.log(URL);
  let response = await fetch(URL);

  // Check if the response is OK (status 200)
  if (!response.ok) {
    let errorText = await response.text();
    console.error("Error fetching data:", errorText);
    msg.innerText = "Error fetching data. Please try again.";
    return; // Stop further execution
  }

  // Parse the response if it's OK
  let data = await response.json();
  console.log(data);
  let rate = data[toCurr.value.toLowerCase()];


  console.log(rate);
  let finalamt = amtval * rate;
  msg.innerText = `${amtval} ${fromCurr.value} =${finalamt} ${toCurr.value}`;
};
const updateflag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


