export function creerSlide(wineObject) {
  const slide = document.createElement("div"); //crée une div pour la slide
  slide.classList.add("swiper-slide"); //ajoute la classe swiper-slide à la div

  URL = "https://cruth.phpnet.org/epfc/caviste/public/pics/";

  //contenu de la slide
  slide.innerHTML = `
    <div class="bg-white rounded-lg p-4 flex flex-row product ">
      <div class="container-btv" class="flex-grow w-full md:pr-4 ">
        <img class="btv " src="${URL + wineObject.picture}" alt="photo du vin">
      </div>
      <div class="md:w-1/2 md:pl-4">
        <h2 id="h2Title" class="text-2xl font-bold mb-4">${wineObject.name}</h2>
          <ul>
            <li class="property" id="country">${wineObject.country}</li>
            <li class="property" id="grapes">${wineObject.grapes}</li>
            <li class="property" id="year">${wineObject.year}</li>
            <li class="property" id="capacity">${wineObject.capacity}</li>
            <li class="property" id="color">${wineObject.color}</li>
            <li class="property" id="price">${wineObject.price}</li>
          </ul>
      </div>
    </div>
  `;

  return slide;
}

// fonction de filtrage
export function filterResults(data, filterValue) {
  return data.filter((wine) => wine.name.toLowerCase().includes(filterValue.toLowerCase()));
}