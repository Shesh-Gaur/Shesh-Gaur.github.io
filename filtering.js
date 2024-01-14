
var filterTags = new Array();
let posts = document.getElementsByName("taggableitem");

window.onbeforeunload = function leavePage()
{
    localStorage.setItem("savedTags", filterTags); 
}
 
window.onload = function displayUniqueTags()
{ 

    setTimeout(500);
    

    if (!posts)
    {
        return;
    }

    uniqueTags = new Array(); 
    posts.forEach(p => { 
        var containsTag = false;
        postTags = [...p.getElementsByClassName("pill")];

        postTags.forEach(t => {
            if (!uniqueTags.includes(t.id))
            {
                uniqueTags.push(t.id);
            } 
        });
    });

    uniqueTags.forEach(element => {
    
        const tag = document.createElement("button");
        tag.classList.add("pill");
        tag.type = "button";
        tag.id = element;
        tag.setAttribute("onclick", "tagClick(this)")
        const text = document.createTextNode(element);
        tag.appendChild(text);

        //Checking local storage for saved tags
        const placeholder= document.getElementById("taglist");
        placeholder.appendChild(tag);
        if (localStorage.getItem("savedTags").includes(element))
        {
            tagClick(tag);
        }
    
    });
}

function tagClick(element){ 

    var index = filterTags.indexOf(element.id);
    element.classList.toggle("pill--selected");

    if (index != -1)
    {        
        filterTags.splice(filterTags.indexOf(element.id), 1);
    }
    else
    {
        filterTags.push(element.id);
    }


    if (filterTags.length <= 0)
    {
        posts.forEach(p => { 
            p.style.display = "block";
        });
        return;
    }
        
    posts.forEach(p => { 
        var containsTag = false;
        postTags = [...p.getElementsByClassName("pill")];

        postTags.forEach(t => {
            if (filterTags.includes(t.id))
            {
                containsTag = true; 
            }
        });
 
        if (!containsTag)
        {
            p.style.display = "none";
        }
        else
        {
            p.style.display = "block";
        }

    });

}

$("#link").click(function(ev) {
    ev.preventDefault();
});