function scrollToSection(id){const section=document.getElementById(id);if(section){section.scrollIntoView({behavior:"smooth"});}}

const popup=document.getElementById("popup");
const popupText=document.getElementById("popupText");

function showPopup(text){popupText.textContent=text;popup.classList.add("active");}
function closePopup(){popup.classList.remove("active");}
function episodeComingSoon(number){showPopup(`A ${number}. epizód hamarosan megtekinthető lesz! 🧂`);}
function guestbook(){showPopup("A vendégkönyv hamarosan megnyílik! 💬");}

let visitors=localStorage.getItem("furcsaSoVisitors");
if(!visitors){visitors=1;}else{visitors=Number(visitors)+1;}
localStorage.setItem("furcsaSoVisitors",visitors);
document.getElementById("visitorCount").textContent=String(visitors).padStart(6,"0");

popup.addEventListener("click",function(event){if(event.target===popup){closePopup();}});
document.addEventListener("keydown",function(event){if(event.key==="Escape"){closePopup();}});
