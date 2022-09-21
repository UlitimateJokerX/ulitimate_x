// Router
import { Link } from 'react-router-dom';

// CSS Modules
import classes from '../../css/MainNavigation.module.css'

function MainNavigation () {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Ultimate X</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>All Meetups</Link>
          </li>
          <li>
            <Link to='/favorites'>My Favorites</Link>
          </li>
          <li>
            <Link to='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
