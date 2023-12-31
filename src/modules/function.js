/**
 * Permet de créer une div contenant les informations d'un vin
 *
 * @param {object} wineObject un objet vin
 * @returns  {HTMLElement} Une div contenant les informations du vin
 */
export function creerSlide(wineObject) {
  const divSlide = document.createElement("div"); //crée une div pour la slide
  divSlide.classList.add("swiper-slide"); //ajoute la classe swiper-slide à la div

  URL = "https://cruth.phpnet.org/epfc/caviste/public/pics/";

  //contenu de la slide
  divSlide.innerHTML = `
    <div class="bg-white rounded-lg p-4 flex flex-row product ">
      <li class="property jetetiens" style="display: none;">${
        wineObject.description
      }</li>
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

  return divSlide;
}

/**
 *
 *
 * @param {Array} tabWinesObjects Un tableau d'objets de vins
 * @param {string} inputValue La valeur du champs de recherche
 * @returns {Array<Objects>} Un tableau d'objets de vins filtrés
 */
// fonction de filtrage
export function filterResults(tabWinesObjects, inputValue) {
  let normalizedWineName = ""; // résultat des vins ou on remplace les accents
  //input des vins ou on remplace les accents
  const normalizedInput = inputValue.replaceAll(/[â]/g, "a").toLowerCase();

  return tabWinesObjects.filter((wine) => {
    normalizedWineName = wine.name.replaceAll(/[â]/g, "a").toLowerCase();
    return normalizedWineName.includes(normalizedInput);
  });
}

/**
 * Permet de créer un nouveau swiper
 *
 * @param {HTMLElement} wrapper Le HTML du swiper que l'on souhaite créer
 */
export function newSwiper(wrapper) {
  // Initialisation de Swiper
  const swiper = new Swiper(wrapper, {
    slidesPerView: "auto", //Nombre de slides en dynamique
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  // On récupère la div qui contiendra la description
  const divDescription = document.getElementById("productInfosContent");
  // On crée un paragraphe qui contiendra la description
  const pDescription = document.createElement("p");
  // On ajoute le paragraphe du premier vin à la div
  pDescription.innerHTML =
    "With hints of ginger and spice, this wine makes an excellent complement to light appetizer and dessert fare for a holiday gathering.";
  // On ajoute le paragraphe à la div
  divDescription.appendChild(pDescription);

  // On écoute l'événement slideChange
  swiper.on("slideChange", () => {
    // On récupère la slide active
    const activeSlide = swiper.slides[swiper.activeIndex];
    // On récupère l'élément qui contient la description
    const descriptionElement = activeSlide.querySelector(".jetetiens");
    // Si l'élément existe
    if (descriptionElement) {
      // On vide la div
      divDescription.innerHTML = "";
      // On récupère le texte de la description
      const description = descriptionElement.textContent;
      // On ajoute la description à notre paragraphe
      pDescription.innerHTML = description;
      // On ajoute le paragraphe à la div
      divDescription.appendChild(pDescription);
    }
  });
}

/**
 * permet de rajouter plusieurs attributs d'un coup à un élément
 * exemple setAttributes(userName, {"id":"userName", "type":"text"})
 *
 * @param {string} element
 * @param {string} attributes
 */

export default function setAttributes(element, attributes) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

/**
 *
 * fonction de récupération dans un fichier json
 *
 * @param {array} tabData le tableau d'objet
 * @param {string} key la propriété de l'objet qu'on souhaite récupérer
 *
 */

export function getData(tabData, key) {
  //récupère toute les clés de l'objet
  let tabKeys = Object.keys(tabData[0]);
  let value = [];
  //si la clé entrée par l'user existe
  if (tabKeys.includes(key)) {
    value = [key];
    for (let data of tabData) {
      if (!value.includes(data[key])) {
        value.push(data[key]);
      }
    }
  } else {
    console.log("valeur inconnue");
  }
  return value;
}

/**
 * Crée plusieurs éléments html en fonction du tableau donné
 *
 * @param {array} tabData  le tableau des valeurs
 * @param {string} htmlElement  l'élement HTML qu'on souhaite créer
 * @param {string} parentHtmlElement l'élément parent
 */
export function createMultiElements(tabData, htmlElement, parentHtmlElement) {
  tabData.forEach((data) => {
    let dataElement = document.createElement(htmlElement);
    dataElement.innerHTML = data; // on lui donne la valeur
    //si le nombre d'enfant <= tableau de données, on ajoute les enfants
    if (parentHtmlElement.childElementCount <= tabData.length) {
      parentHtmlElement.appendChild(dataElement);
    }
  });
}

/**
 * Filtre les données en fonction de la valeur du champ ciblé
 *
 * @param {array} tabKeys le tableau des clés, tabKey[0] == selectorName
 * @param {string} wanted ce que l'on recherche
 * @param {Array<Objects>} jsonDataObject le json entier
 */

export function dataFilter(tabKeys, wanted, jsonDataObject) {
  let swiperContainer = document.querySelector(".swiper"); //L'ensemble du swiper
  swiperContainer.querySelector(".swiper-wrapper").innerHTML = ""; // Vider le slider
  //si le tableau inclus ce qu'on recherche
  if (tabKeys.includes(wanted)) {
    //alors on crée un objet pour chaque donnée d'objet dans json data
    for (let dataObject of jsonDataObject) {
      if (dataObject[tabKeys[0]] === wanted) {
        //on crée une slide avec les données du vin
        const filtredSlide = creerSlide(dataObject);
        swiperContainer
          .querySelector(".swiper-wrapper")
          .appendChild(filtredSlide);
        //si ce que l'on cherche == index du tableau 0
      } else if (wanted == tabKeys[0]) {
        jsonDataObject.forEach((dataObject) => {
          const filtredSlide = creerSlide(dataObject);
          swiperContainer
            .querySelector(".swiper-wrapper")
            .appendChild(filtredSlide);
        });
        break; // arréter la boucle pour éviter de rajouter des doublons
      }
    }
  } else {
    console.log("data not in the list");
  }
}

/****************************************************************************************/
/** récupère la valeur la plus forte et la plus faible d'un tableau passé en paramètre *
 *                                                                                      *
 * @param {array[nb]} tabNb un tableau de nombres                                       *
 * @return {array[nb]} les deux valeurs                                                 *
 ****************************************************************************************/
export function getMinMax(tabNb) {
  //Définition des valeurs minimale et maximale
  //récupération des data du tableau tabNb
  const minVal = Math.min(...tabNb); // valeur la plus faible
  const maxVal = Math.max(...tabNb); // valeur la plus forte

  return [minVal, maxVal];
}

/*********************************************************/
/**                                                     *
 * @param {HTMLElement} input ce que l'on cherche        *
 * @param {Array<Objects>} dataObject Un tableau d'objet *
 *                                                       *
 *********************************************************/
export function textFilter(input, dataObject) {
  let swiperContainer = document.querySelector(".swiper"); //L'ensemble du swiper
  swiperContainer.querySelector(".swiper-wrapper").innerHTML = ""; // Vider le slider
  const dataTabFiltre = filterResults(dataObject, input.value); // Filtrer les données

  dataTabFiltre.forEach((dataObject) => {
    const filtredSlide = creerSlide(dataObject);
    swiperContainer.querySelector(".swiper-wrapper").appendChild(filtredSlide);
  });
  if (input.value.length === 0) {
    swiperContainer.querySelector(".swiper-wrapper").innerHTML = ""; // Vider le slider
    dataTabFiltre.forEach((dataObject) => {
      const filtredSlide = creerSlide(dataObject);
      swiperContainer
        .querySelector(".swiper-wrapper")
        .appendChild(filtredSlide);
    });
  }
}
