let startBtn = document.querySelector('.start-btn')
let introBlock = document.querySelector('.intro-section')
let header = document.getElementById('header-main')
let mainSection = document.querySelector('.main-section')


export class View{
    constructor(){
        
    }

    runIntro(){
        startBtn.addEventListener('click', () => {
            introBlock.style.display = 'none'
            header.style.opacity = '1'
            mainSection.style.display = 'flex'
        })  
    }

    scrollUp(){
        let btnUp = document.querySelector('.scroll-up')
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            if(scrollY > 800){
                btnUp.style.display = 'flex'
                btnUp.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                      })
                })
            }
            else{
                btnUp.style.display = 'none'
                btnUp.removeEventListener('click', btnUp, false)
            }
            
        })
    }
}


