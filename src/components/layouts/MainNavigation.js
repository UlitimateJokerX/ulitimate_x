// Router
import { Container } from 'react-bootstrap'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { menuItems } from './MenuItems'

function Dropdown (menu, index) {
  if (menu.submenu) {
    return <NavDropdown id={index} title={menu.title} key={ImageBitmapRenderingContext}>
      {menu.submenu.map((s, sindex) => (
        <NavDropdown.Item href={s.url} key={`${index}_${sindex}`}>{s.title}</NavDropdown.Item>
      ))}
    </NavDropdown>
  }

  return <Nav.Link href={menu.url} key={index}>{menu.title}</Nav.Link>
}

function MainNavigation () {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand href='/'>Ultimate X</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {menuItems.map((menu, index) => {
                return Dropdown(menu, index)
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default MainNavigation
