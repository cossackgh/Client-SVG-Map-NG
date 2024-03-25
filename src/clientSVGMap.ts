
/**
 * Represents a client SVG editor.
 */
import { Balloon } from './baloon.ts';
import { logger, loggerTable } from './logger.ts';
import type {

  DataInteractive,
  DataInteractiveMA,
  DataOptions,
  //MapTheme,
  BalloonData,
  //CastomBalloonOptions,
  BalloonTheme,
  DataSigns,
} from './models/base.models'

export class ClientSVGEditorNG{
    
     options: any;
     public DEBUG: boolean = false;
     public log = logger;
     public logT = loggerTable;
     objectBalloon!: Balloon;
     customBalloon: Balloon | null;
    /**
     * The constructor for the client SVG map.
     * @param node - The HTML element that will contain the SVG map.
     * @param svg - The SVG file to be inserted into the HTML element.
     * @param options - The options for the SVG map.
     * @returns void
     *  
     **/

    constructor(private node: HTMLElement, private urlsvg: string, private dataItems: DataInteractiveMA[], private dataSigns: DataSigns[], balloon: Balloon | null = null, options: DataOptions){
      this.log(this.DEBUG,"constructor",node);
      this.node = node;
      this.urlsvg = urlsvg;
      this.options = options;
      this.dataItems = dataItems;
      this.dataSigns = dataSigns;
      this.customBalloon = balloon;


      this.log(this.DEBUG,"constructor this.node",this.node);
      this.log(this.DEBUG,"constructor this.dataItems",this.dataItems);
      this.log(this.DEBUG,"constructor this.options",this.options);
      this.log(this.DEBUG,"constructor this.customBalloon",this.customBalloon);
      this.log(this.DEBUG,"constructor this.dataSigns",this.dataSigns);
      
    }


    /**
     * Updates the data items of the client SVG map.
     * @param dataItems - An array of DataInteractive objects representing the updated data items.
     */
    public updateDataItems = (dataItems: DataInteractiveMA[]) => {
      this.dataItems = dataItems
    }
    /**
     * Initializes the client SVG map.
     * @returns void
     */
    public init = async () => {
        this.log(this.DEBUG,"init() node",this.node);
        this.log(this.DEBUG,"init() urlsvg",this.urlsvg);
        this.log(this.DEBUG,"init() options",this.options);

        const retNode = this.insertFromFile(this.urlsvg).then(() => {
          this.log(this.DEBUG,"init() insertFromFile",this.urlsvg);
          //this.setOptions();

          // Create a balloon
          
            this.objectBalloon = this.createBalloon(
              {
                title: 'TITLE#################',
               // description: 'DESCRIPTION',
                //image: 'IMAGE',
              },
              {
                colorBG: '#ffffff',
                colorTitle: '#5C5C5C',
                colorDescription: '#5C5C5C',
                isPositionFixed: true,
                borderWidth: '2px',
                borderColor: '#6391CC',
                top: 0,
                left: 0,
              }
            )          
          this.setInteractiveLayer();

          this.log(this.DEBUG,"init() this.objectBalloon",this.objectBalloon);
          this.log(this.DEBUG,"init() this.objectBalloon getBoundingClientRect",this.objectBalloon.balloonDom?.getBoundingClientRect());
          const getNodeSVG = this.node.querySelector('svg')
          this.log(this.DEBUG,"init() getNodeSVG",getNodeSVG);
          return getNodeSVG

        }).catch((error) => {
          this.log(this.DEBUG,"init() insertFromFile error",error);
        })
        return retNode
    }

    /**
     * Handles the click event for a path element.
     * @param e - The click event.
     * @returns void
     */
    public onPathClick = (e: any) => {
      this.log(this.DEBUG,"onPathClick e",e);
      const path = e.target
      this.log(this.DEBUG,"onPathClick path",path);
      const id = path.id
      this.log(this.DEBUG,"onPathClick id",id);
      const itemClick = this.dataItems.find((item) => item.idmap === id)
      this.log(this.DEBUG,"onPathClick item",itemClick);
      if (itemClick) {
        this.log(this.DEBUG,"onPathClick item",itemClick);
        // go to the page
        window.open(itemClick.slug, '_self')?.focus()
         //this.showBalloon(item) 
      }
    
        
      
    }
    /**
     * Handles the mouseover event for a path element.
     * @param e - The mouseover event.
     * @returns void
     */
    public onPathMouseOver = (e: any) => {
      this.log(this.DEBUG,"onPathMouseOver e",e);
      const path = e.target
      this.log(this.DEBUG,"onPathMouseOver path",path);
      if (path.tagName !== 'g') {
        (path as SVGElement).setAttribute('fill', this.options.mapTheme.colorItem.colorBGActive);
        (path as SVGElement).setAttribute('fill-opacity', this.options.mapTheme.colorItem.opacityActive);
        
        (path as SVGElement).setAttribute('stroke', this.options.mapTheme.borderItem.colorBorderActive);
      }
      const id = path.id
      this.log(this.DEBUG,"onPathMouseOver id",id);
      const item = this.dataItems.find((item) => item.idmap === id)
      this.log(this.DEBUG,"########### Before item",item);
      if ( item == null) {
        this.log(this.DEBUG,"###########  item === null",item);
      }
      else if (item === undefined) {
        this.log(this.DEBUG,"###########  item === undefined",item);
        const signData = this.dataSigns.find((item) => item.pref === id.split('-')[0])
        this.log(this.DEBUG,"###########  signData",signData);
        this.showBalloon({title: signData?.title})
      }
      else  {
        this.log(this.DEBUG,"onPathMouseOver item",item);
        if (item !== undefined){
         
          this.showBalloon(item)
        }
        
      }
    }
    public onGroupMouseOver = (grp: any) => {
      this.log(this.DEBUG,"onPathMouseOver grp",grp);
      const id = grp.id
      const signData = this.dataSigns.find((item) => item.pref === id.split('-')[0])
        this.log(this.DEBUG,"###########  signData",signData);
        this.showBalloon({title: signData?.title})
    }
    /**
     * Handles the mouseout event for a path element.
     * @param e - The mouseout event.
     * @returns void
     */
    public onPathMouseOut = (e: any) => {
      //this.log(this.DEBUG,"onPathMouseOut e",e);
      const path = e.target
     // this.log(this.DEBUG,"onPathMouseOver path",path);
      if (path.tagName !== 'g') {
        (path as SVGElement).setAttribute('fill', this.options.mapTheme.colorItem.colorBG);
        (path as SVGElement).setAttribute('fill-opacity', this.options.mapTheme.colorItem.opacity);
        (path as SVGElement).setAttribute('stroke', this.options.mapTheme.borderItem.colorBorder);
      }
      this.hideBalloon()
    }

    /**
     * Sets the interactive layer for the client SVG map.
     * @returns void
     */
    public setInteractiveLayer = async () => {
        this.log(this.DEBUG,"setInteractiveLayer this.node",this.node);
        this.log(this.DEBUG,"setInteractiveLayer this.options",this.options);
        const interactiveLayer = document.querySelector('#'+this.options.idInteractiveLayer)
        this.log(this.DEBUG,"setInteractiveLayer interactiveLayer",interactiveLayer);
        this.clearInteractiveLayer();
        if (interactiveLayer) {
          //let allElements = interactiveLayer.querySelectorAll(':scope > *:not(g)');
          let elementsOnly = interactiveLayer.querySelectorAll(':scope > *:not(g)');
          let allElements = interactiveLayer.querySelectorAll('*');
          this.log(this.DEBUG,"setInteractiveLayer allElements",allElements);
          this.log(this.DEBUG,"setInteractiveLayer elementsOnly",elementsOnly);
          this.log(this.DEBUG,"setInteractiveLayer isMobile",isMobile());
          this.log(this.DEBUG,"setInteractiveLayer this.objectBalloon ",this.objectBalloon);
          
          if (!isMobile() && this.objectBalloon.balloonDom !== null) {
          /*interactiveLayer.addEventListener('mousemove', (e: any) => {
             
              this.log(this.DEBUG,'before handleMousemove mousemove ', {X: e.x, Y: e.y});

              this.handleMousemove(e, this.objectBalloon, this.options!.isCustomBalloon!)
      
              //  throttle(handleMousemove(e,this.objectBalloon), 11200)
            }) */
          }


            allElements.forEach((element) => {
                  //this.log(this.DEBUG,"setInteractiveLayer element",element);
                  if (element.tagName.toLowerCase() !== 'g' && element.closest('g') !== interactiveLayer) {

                    return;
                  }
                  

                    if (element.tagName !== 'g') {
                      //this.log(this.DEBUG,"setInteractiveLayer element",element);
                      (element as SVGElement).setAttribute('fill', this.options.mapTheme.colorItem.colorBG);
                      (element as SVGElement).setAttribute('fill-opacity', this.options.mapTheme.colorItem.opacity);
                      //(element as SVGElement).style.opacity = this.options.mapTheme.colorItem.opacity;

                    }
                    
                      (element as SVGElement).style.cursor = 'pointer'
                      element.addEventListener('click', (e) => {
                        const target = e.target as SVGElement; // Explicitly type the event target as SVGElement
                        //this.log(this.DEBUG,"setInteractiveLayer click",e);
                        this.log(this.DEBUG,"click this.options.funcParams ",this.options.funcParams);
                        if (target.tagName.toLowerCase() === 'g' || (target.closest('g') && target.closest('g') !== interactiveLayer)) {
                          return;
                          }
                        this.options.funcClick(e, this.options.funcParams)
                       // this.onPathClick(e)
                      })
                      element.addEventListener('mouseover', (e: any) => {
                        const target = e.target as SVGElement; // Explicitly type the event target as SVGElement
                        this.log(this.DEBUG,"addEventListener mouseover target",target);
                        this.clearInteractiveLayer();
                        const signData = this.dataSigns.find((item) => item.pref === target.id.split('-')[0])
                        const item = this.dataItems.find((item) => item.idmap === target.id)
                        this.log(this.DEBUG,"addEventListener mouseover this.dataSigns",this.dataSigns);
                        this.log(this.DEBUG,"addEventListener mouseover signData",signData);
                        if(signData !== undefined && signData !== null) {
                          this.showActiveElement(item as DataInteractive)
                        }
                        
                        
                      if (target.tagName.toLowerCase() === 'g' || (target.closest('g') && target.closest('g') !== interactiveLayer)) {
                        this.log(this.DEBUG,"addEventListener mouseover EXIT!???",target.closest('g')?.id);
                        
                        this.onGroupMouseOver(target.closest('g'))
                        this.setPositionBalloon(target.closest('g'), this.objectBalloon, this.options!.isCustomBalloon!)
                        return;
                        }
                        
                        this.showActiveElement(item as DataInteractive)
                        /* this.handleMousemove(e, this.objectBalloon, this.options!.isCustomBalloon!)*/
                        this.onPathMouseOver(e) 
                      })
                      element.addEventListener('mouseout', (e) => {
                        const target = e.target as SVGElement; // Explicitly type the event target as SVGElement
                        if (target.tagName.toLowerCase() === 'g' || (target.closest('g') && target.closest('g') !== interactiveLayer)) {
                          this.hideBalloon()
                          return;
                          }
                        this.onPathMouseOut(e)
                      })    
            })
      }
      }


    /**
     * Clears the interactive layer for the client SVG map.
     * @returns void
     * 
    */
    public clearInteractiveLayer = () => {
      const interactiveLayer = document.querySelector('#'+this.options.idInteractiveLayer);
      if (interactiveLayer) {
        const allElements = interactiveLayer.querySelectorAll('*');
        allElements.forEach((element) => {
          if (element.tagName.toLowerCase() !== 'g' && element.closest('g') !== interactiveLayer) {
            return;
          }
          if (element.tagName !== 'g') {
            (element as SVGElement).removeAttribute('style');
            (element as SVGElement).setAttribute('fill', this.options.mapTheme.colorItem.colorBG);
            (element as SVGElement).setAttribute('fill-opacity', this.options.mapTheme.colorItem.opacity);
            (element as SVGElement).setAttribute('stroke', this.options.mapTheme.borderItem.colorBorder);
            (element as SVGElement).setAttribute('stroke-width', this.options.mapTheme.borderItem.widthBorder);
          }
          (element as SVGElement).style.cursor = 'pointer';
          element.removeEventListener('click', this.onPathClick);
          element.removeEventListener('mouseover', this.onPathMouseOver);
          element.removeEventListener('mouseout', this.onPathMouseOut);
        });
      }

    } 

    /**
     * Inserts an SVG file into the client SVG map.
     * @param url - The URL of the SVG file.
     * @returns void
     */
    public insertFromFile = async (url: string) => {
        this.log(this.DEBUG,"insertFromFile url",url);
        
        const data = await this.loadSVGFile(url)
        this.insertSVGFromString(data)
      }
    /**
     * Sets the options for the client SVG map.
     * @param options - The options object.
     * @returns void
     */
    public setOptions = (options: DataOptions = {
        colorBG: '#ffffff',// The background color of the SVG map.
        idInteractiveLayer: 'interactive',// The ID of the interactive layer.

      }
    ) => {
          this.log(this.DEBUG,"setOptions options",options);

          this.options = options;
          this.node.style.backgroundColor = this.options.colorBG;
        }

    /**
     * Loads an SVG file from a URL.
     * @param url - The URL of the SVG file.
     * @returns The SVG file as a string.
     * 
     */
    
    public loadSVGFile = async (url: string) => {
        this.log(this.DEBUG,"loadSVGFile url",url);
        const data = fetch(url)
          .then((response) => response.text())
          .then((text) => {
            //this.log(this.DEBUG,"loadSVGFile text",text);
            return text
          })
          .catch((error) => {
            //this.log(this.DEBUG,"loadSVGFile error",error);
            return error
          })
        return data
      }

      /**
       * Inserts an SVG string into the DOM node.
       * @param stringSVG - The SVG string to be inserted.
       */
      insertSVGFromString(stringSVG: string) {
      //  this.log(this.DEBUG,"insertSVGFromString stringSVG",stringSVG);
      //  this.log(this.DEBUG,"insertSVGFromString this.node",this.node);
        this.node.innerHTML = ''
    
        this.node.innerHTML = stringSVG
      }

      /**
       * Creates a balloon for the client SVG map.
       * @param options - The options for the balloon.
       * @returns The balloon.
       */
      private createBalloon = (data: BalloonData, theme: BalloonTheme) => {
          console.log('createBalloon options = ', data)
      /*  const balloonDom = document.createElement('div')
        balloonDom.id = 'BalloonItem'
        document.body.appendChild(balloonDom) */
        let baloon = new Balloon(data, theme)
        baloon.init()
        baloon.hide()
        console.log('createBalloon document IF baloon.balloonDom = ', baloon.balloonDom)

        return baloon
      }
    /**
     * Shows a balloon for a path element.
     * @param item - The data item for the path element.
     * @returns void
     */
    public showBalloon = (item: DataInteractive) => {
      this.log(this.DEBUG,"showBalloon item",item);
      this.log(this.DEBUG,"showBalloon this.objectBalloon",this.objectBalloon);
      if ( item !== null) {
        this.objectBalloon.show()
        this.objectBalloon.render({title: item.title, image: item.image!, slug: item.slug!, description: item.description!})
      }
    }
    /**
     * Hides the balloon.
     * @returns void
     */
    public hideBalloon = () => {
      if (this.objectBalloon) {
        this.objectBalloon.hide()
      }
    }
    public showActiveElement = (item: DataInteractive) => {
      this.log(this.DEBUG,"showActiveElement item",item);
      this.log(this.DEBUG,"showActiveElement this.objectBalloon",this.objectBalloon);
      if ( item !== null) {
        this.clearInteractiveLayer();
        const path = this.node.querySelector('#'+item.idmap)
        if (path?.tagName !== 'g') {
          (path as SVGElement).setAttribute('fill', this.options.mapTheme.colorItem.colorBGActive);
          (path as SVGElement).setAttribute('fill-opacity', this.options.mapTheme.colorItem.opacityActive);
          
          (path as SVGElement).setAttribute('stroke', this.options.mapTheme.borderItem.colorBorderActive);
        }
        const id = path?.id
        this.log(this.DEBUG,"onPathMouseOver id",id);
        this.log(this.DEBUG,"########### Before item",item);
        if ( item == null) {
          this.log(this.DEBUG,"###########  item === null",item);
        }
        else if (item === undefined) {
          this.log(this.DEBUG,"###########  item === undefined",item);
          const signData = this.dataSigns.find((item) => item.pref === id?.split('-')[0])
          this.log(this.DEBUG,"###########  signData",signData);
          this.showBalloon({title: signData?.title})
          this.setPositionBalloon(path,this.objectBalloon, this.options.isCustomBalloon)
          
        }
        else  {
          this.log(this.DEBUG,"onPathMouseOver item",item);
          if (item !== undefined){
            this.showBalloon(item)
            this.setPositionBalloon(path,this.objectBalloon, this.options.isCustomBalloon)
            
          }
          
        }
      }
    }
    public placeImageToPosition = (imageUrl: any, idLogo: string, position: any ={x:0,y:0}) => {
      const getNodeSVG = this.node.querySelector('svg')
      const getLogoLayer = getNodeSVG?.querySelector('g#points-logo')
      this.log(this.DEBUG,'getNodeSVG = ',getNodeSVG);
      this.log(this.DEBUG,'getLogoLayer = ',getLogoLayer);
      if (!getLogoLayer) {
        
        // create svg layer
        const svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        svgGroup.setAttribute("id", "points-logo");
        getNodeSVG?.appendChild(svgGroup);
        // create image in svg group
        const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        const getSize = () => {
          const pointLogo = svgGroup?.querySelector('#l-'+idLogo.split('-')[1])
          return { width: pointLogo?.getAttribute('width'), height: pointLogo?.getAttribute('height') }
            }
        image.setAttribute("id", 'im-'+idLogo);
        image.setAttribute("href", imageUrl);
        image.setAttribute("width", `${getSize().width}`);
        //image.setAttribute("width", "100");
        //image.setAttribute("height", "30");
        image.setAttribute("transform", `translate(${position.x}, ${position.y})`);
        if (imageUrl) {
        svgGroup.appendChild(image);
        }
      }
      else {
        const getPosition = () => {
          const pointLogo = getLogoLayer?.querySelector('#l-'+idLogo.split('-')[1])
          return { x: pointLogo?.getAttribute('x'), y: pointLogo?.getAttribute('y') }
            }
        const getSize = () => {
          const pointLogo = getLogoLayer?.querySelector('#l-'+idLogo.split('-')[1])
          return { width: pointLogo?.getAttribute('width'), height: pointLogo?.getAttribute('height') }
            }
        this.log(this.DEBUG,'getPosition = ',getPosition());
        const getLogo = getNodeSVG?.querySelector('#im-'+idLogo)
        if (getLogo) {
          if (imageUrl) {
          getLogo.setAttribute("href", imageUrl);
          getLogo.setAttribute("transform", `translate(${getPosition().x}, ${getPosition().y})`);
          getLogo.setAttribute("width", `${getSize().width}`);
          }
        }
        else {
          // create image in svg group
          const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
          image.setAttribute("id", 'im-'+idLogo);
          image.setAttribute("href", imageUrl);
          image.setAttribute("width", `${getSize().width}`);
          //image.setAttribute("width", "210");
          //image.setAttribute("height", "30");
          image.setAttribute("transform", `translate(${getPosition().x}, ${getPosition().y})`);
          if (imageUrl) {
            getLogoLayer.appendChild(image);
          }
          
        }
      }
      
    }
    public palceAllLogos = () => {
      this.dataItems.forEach((item) => {
        this.log(this.DEBUG,'placeImageToPosition item = ',item);
        this.placeImageToPosition(item.logo, item.idmap ?? '')
        //this.placeImageToPosition(item.logo, item.idmap)
      })
    }
/*       private   getPositionScroll = (element: HTMLElement = this.node) => {
        const scrollX = element.getBoundingClientRect().left
        const scrollY = element.getBoundingClientRect().top

        return { scrollX, scrollY }
      } */
/*       private  handleMousemove = (
        activeObj: { target: any, x: number, y: number},
        baloon: any,
        isCustomBalloon: boolean
      ) => {

        const position = { x: activeObj.x, y: activeObj.y }
        this.log(this.DEBUG,'handleMousemove target = ',activeObj.target);
        const targetBBox = activeObj.target.getBoundingClientRect();
        const balloonBBox = baloon.balloonDom.getBoundingClientRect();
        this.log(this.DEBUG,'handleMousemove targetBBox = ',targetBBox);
        this.log(this.DEBUG,'handleMousemove balloonBBox = ',balloonBBox);
        this.log(this.DEBUG,'handleMousemove baloon.balloonDom = ', baloon.balloonDom);
        const getWidthElement = isCustomBalloon
          ? baloon.balloonDom.offsetWidth
          : baloon.balloonDom.offsetWidth
        this.log(this.DEBUG,'getWidthElement = ', getWidthElement);
        this.log(this.DEBUG,'baloon.themeBalloonOptions = ', baloon.themeBalloonOptions);
        this.log(this.DEBUG,'this.options.isBalloonFixed = ', this.options.isBalloonFixed);
                
                if (this.options.isBalloonFixed) {
                  this.log(this.DEBUG,'.isBalloonFixed = true');
                  baloon.balloonDom!.style.top = `${targetBBox.top + window.scrollY + this.options.fixedBalloonPosition.y}px`;
                  baloon.balloonDom!.style.left = `${targetBBox.left - balloonBBox.width / 2 + targetBBox.width / 2 + this.options.fixedBalloonPosition.x}px`;
                } else {
                  this.log(this.DEBUG,'.isBalloonFixed = false');
                  baloon.balloonDom!.style.transform = `translate(${
                    position.x - getWidthElement / 2 -12
                  }px, ${position.y - 40}px)`
                }
      } */
      private  setPositionBalloon = (
        activeObj: any,
        baloon: any,
        isCustomBalloon: boolean
      ) => {

        this.log(this.DEBUG,'setPositionBalloon activeObj = ',activeObj);
        const targetBBox = activeObj.getBoundingClientRect();
        const balloonBBox = baloon.balloonDom.getBoundingClientRect();
        this.log(this.DEBUG,'setPositionBalloon targetBBox = ',targetBBox);
        this.log(this.DEBUG,'setPositionBalloon balloonBBox = ',balloonBBox);
        const getWidthElement = isCustomBalloon
          ? baloon.balloonDom.offsetWidth
          : baloon.balloonDom.offsetWidth
        this.log(this.DEBUG,'getWidthElement = ', getWidthElement);
        this.log(this.DEBUG,'baloon.themeBalloonOptions = ', baloon.themeBalloonOptions);
        this.log(this.DEBUG,'this.options.isBalloonFixed = ', this.options.isBalloonFixed);
        const logObj = {left: targetBBox.left, bWidth:balloonBBox.width, ElWidth: targetBBox.width, shiftX:this.options.fixedBalloonPosition.x};
        this.logT(this.DEBUG,'Param X :',logObj);
/*           this.log(this.DEBUG,'targetBBox.left =',targetBBox.left);
          this.log(this.DEBUG,'balloonBBox.width =',balloonBBox.width);
          this.log(this.DEBUG,'targetBBox.width =',targetBBox.width); */
          this.log(this.DEBUG,'this.options.fixedBalloonPosition.x =',this.options.fixedBalloonPosition.x);
          baloon.balloonDom!.style.top = `${targetBBox.top + window.scrollY + this.options.fixedBalloonPosition.y}px`;
          baloon.balloonDom!.style.left = `${targetBBox.left - balloonBBox.width / 2 + targetBBox.width / 2 + this.options.fixedBalloonPosition.x}px`;

      }

}


const isMobile = () => {
    let check = false
    ;((a) => {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true
    })(navigator.userAgent || navigator.vendor)
    return check
  }