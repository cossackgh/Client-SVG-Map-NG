export function logger(isShow: boolean = false, message: string, value: any = null) {
   if(isShow) console.log(`%c${message}`, 'color: #0df; font-size: 12px', value);
    };
export function loggerTable(isShow: boolean = false, message: string, value: any = null) {
   if(isShow) {
    console.log(`%c${message}`, 'color: #0df; font-size: 12px');
    console.table(value);
}
    };
export default logger;
// Path: src/logger.ts