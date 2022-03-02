/******************************************************** SHOW SCROLL UP start **************************************************/
function scrollUp() {
    const scrollUp = document.getElementById("scrollUp");
    if (this.scrollY >= 400) scrollUp.classList.add("show-scrollUp");
    else scrollUp.classList.remove("show-scrollUp");
}

window.addEventListener("scroll", scrollUp);
/******************************************************** CHANGE BACKGROUND HEADER **************************************************/
function scrollHeader() {
    const nav = document.getElementById("header");
    if (this.scrollY >= 15) nav.classList.add("scroll-header");
    else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);
/******************************************Settings Show Hide and spin font*****************************************************/
// Select class using querySelector
let settings = document.querySelector(".toggle-settings .fa-cog");
// event click to add toggele
settings.onclick = function() {
    // Toggle class for f-spin for rotation on self
    this.classList.toggle("fa-spin");
    // Toggle class on main settings box
    document.querySelector(".settings-box").classList.toggle("open");
};


/******************************************************Settings Switch Colors****************************************************/
// Check if there is local storage color option
let mainColors = localStorage.getItem("color_option");
if(mainColors !== null) {
    // set color in rot you called him local stotage
    document.documentElement.style.setProperty('--main--color',mainColors);
    // remove active class from all colors list item
    let activeClass = document.querySelectorAll(".colors-list li");
    activeClass.forEach(element => {
        element.classList.remove("active");
        // add active class to element with data color === local storage item
        if(element.dataset.color === mainColors){
            // add active class
            element.classList.add("active");
        };
    });   
};

// select all colors using querySelectorAll 
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop in Li (kadoz 3la ga3 li b foreach)
colorsLi.forEach(li => {
    // Click on Evry List Items
    li.addEventListener("click", (e) => {
        // Set color in root
        document.documentElement.style.setProperty('--main--color',e.target.dataset.color);
        // set color in local stotage
        localStorage.setItem('color_option',e.target.dataset.color);
        // remove active class from all childrens
        let activeClass =e.target.parentElement.querySelectorAll(".active");
        activeClass.forEach(element => {
            element.classList.remove("active");
        });
        // add class active to li click
        e.target.classList.add("active");
    });
});
/*********************************************Settings Switch Colors backGround Image**********************************************/
// Random Back Ground Option:
let backgroundOption = true;
// Varible To Controle Interval
let backgroundIntervale;
// Check If There's A Local Storage Interval
let BackgroundLocalItem = localStorage.getItem("background-option");
// Check If Random Back Ground Local Storage Item
if(BackgroundLocalItem !== null){
    //Change string To Boolean
    if(BackgroundLocalItem === 'true'){
        backgroundOption= true;
    }
    else{
        backgroundOption= false;
    }
    // lop all spans:      
    document.querySelectorAll(".random-backgrouns span").forEach(element => {
        // Remove Active Class From All Children
        element.classList.remove("active");
    });
    //If condition
    if(BackgroundLocalItem === 'true'){
        document.querySelector(".random-backgrouns .yes").classList.add("active");
    }
    else{
        document.querySelector(".random-backgrouns .no").classList.add("active");
    }
    // Add Active class On Self

};

// select all element:
const randomBackEl = document.querySelectorAll(".random-backgrouns span");
// lop all spans:
randomBackEl.forEach(span => {
    // click on every span 
    span.addEventListener("click",(e) => {
        // Remove Active Class From All Children
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        // Add Active class On Self
        e.target.classList.add("active");
        // Check if yes or no
        if(e.target.dataset.back === 'yes'){
            backgroundOption = true;
            randmizeImgs();
            localStorage.setItem("background-option",true);
        }
        else{
            backgroundOption = false;
            clearInterval(backgroundIntervale);
            localStorage.setItem("background-option",false);
        }
    });
})
/****************************************************Random backGround Image*****************************************************/
// Select landing page element :
let landingPage = document.querySelector(".landing-page");
// Get array of images
let imagesArray =["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg"];
// Function To Randmize Imgs
function randmizeImgs(){
    if(backgroundOption === true){
        // Using Math.random to change Url of images and setintervel
        backgroundIntervale = setInterval(() => {
            // Get random namber
            let randomNumber = Math.floor(Math.random() * imagesArray.length)
            // Change backGround Image Url
            landingPage.style.backgroundImage = 'url("../imgs/'+imagesArray[randomNumber]+'")';
        },10000);
    };
};
// Call Function
randmizeImgs()
/****************************************************Skills Progress*****************************************************/
// Select Skills Selector
let ourSkills = document.querySelector(".skills");
// skills on scroll
window.onscroll = function () {
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    // Window Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Window Height
    let windowHeight = this.innerHeight;
    // Window Scroll Top
    let windowScrollTop = this.pageYOffset;
    // Function To find section skills
    if( windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll(".skill-box .Skills-prograss span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
            skill.style.color = "snow";
            skill.style.textAlign =  "center";
            skill.style.lineHeight = "25px";
            skill.innerHTML = skill.dataset.progress;
        });
    };
};
/**********************************************Klick Photo To show PopUp Photo*************************************************/
let ourGallery = document.querySelectorAll(".gallery .images-box img");
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // Create Overlay Element 
        let Overlay = document.createElement("div");
        // Add Class To Overlay
        Overlay.className = "popup-overlay";
        // Append overLay to the body
        document.body.appendChild(Overlay);

        // create the popup box
        let popupBox = document.createElement("div");
        // Add Class To popup box
        popupBox.className = "popup-box";
        //add title
        if(img.alt !== null){
            //create heading
            let imageHeading = document.createElement("h3");
            //create text for heading
            let imageText = document.createTextNode(img.alt);
            //append the text to the heading
            imageHeading.appendChild(imageText);
            //appwnd the heading to the popup  box
            popupBox.appendChild(imageHeading);
        }
        //create the image
        let popupImage = document.createElement("img");
        //Set image source
        popupImage.src = img.src

        //add Image To Popup Box
        popupBox.appendChild(popupImage);

        //Append the popup box to body
        document.body.appendChild(popupBox);

        //create close span
        let closeButton = document.createElement("span");

        //creta the close button x
        let closeButtonText = document.createTextNode("X");

        //append text the close button
        closeButton.appendChild(closeButtonText);

        //add class to close button
        closeButton.className  = "close-button";

        //add close to popup box
        popupBox.appendChild(closeButton);
    });
});

//close popup
document.addEventListener("click", function (e) {
    if(e.target.className === 'close-button' ){
        // Remove the current popup
        e.target.parentNode.remove();
        //remove overly
        document.querySelector(".popup-overlay").remove();
    };
});
/**********************************************Select All Bullets*************************************************/
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach(Bullet => {
    Bullet.addEventListener("click",(e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        })
    })
})
/**********************************************Function Handele Active Class***********************************************/
function handleActive(ev) {
    //Remove Active class from All cheldren
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add Active class On Self
    ev.target.classList.add("active");
}
/**********************************************Show Hide Buulets***********************************************/
let bulletsSpan = document.querySelectorAll(".bullets-options span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalItem = localStorage.getItem("bullets_option")

if(bulletsLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    })
    if(bulletsLocalItem === "block"){
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-options .yes").classList.add("active");
    }
    else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-options .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display === "show"){
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option","block")
        }else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option","none")
        }
        handleActive(e);
    });
});
/*******************************************************Reset Button********************************************************/
document.querySelector(".reset-option").onclick = function() {
    
    //Clear Item
    localStorage.removeItem("color_option")
    localStorage.removeItem("background-option")
    localStorage.removeItem("bullets_option")
    //Clear All Items
    // localStorage.clear();
    // Relaod Page
    window.location.reload();
}

/*******************************************************Active Link********************************************************/
let activeLink = document.querySelectorAll(".links li a")
activeLink.forEach(link => {
    link.addEventListener("click",(e) => {
        activeLink.forEach(link => {
            link.classList.remove("link-active");
        })
        e.target.classList.add("link-active");
    })
})

/******************************************************* Toggle Menu********************************************************/
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    //stop propagation
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
}

tLinks.onclick = (e) => {
    //stop propagation
    e.stopPropagation();
}

/***********************************************Click Outside Menu Toggle Button*********************************************/
document.addEventListener("click",(e) => {
    if(e.target !== toggleBtn  && e.target !== tLinks){
        // Check if Menu Is Open
        if(tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
})
