
let content = document.getElementById("toggle");

function animation() {

    if (content.classList.contains("fadeIn"))
    {
        content.classList.remove("fadeIn");
        content.classList.add("fadeOut");
        return;
    }

    content.classList.remove("fadeOut");
    content.classList.add("fadeIn");  
}


window.onresize = function(event) {
    if (window.innerWidth < 900)
    {
        return;
    }

    content.classList.remove("fadeIn");
    content.classList.remove("fadeOut");

    content.classList.add("fadeIn");
    setTimeout(500)
};