import { BalloonOptions, BalloonTheme } from "./models/base.models"

export class Balloon  {
    themeBalloonOptions: BalloonTheme | null
    balloonDom: HTMLElement | null
    constructor(options: BalloonOptions | null) {
        this.balloonDom = null; // Initialize the balloonDom property

        if (options !== null) {
            this.themeBalloonOptions = options!.balloonTheme
        } else {
            this.themeBalloonOptions = null
        }

        this.balloonDom = document.querySelector('#BalloonItem')
        
    }
  
    public delete() {
      this.balloonDom?.remove()
    }
  
    public hide() {
        console.log('this.balloonDom = ', this.balloonDom)  
      this.balloonDom!.style.display = 'none'
    }
    public show() {
      this.balloonDom!.style.display = 'block'
    }
  
    public render(dataRender: any) {
      console.log('this.balloonDom = ', this.balloonDom)
      console.log('dataRender = ', dataRender)
      if(this.balloonDom === null) {
      const balloon = document.createElement('div')
      balloon.style.position = 'fixed'
      balloon.style.top = '0px'
      balloon.style.left = '0px'
      document.body.appendChild(balloon)
      this.balloonDom = balloon
      }
      this.balloonDom!.innerHTML = `
      
        <div class="balloon" style=" padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;background-color: ${
          this.themeBalloonOptions?.colorBG
        };position: absolute;bottom: 0;left: 0;">
  
          <div class="balloon-title" style="color:${
            this.themeBalloonOptions?.colorTitle
          }">${dataRender.title}</div>
          <div class="balloon-content" style="color:${
            this.themeBalloonOptions?.colorDescription
          }; display: ${dataRender.description !== '' ? 'block' : 'none'}">${
        dataRender.description
      }</div>
      <div class="box45" style="  width: 15px;
      height: 15px;
      transform: translate(0, 18px) rotate(45deg);  background-color: ${
        this.themeBalloonOptions?.colorBG
      }"></div>
        
        </div>
      `
      this.balloonDom!.style.display = 'block'
      return true
    }
    customRender(dataRender: any, structureCustomRender: any) {
      /*     console.log('custom Render dataRender = ', dataRender)
      console.log('custom Render options = ', this.themeBalloonOptions)
      console.log('custom Render structureCustomRender = ', structureCustomRender) */
      const titleDom = this.balloonDom!.querySelector(structureCustomRender.title)
      const descriptionDom = this.balloonDom!.querySelector(
        structureCustomRender.description
      )
      titleDom.innerHTML = dataRender.title
      descriptionDom.innerHTML = dataRender.description
      return true
    }
  }