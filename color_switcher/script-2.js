function changeColor(color){
    document.body.style.backgroundColor= color;
}

document.getElementById("a").addEventListener("click", function() {
    changeColor('red');
})
document.getElementById("b").addEventListener("click", function() {
    changeColor('yellow');
})
document.getElementById("c").addEventListener("click", function() {
    changeColor('green');
})
document.getElementById("d").addEventListener("click", function() {
    changeColor('violet');
})
document.getElementById("e").addEventListener("click", function() {
    changeColor('Blue');
})