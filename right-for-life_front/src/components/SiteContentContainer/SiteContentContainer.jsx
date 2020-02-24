import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUrlForBackBtn } from './setUrlForBackBtn';

class SiteContentContainer extends React.Component {
  backOrForwardUsed = false;

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { setUrlForBackBtn, location, urlForBackBtn } = this.props;

    // if first start app in this tab
    if (!window.name) {
      window.name = String(Date.now());
    }

    // if page reloaded
    if (
      window.history.length < 50 &&
      window.history.length ===
        Number(sessionStorage.getItem(`backBtn${window.name}`))
    ) {
      setUrlForBackBtn(null);
    } else {
      const categoryUrl = location.pathname.match(/\/[a-z]+/);
      setUrlForBackBtn(categoryUrl ? categoryUrl[0] : '/');
    }

    window.addEventListener('beforeunload', () => {
      if (urlForBackBtn === null) {
        sessionStorage.setItem(
          `backBtn${window.name}`,
          String(window.history.length),
        );
      }
    });

    window.addEventListener('popstate', () => {
      this.backOrForwardUsed = true;
    });
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line no-shadow
    const { location, setUrlForBackBtn } = this.props;

    // setTimeout used to start after popstate event
    setTimeout(() => {
      // first 'if' used to prevent unnecessary use of store
      if (location.pathname !== prevProps.location.pathname) {
        if (this.backOrForwardUsed) {
          setUrlForBackBtn(
            prevProps.location.pathname + prevProps.location.search,
          );
        } else {
          setUrlForBackBtn(null);
        }
      }

      this.backOrForwardUsed = false;
    });
  }

  render() {
    const { children } = this.props;

    return (
      <main className="container mx-auto flex-grow flex-shrink-0 overflow-x-hidden  pt-6 lg:pt-24 px-3">
        {children}
      </main>
    );
  }
}

const withConnect = connect(
  state => ({
    urlForBackBtn: state.urlForBackBtn,
  }),
  {
    setUrlForBackBtn,
  },
)(withRouter(props => <SiteContentContainer {...props} />));

export { withConnect as SiteContentContainer };
