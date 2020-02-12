import React from "react";
import { CSSTransition } from "react-transition-group";
import { HeaderLayout } from "./HeaderLayout";
import { Menu } from "./Menu";
import "./style.css";

export class HeaderMobile extends React.Component {
  menuContainerRef = React.createRef();
  initialPaddingTop = 0;
  currentPadding = 0;
  speedCheckInterval = 25; // ms
  sensitivity = 12; // pixels moved for speedCheckInterval

  state = {
    pagesListVisible: false,
    touchMoved: false,
  };

  get menu() {
    return this.menuContainerRef.current;
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      if (this.state.pagesListVisible) {
        this._removePagesListElem();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024)
        this.hidePagesList()
    });
  }

  render() {
    return (
      <nav className="block lg:hidden">
        <HeaderLayout onClick={this.togglePagesList}/>

        <CSSTransition in={this.state.pagesListVisible} unmountOnExit={true} timeout={300}
                       classNames="header__mobile-menu-bg">
          <div className="opacity-25 bg-black fixed w-full h-full z-30 bottom-0" onClick={this.hidePagesList}/>
        </CSSTransition>

        <div ref={this.menuContainerRef}
             style={{maxHeight: 'calc(100vh - 4rem)'}}
             onClick={this.handleMenuContainerClick}
             className={`header__mobile-menu-container fixed justify-center items-center w-full z-30 bottom-0 mb-16 overflow-auto ${this.state.touchMoved ? 'nohover' : ''}`}>

          <CSSTransition in={this.state.pagesListVisible} unmountOnExit={true} timeout={350}
                         classNames="header__mobile-menu"
                         onEntering={() => this.menu.style.overflow = 'hidden'}
                         onExiting={() => this.menu.style.overflow = 'hidden'}
                         onEntered={() => this.menu.style.overflow = null}
                         onExited={() => this.menu.style.overflow = null}>
            <Menu/>
          </CSSTransition>
        </div>
      </nav>
    )
  }

  togglePagesList = () => {
    if (this.state.pagesListVisible) {
      this.hidePagesList();
    } else {
      this.showPagesList();
    }
  };

  hidePagesList = () => {
    // on too much clicks pushState didn't called
    if (this.useOrNotBack) {
      window.history.back();
      this.useOrNotBack = false;
    }
  };

  _removePagesListElem = () => {
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEndOrCancel);
    document.removeEventListener('touchcancel', this.handleTouchEndOrCancel);

    this.menu.style.transition = null;
    document.body.classList.remove('mobile-header-opened');

    window.scrollTo(0, parseInt(document.body.style.top || '0') * -1);
    document.body.style.top = null;

    this.setState({pagesListVisible: false});
  };

  showPagesList = () => {
    this.useOrNotBack = true;
    window.history.pushState(null, null, window.location.href);

    this.setState({pagesListVisible: true});
    const scrollTop = window.pageYOffset;

    this.menu.style.transform = null;
    document.body.classList.add('mobile-header-opened');
    document.body.style.top = `-${scrollTop}px`;

    document.addEventListener('touchstart', this.handleTouchStart);
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEndOrCancel);
    document.addEventListener('touchcancel', this.handleTouchEndOrCancel);
  };

  handleTouchStart = ev => {
    this.initialPaddingTop = ev.changedTouches[0].screenY;
    this.menu.style.transition = null;
    document.body.style.overscrollBehavior = 'none';

    this.previousTime = Date.now();
    this.moveOnSwipe = this.menu.scrollTop === 0;
  };

  handleTouchMove = ev => {
    if (!this.moveOnSwipe) {
      return;
    }

    if (Date.now() - this.previousTime > this.speedCheckInterval) {
      this.previousTime = Date.now();
      this.previousPadding = this.currentPadding;
    }

    this.currentPadding = ev.changedTouches[0].screenY - this.initialPaddingTop;
    this.menu.style.transform = `translate3d(0, ${this.currentPadding >= 0 ? this.currentPadding : 0}px, 0)`;

    if (!this.state.touchMoved && this.currentPadding) {
      this.setState({touchMoved: true});
    }
  };

  handleTouchEndOrCancel = () => {
    document.body.style.overscrollBehavior = null;
    if (!this.moveOnSwipe) {
      return;
    }

    this.menu.style.transition = '.2s';
    const containerHeight = this.menu.clientHeight;

    // if fast swipe or menu moved more than
    if ((this.currentPadding > 0 && this.currentPadding - this.previousPadding > this.sensitivity) ||
      this.currentPadding / containerHeight * 100 > 50) {

      this.menu.style.transform = `translate3d(0, ${containerHeight}px, 0)`;

      // timeout used instead ontransitionend for case if back button will be pressed
      setTimeout(() => {
        if (this.state.pagesListVisible) {
          this.hidePagesList();
        }
      }, 200)

    } else {
      this.menu.style.transform = null;
    }

    this.currentPadding = 0;
    if (this.state.touchMoved) {
      this.setState({touchMoved: false});
    }
  };

  handleMenuContainerClick = e => {
    if (e.target === this.menu) {
      this.hidePagesList();
    }
  }
}
