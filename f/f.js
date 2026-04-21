const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 400;

let particles = [];
const mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
    // 푸터 내에서의 마우스 좌표 계산
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // 마우스 근처에 오면 반응하는 로직
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < 100) {
            this.x -= dx/10;
            this.y -= dy/10;
        }

        // 화면 밖으로 나가면 반대편에서 등장
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = '#00ffff'; // 입자 색상 (민트 네온)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();


// 페이지가 로드된 후 실행되도록 설정
document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const waxSeal = document.querySelector('.wax-seal');

    // 열쇠(왁스 실)를 클릭했을 때
    waxSeal.addEventListener('click', () => {
        envelope.classList.add('opened');
    });

    // (선택 사항) 편지 내용을 다시 닫고 싶다면? 
    // envelope.addEventListener('click', () => {
    //     if(envelope.classList.contains('opened')) envelope.classList.remove('opened');
    // });
});
window.addEventListener('scroll', () => {
    const keyContainer = document.querySelector('.parallax-key-container');
    const footer = document.querySelector('.vintage-footer');
    
    // 푸터가 화면에 보이는 정도 계산
    const footerRect = footer.getBoundingClientRect();
    const isVisible = footerRect.top < window.innerHeight;

    if (isVisible) {
        // 스크롤 양에 따라 열쇠가 내려오는 깊이 조절
        const moveAmount = (window.innerHeight - footerRect.top) * 0.5;
        keyContainer.style.transform = `translateY(${moveAmount}px)`;
    }
});