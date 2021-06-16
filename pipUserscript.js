// ==UserScript==
// @name         PiP Floating Button
// @namespace    https://alekeagle.com
// @version      1.0.2
// @description  A floating button over videos that will toggle PiP (This script only works for chrome, and is not needed for Firefox, as Firefox already has one).
// @author       AlekEagle
// @match        http://*/*
// @match        https://*/*
// @icon         data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzMzMzMzMzt9Cjwvc3R5bGU+CjxnIGlkPSJYTUxJRF82XyI+Cgk8cGF0aCBpZD0iWE1MSURfMTFfIiBjbGFzcz0ic3QwIiBkPSJNNDE5LjQsMjMyLjRoLTE4N3YxMzkuOGgxODYuMVYyMzIuNEg0MTkuNHogTTUxMiw0MTkuNFY5Mi42YzAtMjUuMy0yMS00Ni4zLTQ2LjMtNDYuM0g0Ni4zCgkJQzIxLDQ2LjMsMCw2Ni40LDAsOTIuNnYzMjYuOGMwLDI1LjMsMjEsNDYuMyw0Ni4zLDQ2LjNoNDE5LjRDNDkxLDQ2NS43LDUxMiw0NDQuNyw1MTIsNDE5LjR6IE00NjUuNyw0MTkuNEg0Ni4zVjkyLjZoNDE5LjRWNDE5LjR6CgkJIi8+CjwvZz4KPC9zdmc+Cg
// @grant        none
// ==/UserScript==

const PiPButtonStyle = `
div.pipcontainer {
display: flex;
width: auto;
align-items: center;
justify-content: flex-end;
}
div video {
position: unset !important;
z-index: 1;
}
div.pipbutton {
position: absolute;
margin-right: 10px;
width: 30px;
height: 30px;
padding:3px;
background-color: rgb(0 128 255 / 20%);
z-index: 2;
border-radius: 25%;
border: solid 1px rgb(0 128 255 / 80%);
box-shadow: inset 0px 0px 2px 0px rgb(0 128 255);
transition-duration: 0.25s;
display:flex;
cursor: pointer;
}
div.pipbutton:hover {
background-color: rgb(0 128 255);
width:40px;
height:40px;
}
div.pipbutton img {
z-index: 1;
}
div.pipbutton span {
position: absolute;
top: 0px;
left:0px;
width: 100%;
height: 100%;
z-index: 2;
}
`,
      PiPButtonIcon = `data:image/svg+xml;base64,${btoa('<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><style type="text/css">.st0{fill:#ffffff;}</style><g id="XMLID_6_"><path id="XMLID_11_" class="st0" d="M419.4,232.4h-187v139.8h186.1V232.4H419.4z M512,419.4V92.6c0-25.3-21-46.3-46.3-46.3H46.3 C21,46.3,0,66.4,0,92.6v326.8c0,25.3,21,46.3,46.3,46.3h419.4C491,465.7,512,444.7,512,419.4z M465.7,419.4H46.3V92.6h419.4V419.4z"/></g></svg>')}`;

(function() {
    'use strict';
    let PiPStyle = document.createElement('style');
    PiPStyle.innerHTML = PiPButtonStyle;
    document.head.appendChild(PiPStyle);
    setInterval(() => {
    for (let vEl of document.querySelectorAll("video:not([disablepictureinpicture]")) {
        if (!vEl.hasAttribute('data-haspipbutton')) {
            vEl.setAttribute('data-haspipbutton', 'yes');
            let PiPContainer = document.createElement('div');
            PiPContainer.classList.add('pipcontainer');
            vEl.parentElement.insertBefore(PiPContainer, vEl);
            let PiPButton = document.createElement('div');
            PiPButton.classList.add('pipbutton');
            let PiPIcon = document.createElement('img');
            PiPIcon.src = PiPButtonIcon;
            let PiPClickMask = document.createElement('span');
            PiPButton.appendChild(PiPIcon);
            PiPButton.appendChild(PiPClickMask);
            PiPContainer.appendChild(vEl);
            PiPContainer.appendChild(PiPButton);
            PiPClickMask.addEventListener('click', e => {
                if (document.pictureInPictureElement) {
                    document.exitPictureInPicture();
                }else {
                    if (document.pictureInPictureEnabled) {
                        e.target.parentElement.parentElement.querySelector('video').requestPictureInPicture();
                    }else {
                        alert('Picture in Picture is not enabled!');
                    }
                }
            }, false);
        }
    };
    }, 500);
})();
