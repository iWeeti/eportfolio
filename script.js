var buttons = [];
var largeWindowSize = 992;

document.getElementById("navbar-button").addEventListener("click", (e) => {
    if (document.getElementById("navbar-button").getAttribute("aria-expanded") == "true") {
        var element     = document.getElementById("side-nav"),
            elemRect    = element.getBoundingClientRect();
        window.scrollTo(0, (window.scrollY + elemRect.top) - 80);
    }
})

for (child of document.getElementById("side-nav").children) {
    var btn = child.children[0];
    buttons.push(btn);
}

function removeActive() {
    for (button of buttons){
        button.classList.remove("active");
    }
}

function fixActive() {
    removeActive();
    var id = window.location.href.split("#")[1];
    if (id == undefined) return;
    id = id.substr(2, id.length);
    for (button of buttons) {
        if (button.dataset.scroll == id) {
            sScrollTo(button);
        }
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 60 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) +60 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

var collapse = null;

window.onload = () => {
    collapse = new bootstrap.Collapse(document.getElementById("externalCollapse"), { toggle: false });

    if (window.innerWidth <= largeWindowSize) {
        collapse.hide();
    } else {
        collapse.show();
    }

    fixActive();
    setTimeout(() => {

    });
    setInterval(() => {

    });

    const hobbies = [ "Music", "Swimming", "Judo", "Video Games" ];
    
    // text animation
    let text = `me.name = \"Veeti\";\nme.age = ${new Date().getFullYear() - 2004}; \n\nme.hobbies = [ \"Music\", \"Swimming\", \"Judo\", \"Video Games\" ]; \nme.say(\`> I like \${me.hobbies[Math.floor(Math.random() * me.hobbies.length)]}!\`);\n`;
    let interval = setInterval(() => {
        if (text.length == 0) {
            clearInterval(interval)
            document.querySelector("p#random-text").innerHTML = `> I like ${hobbies[Math.floor(Math.random() * hobbies.length)]}!`;
        }
        document.querySelector("p#insert-code").innerHTML += text.slice(0, 1);
        text = text.slice(1, text.length);
    }, 50)
}

window.onresize = () => {
    if (window.innerWidth <= largeWindowSize) {
        collapse.hide();
    } else {
        collapse.show();
    }
}

window.addEventListener("popstate", () => fixActive());

const cap = (min, max, value)  => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

const sScrollTo = (el, setLink = false) => {
    var id = el.dataset.scroll,
        element = document.getElementById(id);
    
    if (setLink) {
        window.location.href = window.location.href.split("#")[0] + "#l-" + id;
        if (window.innerWidth <= largeWindowSize) {
            collapse.hide();
        } else {
            collapse.show();
        }
    }
    
    setTimeout(() => {
        var elemRect = element.getBoundingClientRect();
        window.scrollTo(0, (window.scrollY + elemRect.top) - 80);
    }, window.innerWidth <= largeWindowSize ? 300 : 0);

};

const blocks = document.querySelectorAll(".content-block");

document.onscroll = () => {
    document.getElementById("side-nav").style.paddingTop = cap(0, 80, document.documentElement.scrollTop) + "px";

    for (let block of blocks) {
        if (isInViewport(block)) {
            removeActive();
            for (let el of document.querySelector("#side-nav").children) {
                if (block.id.includes(el.children[0].dataset.scroll)) {
                    el.children[0].classList.add("active");
                }
            }
        }
    }
}
