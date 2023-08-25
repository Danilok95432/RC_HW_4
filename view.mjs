let startBtn = document.querySelector('.start-btn')
let introBlock = document.querySelector('.intro-section')
let header = document.getElementById('header-main')
let mainSection = document.querySelector('.main-section')


export class View{
    constructor(isIntroSkipped){
        this.isIntroSkipped = isIntroSkipped
    }

    runIntro(){
        startBtn.addEventListener('click', () => {
            introBlock.style.display = 'none'
            header.style.opacity = '1'
            mainSection.style.display = 'flex'
        })  
    }
}


