import { BalloonData, BalloonTheme } from "./models/base.models"

export class Balloon  {
    themeBalloonOptions: BalloonTheme | null
    balloonDom: HTMLElement | null
    balloonDomId: string | null
    constructor(data: BalloonData | null, theme: BalloonTheme | null, DomId: string | null=null) {
        this.balloonDom = null; // Initialize the balloonDom property
        DomId = DomId ?? 'BalloonItem'; // Initialize the balloonDom property
        this.balloonDomId = DomId; // Initialize the balloonDom property

        if (data !== null) {
            this.themeBalloonOptions = theme
        } else {
            this.themeBalloonOptions = null
        }


        
    }
  
    public init() {
      this.delete()
      this.balloonDomId = this.balloonDomId ?? 'BalloonItem'; // Ensure balloonDomId is a non-null string
      this.balloonDom = document.querySelector("#"+this.balloonDomId)
      console.log('this.balloonDom constructor = ', this.balloonDom)
      if (this.balloonDom === null) {
        this.render(
          {
            title: 'No data',
            description: 'No data'
          }
        
        )
      }
    }
    public delete() {
      if(this.balloonDom !== null) {
        console.log('balloon delete() ')
        this.balloonDom.remove()
      }
    }
  
    public hide() {
        console.log('this.balloonDom = ', this.balloonDom)  
        if(this.balloonDom !== null){
        this.balloonDom.style.display = 'none'
        }
    }
    public show() {
      console.log('SHOW ###### = ', this.balloonDom)
      if(this.balloonDom !== null){
      this.balloonDom.style.display = 'block'
      }
    }
  
    public render(dataRender: any, templateHTML: string = '') {
      console.log('this.balloonDom = ', this.balloonDom)
      console.log('dataRender = ', dataRender)
      if(this.balloonDom === null) {
      const balloon = document.createElement('div')
      balloon.id = this.balloonDomId as string;
      balloon.style.position =  this.themeBalloonOptions?.isPositionFixed?'absolute':'fixed'
      balloon.style.top = '0px'
      balloon.style.left = '0px'
      balloon.style.minWidth = '8%'
      document.body.appendChild(balloon)
      this.balloonDom = balloon
      }
      if (templateHTML === '') {
        this.defaultRender(dataRender)
      } else {
        this.customRender(dataRender, templateHTML)
      }
      
      return true
    }
    defaultRender(dataRender: any) {
      console.log('defaultRender dataRender = ', dataRender)
      console.log('defaultRender dataRender.image = ', dataRender.image)
      this.balloonDom!.innerHTML = ``
      if (dataRender.description !== undefined && dataRender.description !== '') {


        this.balloonDom!.innerHTML = `
          <div class="balloon" 
          style="font-family: sans-serif; 
          padding: 10px 10px 0px 10px;
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          border-radius: 10px;
          border-width: 2px;
          border-style: solid;
          border-color: ${
              this.themeBalloonOptions?.borderColor
            };
          justify-content: center;background-color: ${
            this.themeBalloonOptions?.colorBG
          };position: absolute;bottom: 0;left: 0;">
            
            <div class="balloon-title" style="
            font-size: 11px;
            text-transform: uppercase; 
            text-align: center;
            padding-bottom: 5px;
            color:${
              this.themeBalloonOptions?.colorTitle
            }">${dataRender.title}</div>

            ${(dataRender.image !== undefined)? `<div><img src="${dataRender.image}" style="width: 95%; max-height: 40px; "/></div>`: ''}
            

            <div class="balloon-content" style="
            color:${
              this.themeBalloonOptions?.colorDescription
            }; 
            display: block;
            z-index: 100;
            font-size: 12px;
            ">${
              dataRender.description
            }</div>            
            <div style="height: 1px;">
              <div class="box45" style="  
              width: 15px;
              height: 15px;
              border-width: 2px;
              border-style: solid;
              border-color: transparent ${
                this.themeBalloonOptions?.borderColor
              } ${
                this.themeBalloonOptions?.borderColor
              } transparent ;
              transform: translate(0, -6px) rotate(45deg);  background-color: ${
                this.themeBalloonOptions?.colorBG
              }">
              </div>
            </div>
          </div>
        `;
      } else {
        this.balloonDom!.innerHTML = `
        <div class="balloon" 
        style="font-family: sans-serif; 
        padding: 5px ;
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        border-width: 2px;
        border-style: solid;
        border-color: ${
            this.themeBalloonOptions?.borderColor
          };
        justify-content: center;background-color: ${
          this.themeBalloonOptions?.colorBG
        };position: absolute;bottom: 0;left: 0;">
          
          <div class="balloon-title" style="
          font-size: 11px;
          text-transform: uppercase; 
          text-align: center;
          z-index: 100;
          color:${
            this.themeBalloonOptions?.colorTitle
          }">${dataRender.title}</div>

            <div style="height: 1px;">
              <div class="box45" style="  
              width: 15px;
              height: 15px;
              border-width: 2px;
              border-style: solid;
              border-color: transparent ${
                this.themeBalloonOptions?.borderColor
              } ${
                this.themeBalloonOptions?.borderColor
              } transparent ;
              transform: translate(0, -2px) rotate(45deg);  background-color: ${
                this.themeBalloonOptions?.colorBG
              }">
              </div>
            </div>
              
          </div>
        `;

      }
      this.balloonDom!.style.display = 'block'
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