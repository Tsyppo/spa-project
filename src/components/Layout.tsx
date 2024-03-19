import React, { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import SiteIcon from '../assets/images/Panda.svg'
import { useActions } from '../hooks/useAction'

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
	margin-left: 250px;
	padding: 20px;
`

const SearchInput = styled.input`
	flex: 0 0 auto;
	padding: 8px;
	margin-right: 10px;
	margin-left: 400px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
	width: 700px;
`

interface LayoutProps {
	children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { setSearchTerm } = useActions()
	const [searchTerm, setSearchTermLocal] = useState('')

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		setSearchTerm(value)
		setSearchTermLocal(value)
	}

	return (
		<>
			<GlobalStyle />
			<Header>
				<IconPanda src={SiteIcon} />
				<Title>Галерея</Title>
				<SearchInput
					type='text'
					placeholder='Поиск по названию...'
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</Header>
			<Sidebar>
				<Navigation>
					<NavLink to='/photos'>Home</NavLink>
					<NavLink to='/favorites'>Favorites</NavLink>
				</Navigation>
			</Sidebar>
			<Content>{children}</Content>
		</>
	)
}

export default Layout
