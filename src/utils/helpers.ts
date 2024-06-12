import chalk from "chalk";

export function logSuccess(msg: string): void {
    console.log(chalk.bgHex('#006400').white(msg));
}

export function logFailure(msg: string): void {
    console.error(chalk.bgHex('#FF0000').white(`❌[server]: An error occurred: ${msg}`));
}

export function logDebug(msg: string): void {
    console.error(chalk.bgHex('#FF0000').white(`🐛[DEBUG]: ${msg}`));
}

// type V1ResponseType<T = any> = {
//     message: string,
//     data: T,
//     error: boolean,
//     time: string,
//     timeTakenForAPI: string
// }

// type BuildResponseFn<K = any> = (message: string, payload: K, error: boolean) => V1ResponseType<K>
 
// export const buildResponse: BuildResponseFn = (message: string, payload = null, error = true): V1ResponseType => {
//     const res = {
//       message,
//       data: payload,
//       error,
//       time: new Date().toISOString(),
//       timeTakenForAPI: 'none'
//     };
//     console.log(res);
//     return res;
//   };
  
//  export  const success = (message = "Success!", payload = null) => {
//     return buildResponse(message, payload, false);
//   };
  
//  export  const fail = (message: string, payload = null) => {
//     return buildResponse(`Failed: ${message}`, payload, true);
//   };