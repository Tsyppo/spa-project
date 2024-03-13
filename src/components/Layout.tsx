import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import SiteIcon from '../assets/images/Panda.svg'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: cursive, sans-serif;
    background-color: #f2f2f2;
  }
`

const Header = styled.header`
	background-color: #333;
	color: #fff;
	padding: 20px;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
`

const IconPanda = styled.img`
	width: 40px;
	margin-right: 10px;
`

const Title = styled.h1`
	margin: 0;
`

const Sidebar = styled.nav`
	width: 150px;
	background-color: #333;
	color: #fff;
	position: fixed;
	top: 80px;
	bottom: 0;
`

const Navigation = styled.nav`
	display: flex;
	flex-direction: column;
	padding: 20px;
`

const NavLink = styled(Link)`
	text-decoration: none;
	color: #fff;
	font-weight: bold;
	padding: 10px;
	border-radius: 5px;
	transition: background-color 0.3s ease;
	font-size: 20px;
	&:hover {
		background-color: #555;
	}
`

const Content = styled.main`
	margin-top: 80px;
	margin-left: 250px; /* Ширина боковой панели */
	padding: 20px;
`

interface LayoutProps {
	children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<GlobalStyle />
			<Header>
				<IconPanda src={SiteIcon} />
				<Title>Галерея</Title>
			</Header>
			<Sidebar>
				<Navigation>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='/favorites'>Favorites</NavLink>
				</Navigation>
			</Sidebar>
			<Content>{children}</Content>
		</>
	)
}

export default Layout
