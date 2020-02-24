/** Quick start:
 * <BackBtn/><ShareBtn/>
 *
 * Usage:
 *
 * back button:
 * <BackBtn />
 * props:
 * position="[absolute position in TailwindCSS; if unset "left-0 ml-2 mt-2" used]"
 *
 * share button:
 * <ShareBtn />
 * props:
 * position="[absolute position in TailwindCSS; if unset "right-0 mr-2 mt-2" used]"
 * shareUrl="[url to share; if unset current url used]"
 *
 * base:
 * <FloatingBtn />
 * props:
 * icon="[icon code from font awesome; e.g. "share-alt"]"
 * position="[absolute position in TailwindCSS; if unset "left-0 ml-2 mt-2" used]"
 * url="[link which will be opened after click on button; e.g. "/animals"]"
 * onClick={[function]} if set url ignored
 * content=[react node, e.g. <div>123</div>,]
 * visible={boolean} required for exit animation
 * */

export { FloatingBtn } from './FloatingBtn';
export { BackBtn } from './BackBtn';
export { ShareBtn } from './ShareBtn';
