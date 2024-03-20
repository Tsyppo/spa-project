import React, { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import SiteIcon from '../assets/images/Panda.svg'
import { useActions } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { lightTheme, darkTheme } from '../theme/theme'
import { englishLocale, russianLocale } from '../theme/locales'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: cursive, sans-serif;
    background-color: ${props => props.theme.body};
  }
`

const Header = styled.header`
	background-color: ${props => props.theme.headerBackground};
	color: ${props => props.theme.headerText};
	transition: background-color 0.3s ease;
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
	width: 10%;
	background-color: ${props => props.theme.headerBackground};
	transition: background-color 0.3s ease;
	position: fixed;
	top: 84px;
	bottom: 0;
`

const Navigation = styled.nav`
	display: flex;
	flex-direction: column;
	padding: 20px;
`

const NavLink = styled(Link)`
	text-decoration: none;
	color: ${props => props.theme.headerText};
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
	margin-left: 600px;
	border-radius: 4px;
	font-size: 16px;
	width: 700px;
	position: fixed;
	border: ${props => props.theme.border};
	background-color: ${props => props.theme.body};
	color: ${props => props.theme.text};
	transition: 0.3s ease;
`

const ThemeButton = styled.button`
	background-color: ${props => props.theme.buttonBackground};
	color: ${props => props.theme.buttonColor};
	border: none;
	cursor: pointer;
	right: 170px;
	position: fixed;
`

const LanguageButton = styled.button`
	background-color: ${props => props.theme.buttonBackground};
	color: ${props => props.theme.buttonColor};
	border: none;
	position: fixed;
	right: 100px;
	cursor: pointer;
`

interface LayoutProps {
	children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { setSearchTerm, changeTheme, changeLanguage } = useActions()
	const { theme, language } = useTypedSelector(state => state.settings)

	const [searchTerm, setSearchTermLocal] = useState('')

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		setSearchTerm(value)
		setSearchTermLocal(value)
	}

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		changeTheme(newTheme)
	}

	const toggleLanguage = () => {
		const newLanguage = language === 'en' ? 'ru' : 'en'
		changeLanguage(newLanguage)
	}
	const locale = language === 'en' ? englishLocale : russianLocale
	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<>
				<GlobalStyle />
				<Header>
					<IconPanda src={SiteIcon} />
					<Title>{locale.headerTitle}</Title>
					<SearchInput
						type='text'
						placeholder={locale.searchPlaceholder}
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<ThemeButton onClick={toggleTheme}>
						{theme === 'light' ? 'Dark' : 'Light'} Theme
					</ThemeButton>
					<LanguageButton onClick={toggleLanguage}>
						{language === 'en' ? 'Русский' : 'English'}
					</LanguageButton>
				</Header>
				<Sidebar>
					<Navigation>
						<NavLink to='/photos'>{locale.mainNavHome}</NavLink>
						<NavLink to='/favorites'>{locale.mainNavFavorites}</NavLink>
					</Navigation>
				</Sidebar>
				<Content>{children}</Content>
			</>
		</ThemeProvider>
	)
}

export default Layout
