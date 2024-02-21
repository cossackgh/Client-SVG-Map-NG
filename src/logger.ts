export function logger(isShow: boolean = false, message: string, value: any = null) {
   if(isShow) console.log(`%c${message}`, 'color: #0df; font-size: 12px', value);
    };
// Path: src/logger.ts