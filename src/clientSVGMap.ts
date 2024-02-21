
/**
 * Represents a client SVG editor.
 */
import { logger } from './logger.ts';
import type {
  DataInteractive,
  DataOptions,
  //MapTheme,
  BalloonOptions,
  CastomBalloonOptions,
  BalloonTheme,
} from './models/base.models'
export class ClientSVGEditorNG{
    
     options: any;
     public DEBUG: boolean = false;
     public log = logger;
     
    /**
     * The constructor for the client SVG map.
     * @param node - The HTML element that will contain the SVG map.
     * @param svg - The SVG file to be inserted into the HTML element.
     * @param options - The options for the SVG map.
     * @returns void
     *  
     **/

    constructor(private node: HTMLElement, private urlsvg: string, private dataItems: DataInteractive, options: DataOptions){
      this.log(this.DEBUG,"constructor",node);
      this.node = node;
      this.urlsvg = urlsvg;
      this.options = options;
      this.dataItems = dataItems;


      this.log(this.DEBUG,"constructor this.node",this.node);
      this.log(this.DEBUG,"constructor this.dataItems",this.dataItems);
      this.log(this.DEBUG,"constructor this.options",this.options);
      
    }
    /**
     * Initializes the client SVG map.
     * @returns void
     */
    public init(): void {
        this.log(this.DEBUG,"init() node",this.node);
        this.log(this.DEBUG,"init() urlsvg",this.urlsvg);
        this.log(this.DEBUG,"init() options",this.options);

        this.insertFromFile(this.urlsvg).then(() => {
          this.log(this.DEBUG,"init() insertFromFile",this.urlsvg);
          this.setOptions();
          this.setInteractiveLayer();
        })
        
    }


    public setInteractiveLayer = () => {
      this.log(this.DEBUG,"setInteractiveLayer this.node",this.node);
        const interactiveLayer = document.getElementById(this.options.idInteractiveLayer)
        this.log(this.DEBUG,"setInteractiveLayer interactiveLayer",interactiveLayer);
        if (interactiveLayer) {

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