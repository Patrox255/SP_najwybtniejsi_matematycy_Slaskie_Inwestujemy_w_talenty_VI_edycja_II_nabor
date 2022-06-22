var website = (() => {
    let navManager = document.getElementById("nav-manager");
    let navY = $("#sticky-nav").offset().top;
    let footerY = $("#footer").offset().top;
    let navActive=false;
    let navTop=false;
    let navTopHeight=0;
    function makeSticky()
    {
        if (window.innerWidth<912 || window.innerHeight<778)
        {
            navTop=true;
            if (window.innerHeight<675)
            {
                navTopHeight=1;
            }
            else if (window.innerHeight<441)
            {
                navTopHeight=2;
            }
            else
            {
                navTopHeight=0;
            }
        }
        else
        {
            navTop=false;
        }
        console.log(navTop);
        console.log(window.innerWidth);
        let scroll = $(window).scrollTop();
        let scrollFooter = $(window).scrollTop() + $(window).height();
        console.log(scroll);
        console.log(footerY);
        console.log(navY);
        if (scrollFooter<=footerY)
        {
            document.getElementById("sticky-nav").style.bottom="auto";
            if (scroll>navY)
            {
                if (navTop)
                {
                    if (navTopHeight==0)
                    {
                        document.getElementById("sticky-nav").className="sticky10-top";
                    }
                    else if (navTopHeight==1)
                    {
                        document.getElementById("sticky-nav").className="sticky15-top";
                    }
                    else
                    {
                        document.getElementById("sticky-nav").className="sticky20-top";
                    }
                    document.getElementById("nav-manager").style.height = "auto";
                    document.getElementById("sticky-nav").style.borderBottom = "0.4em solid #005E99";
                    document.getElementById("sticky-nav").style.borderTop = "0.4em solid #005E99";
                    document.getElementById("right").style.borderBottom=0;
                }
                else
                {
                    if (!navActive)
                    {
                        document.getElementById("sticky-nav").className="sticky5";
                        console.log(document.getElementById("sticky-nav").className);
                    }
                    else
                    {
                        document.getElementById("sticky-nav").className="sticky20";
                        console.log($("#sticky-nav").className);
                    }
                } 
            }
            else
            {
                document.getElementById("sticky-nav").className="";
                document.getElementById("sticky-nav").style.borderBottom = 0;
                document.getElementById("sticky-nav").style.borderTop = 0;
                if (navTop)
                {
                    document.getElementById("right").style.borderBottom="0.4em solid #005E99";
                }
            }
        }  
        if (navTop)
        {
            let clone = document.getElementById("right")
            document.getElementById("right").remove();
            console.log(clone);
            document.getElementById("container").prepend(clone);
        }
    }
    function init()
    {
        document.body.style.opacity = 1;
        makeSticky();
        document.getElementById("nav-manager").addEventListener("click", displayNav);
        if (navTop)
        {
            document.getElementById("nav-manager").className="nav-hover-top";
        }
        else
        {
            document.getElementById("nav-manager").className="nav-hover";
        }
        $(window).scroll(function() {
            makeSticky();
        });
    }
    function displayNav()
    {
        if (!navTop)
        {
            document.getElementById("links").style.width = "80%";
            document.getElementById("right").style.width = "20%";
        }
        navActive=true;
        setTimeout(() => {
            navManager.removeEventListener("click", displayNav);
            if (navTop)
            {
                navManager.className = "nav-back-top";
            }
            else
            {
                navManager.className = "nav-back";
            }
        }, 100);
        setTimeout(() => {
            document.getElementById("nav").style.opacity=1;
        }, 700);
        setTimeout(() => {
            navManager.addEventListener("click", hideNav);
            if (navTop)
            {
                navManager.className = "nav-back-top nav-hover-back-top";
            }
            else
            {
                navManager.className = "nav-back nav-hover-back";
            }
            let links = document.getElementById("nav").children;
            for (let i=0; i<links.length; i++)
            {
                links[i].addEventListener("click", redirect);
                links[i].style.cursor="pointer";
            }
        }, 2000);
    }
    function hideNav()
    {
        if (!navTop)
        {
            document.getElementById("links").style.width = "95%";
            document.getElementById("right").style.width = "5%";
        }
        document.getElementById("nav").style.opacity=0;
        setTimeout(() => {
            navManager.removeEventListener("click", hideNav);
            navManager.className = "";
            let links = document.getElementById("nav").children;
            for (let i=0; i<links.length; i++)
            {
                links[i].removeEventListener("click", redirect);
                links[i].style.cursor="default";
            }
        }, 100);
        setTimeout(() => {
            navManager.addEventListener("click", displayNav);
            if (navTop)
            {
                navManager.className = "nav-hover-top";
            }
            else
            {
                navManager.className = "nav-hover";
            }
        }, 2000);
        console.log("b");
    }
    function redirect()
    {
        let href = this.id;
        document.body.style.opacity=0.2;
        setTimeout(() =>
        {
            window.location.href=href+".html";
        }, 500);
    }
    return {init};
})();
website.init();