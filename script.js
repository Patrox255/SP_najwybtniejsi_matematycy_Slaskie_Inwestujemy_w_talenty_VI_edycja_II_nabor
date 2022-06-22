var website = (() => {
    var id;
    var id2;
    var num;
    var links;
    function init()
    {
        document.body.style.opacity=1;
        links = document.getElementsByClassName("link");
        for (let i=0; i<links.length; i++)
        {
            links[i].addEventListener("mouseover", () => {
                displayBottomText(i);
            });
            links[i].addEventListener("mouseout", () => {
                hideBottomText(i);
            });
        }
    }
    function click() 
    {
        let href = links[num].children[0].src;
        let regex = /\/([a-z]|[-])*/ig;
        let matches = href.match(regex);
        let match = matches[matches.length-1];
        match = match.substr(1);
        document.body.style.opacity = 0.2;
        setTimeout(() => {
            window.location.href=match+".html";
        }, 500);
    }
    function displayBottomText(number)
    {
        console.log(number);
        num = number;
        clearTimeout(id);
        document.getElementById("bottom"+number).style.zIndex=100;
        id2 = setTimeout(() => {
            console.log(links[number].children);
            links[number].style.cursor = "pointer";
            links[number].addEventListener("click", click);
        }, 200);
    }
    function hideBottomText(number)
    {
        console.log("b");
        clearTimeout(id2);
        id = setTimeout(() => {
            document.getElementById("bottom"+number).style.zIndex=-1;
        }, 400);
        links[number].style.cursor = "initial";
        links[number].removeEventListener("click", click);
    }
    return{init};
})();
website.init();