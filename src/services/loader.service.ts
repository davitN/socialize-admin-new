import GlobalLoader from "../components/shared/GlobalLoader";

let loaderRef: GlobalLoader | null;
export function setLoaderRef(ref: GlobalLoader | null) {
  loaderRef = ref;
}
export const startLoader = () => {
  (loaderRef as GlobalLoader).start();
};
export const stopLoader = () => (loaderRef as GlobalLoader).stop();
