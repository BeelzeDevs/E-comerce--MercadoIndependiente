export const MainOffersButtons = () => {
    const mainOffers = document.querySelector('#mainOffersSlider');
    const prev = document.querySelector('#mainOffers-Prev');
    const next = document.querySelector('#mainOffers-Next');
    prev.addEventListener('click', ()=>{
        mainOffers.scrollLeft -= 200;
    });
    next.addEventListener('click', ()=>{
        mainOffers.scrollLeft += 200;
    });

}