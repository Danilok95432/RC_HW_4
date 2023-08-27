export class Slider{
    constructor(images, currentImg){
        this.images = images
        this.currentImg = currentImg
    }

   create(){
        let block = document.createElement('div')
        let slider = document.createElement('div')
        let wrapper = document.createElement('div')
        slider.className = 'slider'
        wrapper.className = 'wrapper'
        block.append(slider)
        slider.innerHTML = `
        <button class='prev-btn'>
            
        </button>
        <button class='next-btn'>
            
        </button>
        `
        slider.append(wrapper)
        for(let i = 0; i < this.images.length; i++){
            const img = document.createElement('img')
            img.className = 'slider-img'
            img.setAttribute('src', this.images[i])
            wrapper.append(img)
        }
        return block.innerHTML
   }

   control(wrapperWidth){
        let prevBtn = document.querySelectorAll('.prev-btn')
        let nextBtn = document.querySelectorAll('.next-btn')
        let wrapper = document.querySelectorAll('.wrapper')

        let prevWrapper = 0
        for(let i = 0; i < prevBtn.length; i++){
            prevBtn[i].addEventListener('click', (e) => {  
                if(i!=prevWrapper) this.currentImg = 0
                if(this.currentImg - 1 >= 0)
                {
                    wrapper[i].children[this.currentImg].style.transform = `translateX(${-1*(wrapperWidth) *(this.currentImg - 1)}px)`
                    wrapper[i].children[this.currentImg - 1].style.transform = `translateX(${-1*(wrapperWidth) * (this.currentImg - 1)}px)`
                }
                else{
                    wrapper[i].children[this.currentImg].style.transform = `translateX(${-1*(wrapperWidth) * (this.currentImg * (-1) - 1)}px)`
                    wrapper[i].children[wrapper[i].childElementCount - 1].style.transform = `translateX(${-1*(wrapperWidth) * (wrapper[i].childElementCount - 1)}px)`
                    this.currentImg = wrapper[i].childElementCount
                }
                this.currentImg--
                prevWrapper = i
                if(this.directionScroll())
                {
                    if(wrapper[i-1])
                        this.sliderObserve(wrapper[i-1], wrapper[i])
                }
                else{
                    if(wrapper[i+1])
                        this.sliderObserve(wrapper[i+1], wrapper[i])
                }
            })
            nextBtn[i].addEventListener('click', (e) => {
                if(i!=prevWrapper) this.currentImg = 0
                if( (this.currentImg + 1) <= (wrapper[i].childElementCount - 1))
                {
                    wrapper[i].children[this.currentImg].style.transform = `translateX(${-1*(wrapperWidth) *(this.currentImg + 1)}px)`
                    wrapper[i].children[this.currentImg + 1].style.transform = `translateX(${-1*(wrapperWidth) * (this.currentImg + 1)}px)`
                }
                else{
                    wrapper[i].children[0].style.transform = `translateX(${0}px)`
                    wrapper[i].children[this.currentImg].style.transform = `translateX(${-1*(wrapperWidth) * (this.currentImg + 1)}px)`
                    this.currentImg = -1
                }
                this.currentImg++
                prevWrapper = i
                if(this.directionScroll())
                {
                    if(wrapper[i-1])
                        this.sliderObserve(wrapper[i-1], wrapper[i])
                }
                else{
                    if(wrapper[i+1])
                        this.sliderObserve(wrapper[i+1], wrapper[i])
                }
            })   
        }
    }

   dragControl(wrapperWidth){
        let wrapper = document.querySelectorAll('.wrapper')
        let isDown = false;
        let startX;
        let prevWrapper = 0;
        let scroll = 0;
        for(let i = 0; i < wrapper.length; i++){
            wrapper[i].addEventListener('touchstart', (e) => {
                isDown = true
                let touchobj = e.changedTouches[0]   
                startX = parseInt(touchobj.clientX)  
                e.preventDefault()
            })
            wrapper[i].addEventListener('touchend', (e) => {
                isDown = false
                e.preventDefault()
            })
            wrapper[i].addEventListener('touchmove', (e) => {
                let touchobj = e.changedTouches[0] 
                let dist = parseInt(touchobj.clientX) - startX
                if(i!=prevWrapper) this.currentImg = 0
                wrapper[i].children[this.currentImg].style.transform = `translateX(${scroll + dist}px)`
                if(Math.abs(dist) > (wrapperWidth/20)){
                    if(dist < 0){
                        if(i!=prevWrapper) this.currentImg = 0
                        if( (this.currentImg + 1) <= (wrapper[i].childElementCount - 1))
                        {
                            scroll = (-1) * (wrapperWidth) * (this.currentImg + 1)
                            wrapper[i].children[this.currentImg].style.transform = `translateX(${-1*(wrapperWidth) *(this.currentImg + 1)}px)`
                            wrapper[i].children[this.currentImg + 1].style.transform = `translateX(${-1*(wrapperWidth) * (this.currentImg + 1)}px)`
                        }
                        else{
                            scroll = (-1) * (wrapperWidth) * (this.currentImg + 1)
                            wrapper[i].children[0].style.transform = `translateX(${0}px)`
                            wrapper[i].children[this.currentImg].style.transform = `translateX(${-1*(wrapperWidth) * (this.currentImg + 1)}px)`
                            this.currentImg = -1
                        }
                        this.currentImg++
                        prevWrapper = i
                    }
                    else {
                        if(i!=prevWrapper) this.currentImg = 0
                        if(this.currentImg - 1 >= 0)
                        {
                            scroll = (-1) * (wrapperWidth) * (this.currentImg - 1)
                            wrapper[i].children[this.currentImg].style.transform = `translateX(${-1*(wrapperWidth) *(this.currentImg - 1)}px)`
                            wrapper[i].children[this.currentImg - 1].style.transform = `translateX(${-1*(wrapperWidth) * (this.currentImg - 1)}px)`
                        }
                        else{
                            scroll = (-1) * (wrapperWidth) * (this.currentImg * (-1) - 1)
                            wrapper[i].children[this.currentImg].style.transform = `translateX(${-1*(wrapperWidth) * (this.currentImg * (-1) - 1)}px)`
                            wrapper[i].children[wrapper[i].childElementCount - 1].style.transform = `translateX(${-1*(wrapperWidth) * (wrapper[i].childElementCount - 1)}px)`
                            this.currentImg = wrapper[i].childElementCount
                        }
                        this.currentImg--
                        prevWrapper = i
                    }
                    if(this.directionScroll())
                    {
                        if(wrapper[i-1])
                            this.sliderObserve(wrapper[i-1], wrapper[i])
                    }
                    else{
                        if(wrapper[i+1])
                            this.sliderObserve(wrapper[i+1], wrapper[i])
                    }
                }
                    
                e.preventDefault()
            })
        }
   }

   sliderObserve(obj, prevObj){
        const sliderObserver = new IntersectionObserver(
            ([entry], observer) => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                this.refreshImages(prevObj)
                this.currentImg = 0
            }
            },
            { threshold: 0.8 }
        );

        if (obj) {
            sliderObserver.observe(obj);
        }
   }

   refreshImages(obj){
        for(let j = 0; j < obj.childElementCount; j++)
            obj.children[j].style.transform = `translateX(${0}px)`
   }

   directionScroll(){
    let flag;
        document.addEventListener('wheel', function(e){
            if(e.deltaY > 0){
                flag = false
            }
            else flag = true
            return flag
        })
   }
}
