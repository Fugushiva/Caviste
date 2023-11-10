import FetchApi from "../modules/fetchApi.js";
import Cookies from "../../node_modules/js-cookie/dist/js.cookie.mjs";
import { getData } from "../modules/function.js";
import { swiper, swiperContainer } from "../modules/const.js";

document.addEventListener("DOMContentLoaded", async (e) => {
  const userName = Cookies.get("login");
  const userId = Cookies.get("id");
  const btLike = document.getElementById("like");
  const apiUrl = "http://cruth.phpnet.org/epfc/caviste/public/index.php/api";
  // Initialisation de l'API
  const apiWines = new FetchApi(
    "http://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines"
  );
  const response = await apiWines.get(); //response
  const dataWines = await response; //console.log(data)
  let activeSlide = swiper.slides[swiper.activeIndex]; //la slide actuelle
  let wineId = activeSlide.querySelector("#identification").innerHTML; //l'id du vin de la slide actuelle
  wineId = wineId.trim(); // ne pas avoir de problème d'espace dans le lien
  let fetchUrl = `${wineId}/like`; // URL vers lequel on fait la modif
  wineId = swiper.on("slideChange", (e) => {
    //on récupère le nouvel id de la slide
    activeSlide = swiper.slides[swiper.activeIndex];
    wineId = activeSlide.querySelector("#identification").innerHTML;
    wineId = wineId.trim(); // ne pas avoir de problème d'espace dans le lien
    fetchUrl = `${wineId}/like`; // URL vers lequel on fait la modif
  });
  //si un utilisateur est connecté
  /**
   * TODO ajouter une manière d'intégrer le dislike si le vin est déjà liké, appel API des users ici
   */
  if (userName) {
    //récupère les vins likés de l'user
    const favoriteWines = JSON.parse(Cookies.get("likes"));
    //console.log(favoriteWines)
    //par défaut on like le vin
    let putContent = { like: true };

    btLike.addEventListener("click", (e) => {
      wineId = activeSlide.querySelector("#identification").innerHTML;
      //si le vin est liké
      favoriteWines.forEach((wineObject) => {
        if (wineObject.id.trim() == wineId.trim()) {
          //on dislike le vin
          putContent = { like: false };
        }
      });
      // liker le vin
      const updateWine = apiWines.put(userName, fetchUrl, putContent);
      console.log(favoriteWines);
      console.log(updateWine);
      console.log(userName);
      console.log(userId);
      //location.reload()
    });
  } else {
    console.log("aucun utilisateur");
  }
});
