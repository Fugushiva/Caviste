import FetchApi from "../modules/fetchApi.js";
import setAttributes from "../modules/function.js";
import { getData } from "../modules/function.js";
import Cookies from "../../node_modules/js-cookie/dist/js.cookie.mjs";

//fonction asynchrone afin de récupérer API fetch
document.addEventListener("DOMContentLoaded", async (e) => {
  //Déclaration des variables
  let burgerMenu = document.getElementById("burgerMenu");
  let divContentConnect = "";
  const usernameInput = document.createElement("input"); //champ login
  let passwordInput = document.createElement("input"); //champ password
  const btSend = document.createElement("button"); //bouton de connexion
  const formLogin = document.createElement("form"); //l'entièreté du formulaire
  const headerElem = document.getElementsByTagName("header")[0]; // élément header

  //gestion de click menu burger
  burgerMenu.addEventListener("click", (e) => {
    //si la div qui qui contient les input n'est pas affichée
    if (!divContentConnect) {
      divContentConnect = document.createElement("div");
      //attribut it à div
      divContentConnect.setAttribute("id", "contentConnect");
      divContentConnect.setAttribute("class", "contentConnect");
      //ajout des attributs
      //username
      setAttributes(usernameInput, {
        id: "userName",
        class: "inputFormConnect",
        type: "text",
        placeholder: "login",
        name: "username",
      });
      //password
      setAttributes(passwordInput, {
        id: "password",
        class: "inputFormConnect",
        type: "password",
        placeholder: "Mot de passe",
        name: "password",
      });

      //bouton
      setAttributes(btSend, { id: "btSend", type: "submit" });
      btSend.innerHTML = "envoyer";
      setAttributes(formLogin, { id: "formConnect" });

      //Ajout des enfant à form
      formLogin.appendChild(usernameInput);
      formLogin.appendChild(passwordInput);
      formLogin.appendChild(btSend);

      //ajour des enfant à div
      divContentConnect.appendChild(formLogin);

      headerElem.appendChild(divContentConnect);
      //si deja existant, on le retire
    } else {
      divContentConnect.remove();
      divContentConnect = "";
    }
  });

  /**************************** */
  /*CONNEXION*/
  /**************************** */
  //API des utilisateurs
  const api = new FetchApi(
    "https://cruth.phpnet.org/epfc/caviste/public/index.php/api/users"
  );
  const response = await api.get(); //response
  const data = await response; //console.log(data)
  const tabLogins = getData(data, "login"); //console.log(tabLogin)
  //console.log(data);

  const password = btoa(passwordInput.value);
  tabLogins.shift(); // retirer le premier élément du tableau (tabLogin[0] = 'login')

  let tabData = [];
  data.forEach((element) => {
    tabData.push(`${element.login} => ${element.id}`);
  });
  //console.log(tabData);

  btSend.addEventListener("click", async (e) => {
    e.preventDefault();
    let password = btoa(passwordInput.value);
    let likesUrl = "";
    //console.log(password);
    const loginUser = usernameInput.value; // le nom de l'username afin de controler
    let userId = ""; // stocke l'id de l'user
    data.forEach((user) => {
      if (user.login == loginUser) {
        //défini un cookie avec l'id de l'user
        Cookies.set("id", userId);
        userId = user.id;
        likesUrl = `/${userId}/likes/wines`;
      }
    });
    //hashage du mdp
    //si username est dans le tableau
    if (tabLogins.includes(loginUser)) {
      //si mdp == déhashage du mdp
      if (password === btoa(123)) {
        //crée un cookie "login" afin de l'utiliser pour la connexion
        Cookies.set("login", loginUser);
        //Récupère ses vins likés afin de les stocker dans un cookie
        const getLikeApi = new FetchApi(api.url + likesUrl);
        const likeResponse = await getLikeApi.get();
        const userLikes = await likeResponse;

        Cookies.set("likes", JSON.stringify(userLikes));

        location.reload();
      } else {
        console.log("mauvais MDP");
      }
    } else {
      console.log("Ce login n'existe pas");
    }
  });

  if (Cookies.get("login")) {
    //crée un bouton se déconnecter
    let btDisconnect = document.createElement("button");
    btDisconnect.innerHTML = "Se déconnecter";
    setAttributes(btDisconnect, { type: "submit", id: "btSend" });
    //remplace le menu burger par bouton de déconnexion
    burgerMenu.replaceWith(btDisconnect);
    btDisconnect.addEventListener("click", (e) => {
      e.preventDefault();
      Cookies.remove("login"); //retirer le cookie "login"
      location.reload(); //refresh la page
    });
  }
});
