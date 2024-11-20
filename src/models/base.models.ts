
/**
 * Represents a data interactive object.
 * @id {string} id - The ID of the data.
 * @idmap {string} idmap - The ID of the map.
 * @title {string} title - The title of the data to view on hover ballon.
 * @slug {string} slug - The slug of the data - link to view on hover ballon.
 * @description {string} description - The description of the data  to view on hover ballon.
 * @image {string} image - The image associated with the data  to view on hover ballon.
 * @returns void
 */
export interface DataInteractive {
    id?: string
    idmap?: string
    title?: string
    slug?: string
    description?: string
    image?: string
  }
/**
 * Represents a data interactive object.
 * @id {string} id - The ID of the data.
 * @idmap {string} idmap - The ID of the map.
 * @title {string} title - The title of the data to view on hover ballon.
 * @slug {string} slug - The slug of the data - link to view on hover ballon.
 * @description {string} description - The description of the data  to view on hover ballon.
 * @image {string} image - The image associated with the data  to view on hover ballon.
 * @returns void
 */
export interface DataInteractiveM {
    id?: string
    idmap?: string
    numberbox?: string
    title?: string
    slug?: string
    description?: string
    image?: string
  }

  export interface DataInteractiveMA {
    id?: string
    floor?: string
    idmap?: string
    numberbox?: string
    category?: categoryMA[]
    title?: string
    description?: string
    slug?: string
    logo?: string
  }
  interface categoryMA {
            id?: string
            title?: string
            slug?: string
  }



/**
 * Represents a data interactive object.
 * @pref {string} pref - The prefix of the data.
 * @title {string} title - The title of the data.
 * @returns void
 **/
export interface DataSigns {
  pref: string
  title: string
}
/**
 * Represents the options for data.
 * @title {string} title - The title of the data.
 * @colorBG {string} colorBG - The background color of the data.
 * @interactiveLayer {string} interactiveLayer - The interactive layer of the data.
 * @description {string} description - The description of the data.
 * @image {string} image - The image associated with the data.
 * @isRemoveUnuseItem {boolean} isRemoveUnuseItem - Indicates whether to remove unused items.
 * @isHoverEnable {boolean} isHoverEnable - Indicates whether hover is enabled.
 * @funcClick {Function} funcClick - The function to be called on click.
 * @funcParams {any} funcParams - The parameters for the function.
 * @mapTheme {MapTheme} mapTheme - The theme of the map.
 * @isCustomBalloon {boolean} isCustomBalloon - Indicates whether a custom balloon is used.
 * @nodeCustomBalloon {HTMLElement | null} nodeCustomBalloon - The custom balloon node.
 * @dataStructureCustomBalloon {CastomBalloonOptions | null} dataStructureCustomBalloon - The options for the custom balloon data structure.
 * @isMobileZoom {boolean | null} isMobileZoom - Indicates whether mobile zoom is enabled.
 * @isSVGFromString {boolean | null} isSVGFromString - Indicates whether the SVG is loaded from a string.
 * @returns void
 */
export interface DataOptions {
    isDebug?: boolean;
    title?: string;
    colorBG?: string;
    idInteractiveLayer?: string;
    description?: string;
    image?: string;
    isRemoveUnuseItem?: boolean;
    isHoverEnable?: boolean;
    funcClick?: Function;
    funcParams?: any;
    mapTheme?: MapTheme;
    isCustomBalloon?: boolean;
    isBalloonFixed?: boolean;
    fixedBalloonPosition?: {x: number, y: number};
    nodeCustomBalloon?: HTMLElement | null;
    dataStructureCustomBalloon?: CastomBalloonOptions | null;
    isMobileZoom?: boolean | null;
    isSVGFromString?: boolean | null;
}

/**
 * Represents the options for a balloon.
 * @balloonTheme {BalloonTheme} balloonTheme - This is the theme of the balloon
 * @title {string} title - This is the title of the balloon
 * @description {string} description - This is the description of the balloon
 * @image {string} image - This is the image of the balloon
 * @returns void
 */
  export interface BalloonData {
    title: string
    description?: string
    image?: string
  }
  
  /**
   * @description
   * This is the description of the interface @CastomBalloonOptions
   * @title {string} title - This is the title of the interface
   * @description {string} description - This is the description of the interface
   */
  export interface CastomBalloonOptions {
    title?: string
    description?: string
  }
  
  /**
   * @description
   * This is the description of the interface @BalloonTheme
   * @colorBG {string} colorBG - This is the colorBG of the Balloon
   * @colorTitle {string} colorTitle - This is the colorTitle of the Balloon
   * @colorDescription {string} colorDescription - This is the colorDescription of the Balloon
   * @isPositionFixed {boolean} isPositionFixed - This is the use of the Balloon fixed position
   * @top {number}  top - This is the top positon of the Balloon
   * @left {number} left - This is the left position of the Balloon
   */
  export interface BalloonTheme {
    colorBG?: string
    colorTitle?: string
    colorDescription?: string
    isPositionFixed?: boolean
    borderWidth?: string
    borderColor?: string
    top?: number
    left?: number
  }
  
  /**
    * @description
    * This is the description of the interface @MapTheme
    * @colorBG {string} colorBG - This is the colorBG of the Map
    * @colorItem {ColorPlace} colorItem - This is the colorItem of the Map
    * @borderItem {PlaceBorder} borderItem - This is the borderItem of the Map
    */
  export interface MapTheme {
    colorBG?: string
    colorItem?: ColorPlace
    borderItem?: PlaceBorder
  }
  
    /**
     * @description
     * This is the description of the interface @PlaceBorder
     * @isBorder {boolean} isBorder - This is the isBorder of the Place
     * @widthBorder {number} widthBorder - This is the widthBorder of the Place
     */
  export interface PlaceBorder {
    isBorder?: boolean
    widthBorder?: number
    colorBorder?: string
    colorBorderActive?: string
  }

      /**
     * @description
     * This is the description of the interface @ColorPlace
     * @colorBG {string} colorBG - This is the colorBG of the Place
     * @colorBorder {string} colorBorder - This is the colorBorder of the Place
     * @colorBGActive {string} colorBGActive - This is the colorBGActive of the Place
     * @colorBorderActive {string} colorBorderActive - This is the colorBorderActive of the Place
     * @opacity {number} opacity - This is the opacity of the Place
     * @opacityActive {number} opacityActive - This is the opacityActive of the Place
     */
  export interface ColorPlace {
    colorBG?: string
    colorBorder?: string
    colorBGActive?: string
    colorBorderActive?: string
    opacity?: number
    opacityActive?: number
  }

  /**
   * @description
   * This is the description of the interface @StyleTextSVG
   * @fontFamily {string} fontFamily - This is the fontFamily of the SVG
   * @fontSize {string} fontSize - This is the fontSize of the SVG
   * @fontWeight {string} fontWeight - This is the fontWeight of the SVG
   * @fontStyle {string} fontStyle - This is the fontStyle of the SVG
   * @textDecoration {string} textDecoration - This is the textDecoration of the SVG
   * @textAnchor {string} textAnchor - This is the textAnchor of the SVG
   * @fill {string} fill - This is the fill of the SVG
   * @stroke {string} stroke - This is the stroke of the SVG
   * @strokeWidth {string} strokeWidth - This is the strokeWidth of the SVG
   */
  export interface StyleTextSVG {
    fontFamily?: string
    fontSize?: string
    fontWeight?: string
    fontStyle?: string
    textDecoration?: string
    textAnchor?: string
    fill?: string
    stroke?: string
    strokeWidth?: string
  }
  /**
   * @description
   * This is the description of the interface @Point2D
   * @x {number} x - This is the x of the Point2D
   * @y {number} y - This is the y of the Point2D
   * 
   * */
  export interface Point2D {
    x: number
    y: number
  }