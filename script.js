const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function circleMouseFollower(){
    window.addEventListener('mousemove',(event)=>{
        document.querySelector("#minicircle").style.transform=`translate(${event.clientX}px, ${event.clientY}px )`;
    })
}
circleMouseFollower();
const bounding= document.querySelector(".bounding .boundingelem");
let percentage =100;
const timer = setInterval(()=>{
    percentage=percentage-10;
    bounding.style.transform=`translateY(${percentage}%)`
},100)
setInterval(()=>{
    clearInterval(timer);
},900)