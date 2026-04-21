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

    const header = document.querySelector("header")
    const smart = document.querySelector("#main-header")

    let lastScrollTop = 0;
    window.addEventListener('scroll',()=>{
      
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

            const bgVideo = document.querySelector('.bg-video-layer');

            if (bgVideo) {
                bgVideo.playbackRate = 0.4;
            } 
    

            const elements = document.querySelectorAll('.fade-in-up');

            const observer = new IntersectionObserver((entries) => {
                
              
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
                visibleEntries.forEach((entry, index) => {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200); 
                });

                const hiddenEntries = entries.filter(entry => !entry.isIntersecting);
                hiddenEntries.forEach(entry => {
                  
                    entry.target.classList.remove('visible');
                });

            }, {
                
                threshold: 0.1 
            });

            elements.forEach(element => {
                observer.observe(element);
            });
 


   
        
    const floatingKey = document.querySelector('.key');

      
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

          





class ElasticLine {
    constructor(container) {
        this.container = container;
       
        this.path = container.querySelector('.elastic-path'); 
        
      
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

      
        this.initEvents();
        this.animateLine();
    }




    initEvents() {
     
        window.addEventListener('resize', () => {
            this.width = this.container.clientWidth;
        });

      
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.targetX = e.clientX - rect.left;
            this.targetY = e.clientY - rect.top;
        });

      
        this.container.addEventListener('mouseleave', () => {
            this.targetX = this.width / 2;
            this.targetY = this.centerY;
        });
    }





    animateLine = () => {
        this.cx += (this.targetX - this.cx) * 0.1;

        let dy = this.targetY - this.cy;
        this.vY += dy * this.spring;
        this.vY *= this.friction;
        this.cy += this.vY;

        const d = `M 0 ${this.centerY} Q ${this.cx} ${this.cy} ${this.width} ${this.centerY}`;
        this.path.setAttribute('d', d);

       
        requestAnimationFrame(this.animateLine);
    }
}





const containers = document.querySelectorAll('.elastic-container');
containers.forEach(container => new ElasticLine(container));



        // 포스터 영역
     
    const swiper = new Swiper(".poster-mySwiper", {
      effect: "cards", 
      grabCursor: true,
    });

  
    const infoTitle = document.getElementById("infoTitle");
    const infoDesc1 = document.getElementById("infoDesc1");
    const infoDesc2 = document.getElementById("infoDesc2");
    const moodTitle = document.getElementById("moodTitle");

    swiper.on('slideChange', function () {
     
      const activeSlide = swiper.slides[swiper.activeIndex];
      
      
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
     
        entry.target.classList.add('active');
        
      
        currentObserver.unobserve(entry.target);
      }
    });
  }, scrollAnimOptions);

 
  const scrollAnimTargets = document.querySelectorAll('.scroll-element');
  scrollAnimTargets.forEach(target => scrollAnimObserver.observe(target));





  
    




    //  상세페이지

    const detailSwiper = new Swiper(".detail-swiper", {
                    speed: 1000,
                    slidesPerView: 1.2,
                    spaceBetween: 14,
                  
                    breakpoints: {
                        320: {
                            slidesPerView: 1.6,
                            spaceBetween: 14
                        },
                        480: {
                            slidesPerView: 2.2, 
                            spaceBetween: 14
                        },
                        1024: {
                            slidesPerView: 3,   
                            spaceBetween: 20
                        },
                        1400: {
                            slidesPerView: 4,  
                            spaceBetween: 24   
                        },
                    }
                });
















      



        const observer2 = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
                if(entry.isIntersecting){
                  
                    entry.target.classList.add("on")
                }
                else{
                   
                    entry.target.classList.remove("on")
                }
            })
        },{
            threshold:0 
        })
        document.querySelectorAll(".project-content").forEach(tag=>{observer2.observe(tag)}) 

     


       

           

});














































































