
const form = document.querySelector("form");
const searchinput = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const button = document.getElementById("show-more-button");



const key='oZnlTeqBlNeIeeowMd9NqdrciBs3zYp4bIbBvhVAcMs';
let inputData="";
let page = 1;




async function searchImage(){
    inputData=searchinput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`;

    
    const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;

  results.map((result)=>{
    const imgcontainer=document.createElement('div');
    imgcontainer.classList.add('search-result');
    const image=document.createElement('img');
    image.src=result.urls.small;
    image.alt=result.alt_description;

    const link=document.createElement('a');
    link.href=result.links.html;
    link.target="_blank";
    link.textContent = result.alt_description;

    imgcontainer.appendChild(image);
    imgcontainer.appendChild(link);
    searchResult.appendChild(imgcontainer);
  });
  
  page++;
  if (page > 1) {
    button.style.display = "block";
  }
  
  }


form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
searchImage();
});

button.addEventListener("click", () => {
   searchImage();
});



