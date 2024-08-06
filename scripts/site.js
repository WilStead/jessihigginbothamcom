function closeDialog(e) {
    const dialog = e.target?.closest('dialog');
    if (dialog) {
        dialog.close();
    }
}
function closeDialog(e) {
    e.target == this && this.close();
}
document.querySelectorAll('.dialog-button').forEach(x => {
    const dialogId = x.dataset.dialogId;
    if (!dialogId) {
        return;
    }
    const dialog = document.getElementById(dialogId);
    if (!dialog) {
        return;
    }
    dialog.addEventListener('mousedown', closeDialog.bind(dialog));
    x.addEventListener('click', () => {
        dialog.showModal();
    });
    const closeButton = dialog.querySelector('.close-dialog');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            dialog.close();
        });
    }
});

function setActiveCarousel(e, value) {
    const carousel = e.target?.closest('.carousel');
    if (!carousel) {
        return;
    }
    const carouselItems = carousel.querySelectorAll('.carousel-slides li');
    const carouselMax = carouselItems.length - 1;
    const paginationItems = carousel.querySelectorAll('.pagination li');
    let carouselActive = value;
    if (carouselActive < 0) {
        carouselActive = carouselMax;
    } else if (carouselActive > carouselMax) {
        carouselActive = 0;
    }
    carousel.dataset.active = carouselActive;
    paginationItems.forEach((x, i) => {
        x.classList[i === carouselActive ? 'add' : 'remove']('active');
    });
    carouselItems.forEach((x, i) => {
        x.classList[i === carouselActive ? 'add' : 'remove']('active');
    });
}
const carouselPrev = document.querySelector('.carousel-previous');
if (carouselPrev) {
    carouselPrev.addEventListener('click', e => {
        const carousel = e.target?.closest('.carousel');
        if (!carousel) {
            return;
        }
        const carouselActive = parseInt(carousel.dataset.active) || 0;
        setActiveCarousel(e, carouselActive - 1);
    });
}
const carouselNext = document.querySelector('.carousel-next');
if (carouselNext) {
    carouselNext.addEventListener('click', e => {
        const carousel = e.target?.closest('.carousel');
        if (!carousel) {
            return;
        }
        const carouselActive = parseInt(carousel.dataset.active) || 0;
        setActiveCarousel(e, carouselActive + 1);
    });
}
document.querySelectorAll('.pagination li').forEach((x, i) => {
    x.addEventListener('click', e => {
        setActiveCarousel(e, i);
    });
});

const starWords = ["Awesome","Work","Accept","Allow","Amaze","Awe","Belong","Bloom","Bold","Breath","Calm","Cheer","Comfort","Connect","Courage","Create","Dare","Delight","Dream","Explore","Focus","Forgive","Give","Grace","Gratitude","Grow","Heal","Humble","Ignite","Imagine","Inspire","Joy","Jump","Lead","Learn","Liberate","Listen","Love","Marvel","Nurture","Observe","Peace","Persist","Plan","Play","Positive","Practice","Priority","Promise","Quiet","Receive","Reflect","Relax","Release","Respect","Rest","Revive","Save","Savor","Simplify","Space","Sparkle","Still","Teach","Thrill","Time","Transform","Trust","Unleash","Vision","Wellness","Wonder","Worship","Zeal"];
const christmasStarWords = ["Mary", "Joseph", "Augustus", "Shepherds", "Angel", "Herod", "Wisemen", "all Jerusalem", "Priests", "Scribes"];
const christmasPresentWords = ["award", "commit", "deliver", "donate", "grant", "bestow", "entrust", "present", "convey", "trust"];
function starWordHandler(e) {
    if (!e.target) {
        return;
    }
    const star = e.target.closest('button');
    if (!star) {
        return;
    }
    const starWord = star.querySelector('.star-word');
    if (!starWord) {
        return;
    }
    let list = starWords;
    if (star.classList.contains('christmas-button')) {
        list = star.classList.contains('present')
            ? christmasPresentWords
            : christmasStarWords;
    }
    starWord.textContent = list[Math.floor(Math.random() * list.length)];
    if (star.classList.contains('once')) {
        star.removeEventListener('click', starWordHandler);
        star.style.cursor = 'default';
    }
}
document.querySelectorAll('.star-button').forEach(x => {
    x.addEventListener('click', starWordHandler);
});