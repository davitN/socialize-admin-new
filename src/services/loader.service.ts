import GlobalLoader from "../components/shared/GlobalLoader";

let loaderRef: GlobalLoader | null;
export function setLoaderRef(ref: GlobalLoader | null):void {
  loaderRef = ref;
}
export const startLoader = ():void => {
  (loaderRef as GlobalLoader).start();
};
export const stopLoader = ():void => (loaderRef as GlobalLoader).stop();
