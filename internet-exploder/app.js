document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.ie-exploder__img');
    const contentWrapper = document.querySelector('.ie-exploder');
    const ieWrapper = document.querySelector('.ie-exploder__content');
    const finalBox = document.querySelector('.ie-exploder__final');
    const booms = document.querySelectorAll('.ie-exploder__boom');
    const finalBoom = document.querySelector('.ie-exploder__big-boom');
    const finalImage = document.querySelector('.ie-exploder__final-image');
    let imageIdx = 0;
    let explodeCounter = 0;
    
    
    document.addEventListener('mousedown', (e) => {
        const target = e.target;
        target.classList.contains('ie-exploder__img') ? makeHarm() : null;
    
        if (imageIdx === images.length - 1) {
            activateFinal();
    
        } else if (imageIdx > images.length - 1) {
            explodePreviewShow();
        }
    });
    document.addEventListener('mouseup', () => {
        explodePreviewHide();
    
    });
    
    function activateFinal() {
        finalBox.classList.add('active');
        imageIdx++
    }
    function initFirstImage() {
        finalBox.classList.remove('active');
        images[imageIdx].classList.add('active');
    }
    
    function makeHarm() {
        if (imageIdx === images.length - 1) {
            images.forEach(item => item.classList.remove('active'));
            return;
        }
        imageIdx++
        images.forEach((image, idx) => {
            idx === imageIdx ? image.classList.add('active') : image.classList.remove('active');
        })
    }
    
    function explodePreviewShow() {
    
       
        if (explodeCounter === booms.length - 1) {
    
            finalBox.classList.add('ie-exploder__final--explode');
            setTimeout(() => {
                finalBoom.classList.add('GOOD-BUY-IE-BOOM-BOOM');

                setTimeout(()=>{
                    ieWrapper.style.display = 'none';
                    finalImage.classList.add('show')
                }, 2000);
            }, 1500);
            return false;
        }
    
        images.forEach(item => item.classList.remove('active'));
        explodeCounter++
        booms[explodeCounter].classList.add('active');
        finalBox.classList.add('ie-exploder__final--explode-preview');
        contentWrapper.classList.add('explode');
    
    
    
    }
    function explodePreviewHide() {
        finalBox.classList.remove('ie-exploder__final--explode-preview');
        contentWrapper.classList.remove('explode');
    }
    initFirstImage();
    
    
});