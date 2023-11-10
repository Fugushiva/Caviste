import Cookies from "../../node_modules/js-cookie/dist/js.cookie.mjs";
import FetchApi from "../modules/fetchApi.js";
import setAttributes from "../modules/function.js";

const userName = Cookies.get("login");
const btAddPics = document.getElementById("btAddPic");
const buttonContainerDiv = document.getElementById("buttonContainer");
let newWindowDiv, btCloseDiv, crossLine1, crossLine2;
//gesion APi
const winesApi = new FetchApi(
  "https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines"
);
const winesResponse = await winesApi.get();
const dataWines = await winesResponse;

if (userName) {
  btAddPics.addEventListener("click", () => {
    //création d'une fenêtre si pas de fenêtre active
    if (!newWindowDiv) {
      newWindowDiv = document.createElement("div");
      btCloseDiv = document.createElement("div"); //div croix de fermeture
      crossLine1 = document.createElement("div"); //ligne 1
      crossLine2 = document.createElement("div"); //ligne 2
      //définition des attributs
      setAttributes(newWindowDiv, { id: "addPictureWindow" });
      setAttributes(btCloseDiv, { id: "btClose" });
      setAttributes(crossLine1, { id: "crossLine1" });
      setAttributes(crossLine2, { id: "crossLine2" });

      buttonContainerDiv.appendChild(newWindowDiv);
      newWindowDiv.appendChild(btCloseDiv);
      btCloseDiv.appendChild(crossLine1);
      btCloseDiv.appendChild(crossLine2);
      console.log(buttonContainerDiv);
      btCloseDiv.addEventListener("click", () => {
        buttonContainerDiv.removeChild(newWindowDiv);
        newWindowDiv = false;
      });
    }
  });
}
