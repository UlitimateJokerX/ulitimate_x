// Router
import { Container } from 'react-bootstrap'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { menuItems } from './MenuItems'

/**
 * 下拉式選單
 */
function Dropdown (menu, index) {
  if (menu.submenu) {
    return <NavDropdown id={index} title={menu.title} key={index}>
      {menu.submenu.map((s, sindex) => (
        <NavDropdown.Item href={s.url} key={`${index}_${sindex}`}>{s.title}</NavDropdown.Item>
      ))}
    </NavDropdown>
  }

  return <Nav.Link href={menu.url} key={index}>{menu.title}</Nav.Link>
}

/**
 * 功能列表
 */
function MainNavigation (props) {
  const sessionId = props.sessionId

  if (!sessionId) {
    return (
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand href='/'>Ultimate X</Navbar.Brand>
        </Container>
      </Navbar>
    )
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='/'>Ultimate X</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {menuItems.map((menu, index) => {
              // 不用顯示首頁選單
              if (index === 0) {
                return
              }

              return Dropdown(menu, index)
            })}
          </Nav>
          <Nav className='ml-auto'>
            <Navbar.Text>Hello!{sessionId}</Navbar.Text>
            <Nav.Link href='/logout'>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNavigation
