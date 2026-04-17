document.addEventListener("DOMContentLoaded", () => {

    //위로가기버튼
    const btnTop = document.querySelector('.btn-top');
    if (btnTop) {
        btnTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        })
    }




// 히어로섹션 배경

            // 1. 우리가 HTML에 작성했던 동영상 태그(.bg-video-layer)를 찾아옵니다.
            const bgVideo = document.querySelector('.bg-video-layer');

            // 2. 동영상의 재생 속도를 설정합니다.
            // 1.0은 원래 속도, 0.5는 절반 속도(슬로우 모션), 2.0은 2배속입니다.
            if (bgVideo) {
                bgVideo.playbackRate = 0.4;
            } 
    





            const elements = document.querySelectorAll('.fade-in-up');

            const observer = new IntersectionObserver((entries) => {
                
                // 1. 화면에 들어온 요소들 (isIntersecting === true)
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
                visibleEntries.forEach((entry, index) => {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200); // 0.2초 간격으로 순차적 등장
                });

                // 2. 화면에서 벗어난 요소들 (isIntersecting === false)
                const hiddenEntries = entries.filter(entry => !entry.isIntersecting);
                hiddenEntries.forEach(entry => {
                    // ✨ 핵심: 화면 밖으로 나가면 'visible' 클래스를 제거하여 초기화합니다.
                    entry.target.classList.remove('visible');
                });

            }, {
                // 요소의 10%가 보일 때 감지 시작
                threshold: 0.1 
            });

            elements.forEach(element => {
                observer.observe(element);
            });
 


    // 열쇠 두둥실 애니메이션
        
    const floatingKey = document.querySelector('.key');

        // 위아래 두둥실
        if (floatingKey) {
            gsap.to(floatingKey, {
                duration: 3, 
                y: "-=20", 
                x: "-=10", 
                repeat: -1, 
                yoyo: true, 
                ease: "sine.inOut" 
                
            });
        }



// 웰컴 버튼 
        const btnConcept = document.getElementById('btnConcept');
        const btnColorsFonts = document.getElementById('btnColorsFonts');
        
        const modalConcept = document.getElementById('modalConcept');
        const modalColorsFonts = document.getElementById('modalColorsFonts');
        
        const closeConcept = document.getElementById('closeConcept');
        const closeColorsFonts = document.getElementById('closeColorsFonts');

        if (btnConcept && modalConcept && closeConcept) {
            btnConcept.addEventListener('click', () => modalConcept.classList.add('active'));
            closeConcept.addEventListener('click', () => modalConcept.classList.remove('active'));
        }
        
        if (btnColorsFonts && modalColorsFonts && closeColorsFonts) {
            btnColorsFonts.addEventListener('click', () => modalColorsFonts.classList.add('active'));
            closeColorsFonts.addEventListener('click', () => modalColorsFonts.classList.remove('active'));
        }

        window.addEventListener('click', (event) => {
            if (modalConcept && event.target === modalConcept) modalConcept.classList.remove('active');
            if (modalColorsFonts && event.target === modalColorsFonts) modalColorsFonts.classList.remove('active');
        });




        // 팝업 영역
        const posters = document.querySelectorAll('.clickable-poster');

        posters.forEach(poster => {
            poster.addEventListener('click', function() {
               
                const newTitle = this.getAttribute('data-title');
                const newDesc = this.getAttribute('data-desc');

                const parentBlock = this.closest('.portfolio-block');

                const titleText = parentBlock.querySelector('.info-title-text');
                const descText = parentBlock.querySelector('.info-desc-text');

                titleText.textContent = newTitle;
                descText.innerHTML = newDesc; 

                const siblingPosters = parentBlock.querySelectorAll('.clickable-poster');
                siblingPosters.forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
            });
        });

          





        // 탄성 선의 독립적인 동작을 관리하는 클래스
class ElasticLine {
    constructor(container) {
        this.container = container;
        // 자신의 컨테이너 안에 있는 path만 선택
        this.path = container.querySelector('.elastic-path'); 
        
        // 1. 상태 변수 독립화 (this를 통해 인스턴스별로 고유한 값을 가짐)
        this.width = this.container.clientWidth;
        this.height = 100;
        this.centerY = this.height / 2;
        
        this.cx = this.width / 2;
        this.cy = this.centerY;
        
        this.targetX = this.width / 2;
        this.targetY = this.centerY;
        
        this.vY = 0;
        this.spring = 0.05; 
        this.friction = 0.9; 

        // 2. 이벤트 등록 및 애니메이션 시작
        this.initEvents();
        this.animateLine();
    }




    initEvents() {
        // 브라우저 리사이즈 대응
        window.addEventListener('resize', () => {
            this.width = this.container.clientWidth;
        });

        // 마우스 무브 대응
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.targetX = e.clientX - rect.left;
            this.targetY = e.clientY - rect.top;
        });

        // 마우스 리브 대응
        this.container.addEventListener('mouseleave', () => {
            this.targetX = this.width / 2;
            this.targetY = this.centerY;
        });
    }





    // 화살표 함수를 사용하여 this 컨텍스트 유지
    animateLine = () => {
        this.cx += (this.targetX - this.cx) * 0.1;

        let dy = this.targetY - this.cy;
        this.vY += dy * this.spring;
        this.vY *= this.friction;
        this.cy += this.vY;

        const d = `M 0 ${this.centerY} Q ${this.cx} ${this.cy} ${this.width} ${this.centerY}`;
        this.path.setAttribute('d', d);

        // 자신만의 애니메이션 프레임 루프 지속
        requestAnimationFrame(this.animateLine);
    }
}





// 3. 실제 적용 (초기화)
// 페이지 내의 모든 .elastic-container를 찾아 각각 독립된 탄성 선 객체로 만듦
const containers = document.querySelectorAll('.elastic-container');
containers.forEach(container => new ElasticLine(container));



        // 포스터 영역
        
       // 1. Swiper 초기화 및 'Cards' 이펙트 적용
    const swiper = new Swiper(".mySwiper", {
      effect: "cards", // 카드 넘기는 효과
      grabCursor: true,
    });

    // 2. 포스터가 바뀔 때마다 텍스트 정보 업데이트
    const infoTitle = document.getElementById("infoTitle");
    const infoDesc = document.getElementById("infoDesc");

    swiper.on('slideChange', function () {
      // 현재 활성화된 슬라이드 요소를 가져옴
      const activeSlide = swiper.slides[swiper.activeIndex];
      
      // HTML에 적어둔 data-* 속성 값을 가져와서 텍스트 박스에 적용
      infoTitle.innerText = activeSlide.getAttribute('data-title');
      infoDesc.innerText = activeSlide.getAttribute('data-desc');
    });

    // 3. 드래그 앤 드롭 및 이동 제한 구역 설정 로직
    const dragBox = document.getElementById('dragBox');
    const boundary = document.getElementById('boundary');

    if (dragBox && boundary) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

    // 마우스 누를 때 (드래그 시작)
    dragBox.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX; // 마우스의 현재 X 좌표
      startY = e.clientY; // 마우스의 현재 Y 좌표
      
      // 박스의 현재 CSS left, top 값 저장
      initialLeft = dragBox.offsetLeft;
      initialTop = dragBox.offsetTop;
    });

    // 마우스 움직일 때 (드래그 중)
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      // 마우스가 이동한 거리 계산
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // 이동할 새로운 좌표 계산
      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // 제한 구역 (Bounding Box) 설정: 컨테이너(boundary) 밖으로 나가지 못하게 조건문 추가
      const maxLeft = boundary.clientWidth - dragBox.offsetWidth;
      const maxTop = boundary.clientHeight - dragBox.offsetHeight;

      // 좌우 끝값 제한
      if (newLeft < 0) newLeft = 0;
      if (newLeft > maxLeft) newLeft = maxLeft;

      // 상하 끝값 제한
      if (newTop < 0) newTop = 0;
      if (newTop > maxTop) newTop = maxTop;

      // 계산된 좌표를 실제 요소에 적용
      dragBox.style.left = `${newLeft}px`;
      dragBox.style.top = `${newTop}px`;
    });

        // 마우스를 뗄 때 (드래그 종료)
        document.addEventListener('mouseup', () => {
          isDragging = false;
        });
    }






    const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 
  };

 
  const scrollAnimOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 
  };

  // 변수명 변경: observer -> scrollAnimObserver
  const scrollAnimObserver = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 화면에 나타나면 active 클래스 추가
        entry.target.classList.add('active');
        
        // 요소가 한 번 나타난 후에는 다시 관찰하지 않도록 해제
        currentObserver.unobserve(entry.target);
      }
    });
  }, scrollAnimOptions);

  // 변수명 변경: elements -> scrollAnimTargets
  // HTML에서 .scroll-element 클래스를 가진 모든 요소를 찾아 관찰 시작
  const scrollAnimTargets = document.querySelectorAll('.scroll-element');
  scrollAnimTargets.forEach(target => scrollAnimObserver.observe(target));




// 배너
//   const bannerSlider = new Swiper(".banner-slider",{
//                     autoplay:{
//                         delay:3000
//                     },
//                     speed:1000,
//                     loop:true
//                 })


  
    

const track = document.getElementById('sliderTrack');
let isTransitioning = false; // 슬라이드가 넘어가는 도중인지 확인하는 변수

// 다음 슬라이드로 이동하는 함수
function moveToNextSlide() {
    // 이미 이동 중이라면 중복 실행 방지
    if (isTransitioning) return;
    isTransitioning = true;

    // 1. 애니메이션 설정 및 왼쪽으로 100% 이동
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(-100%)';

    // 2. 애니메이션이 끝나는 시간(0.5초)에 맞춰 뒤처리 진행
    setTimeout(() => {
        // 애니메이션(트랜지션)을 잠깐 끕니다.
        track.style.transition = 'none';
        
        // 맨 앞에 있던 첫 번째 슬라이드를 트랙의 맨 뒤로 이동시킵니다. (눈속임의 핵심)
        track.appendChild(track.firstElementChild);
        
        // 트랙의 위치를 원래 자리(0)로 되돌립니다.
        // 첫 번째 슬라이드가 뒤로 갔으므로, 자연스럽게 두 번째 슬라이드가 화면에 보이게 됩니다.
        track.style.transform = 'translateX(0)';
        
        isTransitioning = false; // 이동 상태 해제
    }, 500); // 500ms = 0.5초 (CSS transition 시간과 동일하게 맞춰야 합니다)
}

// 3초(3000ms)마다 자동으로 moveToNextSlide 함수를 실행
setInterval(moveToNextSlide, 3000);


    //  상세페이지

    const detailSwiper = new Swiper(".detail-swiper", {
                    speed: 1000,
                    slidesPerView: 1.2,
                    spaceBetween: 14,
                    // 반응형 브레이크포인트 설정
                    breakpoints: {
                        320: {
                            slidesPerView: 1.6,
                            spaceBetween: 14
                        },
                        480: {
                            slidesPerView: 2.2, // 모바일 가로 모드쯤에서 2개 정도 보이게 수정
                            spaceBetween: 14
                        },
                        1024: {
                            slidesPerView: 3,   // 태블릿이나 작은 노트북 화면에서는 3개
                            spaceBetween: 20
                        },
                        1400: {
                            slidesPerView: 4,   // 🌟 핵심 해결: 큰 PC 화면에서 4개가 보이도록 수정!
                            spaceBetween: 24    // 4개일 때 여백을 살짝 더 주면 시원해 보입니다.
                        },
                    }
                });

            const slider = document.getElementById('dragSlider');
        let isDown = false; // 마우스 클릭 상태 확인
        let startX; // 드래그 시작 X 좌표
        let scrollLeft; // 드래그 시작 시점의 스크롤 위치
        let isDragging = false; // 단순 클릭과 드래그를 구분하기 위한 변수

        // 1. 마우스를 눌렀을 때 (드래그 시작)
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false; // 누를 때는 아직 드래그 상태 아님
            slider.classList.add('active'); // 마우스 커서 변경을 위한 클래스 추가
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        // 2. 마우스가 슬라이더 영역을 벗어났을 때 (드래그 취소)
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        // 3. 마우스 버튼을 뗐을 때 (드래그 끝)
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        // 4. 마우스를 움직일 때 (실제 스크롤 발생)
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return; // 누르지 않은 상태면 함수 종료
            
            e.preventDefault(); // 기본 텍스트 선택 등 방지
            isDragging = true; // 움직임이 발생했으므로 드래그 상태로 변경
            
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5; // * 1.5를 해서 실제 마우스 이동보다 조금 더 많이 스크롤되게 (감도 조절)
            slider.scrollLeft = scrollLeft - walk;
        });

        // 5. 카드 클릭 시 (드래그와 클릭 구분)
        // a 태그 내부의 모든 클릭 이벤트를 감지합니다.
        const cards = document.querySelectorAll('.slide-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // 만약 마우스를 떼는 순간 '드래그 중'이었다면, 링크 이동을 막습니다.
                if (isDragging) {
                    e.preventDefault();
                }
                // 드래그가 아니었다면 정상적으로 설정된 href 링크로 이동합니다.
            });
        });            

});














































































