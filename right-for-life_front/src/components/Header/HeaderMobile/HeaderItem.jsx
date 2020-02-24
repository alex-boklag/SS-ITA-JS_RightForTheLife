import { NavLink, Redirect } from 'react-router-dom';
import React from 'react';

/*
 Why so complicated code?
 When the page was opened by a link, an error occurred:
 if you open a category, then go back and want to go back,
 you need to double-click the back button to return to the page.
 This code fixes this.

 Why is it so difficult, maybe there is a simple solution?
 If the link has a click listener, it starts before redirecting.
 So, we can add history.back () to onclick, and everything should work. But this is not so.
 The problem is in history.back, it started after the redirect. And this code fixes that.
 */

export const HeaderItem = ({ to, title, color }) => {
  const [redirect, setRedirect] = React.useState(false);

  return redirect ? (
    <Redirect push to={to} />
  ) : (
    <NavLink
      exact
      className="header__mobile-menu__item flex justify-center py-2 cursor-pointer w-full hover:bg-gray-300 hover:text-gray-700"
      to={to}
      activeClassName="text-gray-700"
      onClick={e => {
        e.preventDefault();

        window.addEventListener(
          'popstate',
          () => {
            setRedirect(true);
            setTimeout(() => window.scrollTo(0, 0));
          },
          { once: true },
        );

        window.history.back();
      }}
    >
      <div
        className={
          color
            ? `header__mobile-menu__item text-${color}-700 bg-${color}-200 py-1 px-3 rounded-lg hover:bg-${color}-300 hover:text-${color}-800 hover-header-item:bg-${color} hover-header-item:text-${color}`
            : 'my-1 cursor-pointer'
        }
      >
        {title}
      </div>
    </NavLink>
  );
};
