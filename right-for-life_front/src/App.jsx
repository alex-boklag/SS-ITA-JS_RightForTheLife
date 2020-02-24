import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorIndicator } from './components/ErrorIndicator';
import { SiteContentContainer } from './components/SiteContentContainer';
import { HomePage } from './containers/HomePage';
import { AnimalsPage } from './containers/AnimalsPage';
import { AnimalDetailsPage } from './containers/AnimalDetailsPage';
import { NewsListPage } from './containers/NewsListPage';
import { NewsPage } from './containers/NewsPage';
import { HappyStoriesPage } from './containers/HappyStoriesPage';
import { DonatePage } from './containers/DonatePage';
import { HappyStoryPage } from './containers/HappyStoryPage';
import { AboutPage } from './containers/AboutPage';
import { EmergencyHelpPage } from './containers/EmergencyHelpPage';
import { SingleEmergencyHelpPage } from './containers/SingleEmergencyHelpPage';
import { ScrollToTop } from './components/ScrollToTop';
import { LoginPage } from './containers/LoginPage';
import { ReportsPage } from './containers/ReportsPage';
import { ReportPage } from './containers/ReportPage/ReportPage';
import { GalleryLayout } from './containers/AnimalDetailsPage/Card/Gallery';

function App({ store }) {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Header />
        <SiteContentContainer>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/animals" component={AnimalsPage} />
            <Route exact path="/animals/:id" component={AnimalDetailsPage} />
            <Route exact path="/animals/new" component={AnimalDetailsPage} />
            <Route exact path="/news" component={NewsListPage} />
            <Route exact path="/news/:id" component={NewsPage} />
            <Route exact path="/news/new" component={NewsPage} />
            <Route exact path="/reports" component={ReportsPage} />
            <Route exact path="/reports/:id" component={ReportPage} />
            <Route exact path="/stories" component={HappyStoriesPage} />
            <Route exact path="/stories/:id" component={HappyStoryPage} />
            <Route exact path="/help" component={DonatePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/emergencies" component={EmergencyHelpPage} />
            <Route
              exact
              path="/emergencies/:id"
              component={SingleEmergencyHelpPage}
            />
            <Route
              exact
              path="/emergencies/new"
              component={SingleEmergencyHelpPage}
            />
            <Route exact path="/admin" component={LoginPage} />
            <Route
              render={() => (
                <ErrorIndicator
                  message="Страница не найдена :("
                  renderAction={() => <Link to="/">Вернуться на главную</Link>}
                />
              )}
            />
          </Switch>
        </SiteContentContainer>
        <Footer />
      </Router>

      <GalleryLayout />
    </Provider>
  );
}

export default App;
