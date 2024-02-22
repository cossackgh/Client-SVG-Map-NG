import { readSVG, ClientSVGEditorNG } from './index';
import { expect, test } from 'vitest';
import { JSDOM } from 'jsdom'
import {dataShops2} from '../demo/js/dataitems.ts';

test('readSVG should return the SVG content', () => {
    const svgContent = '<svg>...</svg>';
    const result = readSVG(svgContent);
    expect(result).toBe(svgContent);
});
test('Create JSDOM correctly', () => {
    const dom = new JSDOM()
    global.document = dom.window.document
    //global.window = dom.window
  
    // Your test code here...
  })
test('create HTMLElement', () => {
    const dom = new JSDOM()
    global.document = dom.window.document
    //global.window = dom.window
    const element = global.document.createElement('div')
    element.textContent = 'Hello, World!'
    
    // Now you can perform assertions on the element
    // For example, check if the text content is correct
    expect(element.textContent).toBe('Hello, World!')
  })

test('ClientSVGEditorNG should initialize correctly', () => {
    const dom = new JSDOM()
    global.document = dom.window.document
    //global.window = dom.window
    const balloon = global.document.createElement('div');
    balloon.id = 'map';
    balloon.style.position = 'fixed';
    document.body.appendChild(balloon)
    const getSvgNode = global.document.getElementById('map') as HTMLElement;
    const MapTheme = {
        colorBG: '#fff',
        colorItem: {
          colorBG: '#222',
          colorBorder: '#000',
          colorBGActive: '#f22',
          colorBorderActive: '#000',
          opacity: 0.1,
          opacityActive: 0.7
        },
        borderItem: {
          isBorder: true,
          widthBorder: 3
        },
      }
    function gotoURLClick(dataelement: any) {
        console.log('gotoURLClick element = ', dataelement)
        //const geturl = dataelement.getAttribute('data-url')

        window.open(dataelement.slug, '_self')
      }
    const editor = new ClientSVGEditorNG(
        getSvgNode, 
        '../demo/assets/images/vite.svg', 
        dataShops2,          
        {
            title: 'TITLE MAP',
            colorBG: "#fff",
            idInteractiveLayer: 'interactive',
            isRemoveUnuseItem: false,
            isHoverEnable: true,
            funcClick: gotoURLClick,
            funcParams: 'https://www.google.com',
            mapTheme: MapTheme,
            isCustomBalloon: false,
        } 
    );
    expect(editor).toBeDefined();
    // Add more assertions to test the initialization of the editor
});
