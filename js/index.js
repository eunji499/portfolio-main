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

//헤더
 //헤더 스크롤시 사라졌다가 나타나기
    const header = document.querySelector("header")
    const smart = document.querySelector("#main-header")

    let lastScrollTop = 0;
    window.addEventListener('scroll',()=>{
        //스크롤 바가 움직일 떄 실행될 소스코드
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop; //호환성을 위해서 만들어 놓은 소스코드
        
        if(scrollTop < lastScrollTop){
             header.classList.add("on")
             smart.classList.add("on")
            
        }
        else{
            header.classList.remove("on")
            smart.classList.remove("on")
            
        }
        lastScrollTop = scrollTop 
    })
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileClose = document.getElementById('mobileClose');

    const closeMobileMenu = () => {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('open');
    };

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });

    if (mobileClose) {
        mobileClose.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

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





// --- [기존 코드 유지] ---
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

// 기존 모달 배경 클릭 닫기
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
    const swiper = new Swiper(".poster-mySwiper", {
      effect: "cards", // 카드 넘기는 효과
      grabCursor: true,
    });

    // 2. 포스터가 바뀔 때마다 텍스트 정보 업데이트
    const infoTitle = document.getElementById("infoTitle");
    const infoDesc1 = document.getElementById("infoDesc1");
    const infoDesc2 = document.getElementById("infoDesc2");
    const moodTitle = document.getElementById("moodTitle");

    swiper.on('slideChange', function () {
      // 현재 활성화된 슬라이드 요소를 가져옴
      const activeSlide = swiper.slides[swiper.activeIndex];
      
      // HTML에 적어둔 data-* 속성 값을 가져와서 텍스트 박스에 적용
      infoTitle.innerText = activeSlide.getAttribute('data-title');
      infoDesc1.innerText = activeSlide.getAttribute('data-desc1');
      infoDesc2.innerText = activeSlide.getAttribute('data-desc2');
      moodTitle.innerText = activeSlide.getAttribute('data-mood');
    });







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
















      



        const observer2 = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    //태그가 화면에 들어왔을 때
                    entry.target.classList.add("on")
                }
                else{
                    //태그가 화면 밖으로 나갔을 때
                    entry.target.classList.remove("on")
                }
            })
        },{
            threshold:0 // 태그가 화면에 50%이상 보일 때 트리거
        })
        document.querySelectorAll(".project-content").forEach(tag=>{observer2.observe(tag)}) // 위에는 복사해서쓰고 이것만 고치면됨

     


       

           

});














































































