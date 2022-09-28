import MainNavigation from './MainNavigation'
import classes from '../../css/Layout.module.css'

function Layout (props) {
  return (
    <div>
      <MainNavigation sessionId={props.sessionId} />
      <main className={classes.main}>{props.children}</main>
    </div>
  )
}

export default Layout
