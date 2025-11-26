function setDarkMode(){
    document.body.style.backgroundColor= '#181818';
    document.body.style.color= '#ffffff';
    document.querySelector('.nav_up').style.backgroundColor= '#222222';
    document.querySelector('.nav_down').style.backgroundColor= '#333333';
    document.querySelector('.footer').style.backgroundColor= '#2a2a2a';
    document.querySelector('.d').style.backgroundColor= '#555555';
    document.querySelector('.e').style.backgroundColor= '#777777';
    document.querySelector('.f').style.backgroundColor= '#999999';
    document.querySelector('.a').style.backgroundColor= '#333333';
    document.querySelector('.b').style.backgroundColor= '#333333';
    document.querySelector('.c').style.backgroundColor= '#333333';
    
};

function setTropicalMode(){
    document.body.style.backgroundColor= '#fff4e0';
    document.body.style.color= '#b35400';
    document.querySelector('.nav_up').style.backgroundColor= '#ffd8a8';
    document.querySelector('.nav_down').style.backgroundColor= '#ffe5c2';
    document.querySelector('.footer').style.backgroundColor= '#fff0db';
    document.querySelector('.d').style.backgroundColor= '#ff8c42';
    document.querySelector('.e').style.backgroundColor= '#ffa75e';
    document.querySelector('.f').style.backgroundColor= '#ffc799';
    document.querySelector('.a').style.backgroundColor= '#ffe5c2';
    document.querySelector('.b').style.backgroundColor= '#ffe5c2';
    document.querySelector('.c').style.backgroundColor= '#ffe5c2';
    
    
};

function setLightMode() {
    document.body.style.backgroundColor= '#f0f2f5';
    document.body.style.color= '#333333';
    document.querySelector('.nav_up').style.backgroundColor= '#ffffff';
    document.querySelector('.nav_down').style.backgroundColor= '#e4e6eb';
    document.querySelector('.footer').style.backgroundColor= '#e4e6eb';
    document.querySelector('.d').style.backgroundColor= '#007bff';
    document.querySelector('.e').style.backgroundColor= '#6c757d';
    document.querySelector('.f').style.backgroundColor= '#28a745';
    document.querySelector('.a').style.backgroundColor= '#ffffffff';
    document.querySelector('.b').style.backgroundColor= '#ffffffff';
    document.querySelector('.c').style.backgroundColor= '#ffffffff';
};





document.querySelector('.btn1').addEventListener('click', setDarkMode);
document.querySelector('.btn2').addEventListener('click', setTropicalMode);
document.querySelector('.btn').addEventListener('click', setLightMode);

setLightMode();