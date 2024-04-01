import React, {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { Link } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import SiteIcon from '../assets/images/Panda.svg'
import BackgroundPng from '../assets/images/background.png'
import { useActions } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { lightTheme, darkTheme } from '../theme/theme'
import { englishLocale, russianLocale } from '../theme/locales'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MdMenu } from 'react-icons/md'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: cursive, sans-serif;
    background-color: ${props => props.theme.body};
  }

  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${BackgroundPng});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 180px 90px;
    z-index: -1;
    opacity: 0.3;
    @media screen and (max-width: 540px) {
        background-position: 0 90px;
    }
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
	width: 100%;
	z-index: 1000;
	@media screen and (max-width: 1920px) {
		padding: 15px;
	}
	@media screen and (max-width: 540px) {
		flex-wrap: wrap;
	}
`
const MenuButton = styled.button`
	display: none;
	background: none;
	border: none;
	color: ${props => props.theme.headerText};
	font-size: 24px;
	margin-right: 30px;
	cursor: pointer;
	@media screen and (max-width: 540px) {
		margin-top: 15px;
		display: block;
	}
`
const IconPanda = styled(LazyLoadImage)`
	width: 50px;
	margin-right: 10px;
`
const Title = styled.h1`
	margin: 0;
	@media screen and (max-width: 1920px) {
		font-size: 36px;
	}
`

const Sidebar = styled.nav`
	width: 180px;
	background-color: ${props => props.theme.headerBackground};
	transition: background-color 0.3s ease;
	position: fixed;
	top: 0;
	bottom: 0;
	margin-top: 70px;
	z-index: 100;
	@media screen and (max-width: 540px) {
		display: none;
		margin-top: 190px;
	}
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
	margin-top: 60px;
	margin-left: 200px;
	padding: 20px;
	@media screen and (max-width: 540px) {
		margin-left: 0px;
		margin-top: 150px;
	}
`

const SearchInput = styled.input`
	flex: 1;
	padding: 8px;
	border-radius: 4px;
	font-size: 16px;
	border: ${props => props.theme.border};
	background-color: ${props => props.theme.body};
	color: ${props => props.theme.text};
	transition: 0.3s ease;
	margin: auto;
	max-width: 700px;
	width: 60%;
	@media screen and (max-width: 1150px) {
		width: 95%;
		margin-left: 20px;
	}
	@media screen and (max-width: 768px) {
		width: 90%;
		margin-left: 20px;
	}
	@media screen and (max-width: 540px) {
		width: 95%;
		margin-left: 20px;
		flex: 0 80%;
		margin-right: 10px;
		margin-top: 10px;
	}
`

const ThemeButton = styled.button`
	background-color: ${props => props.theme.buttonBackground};
	color: ${props => props.theme.buttonColor};
	transition: background-color 0.3s ease;
	border: none;
	cursor: pointer;

	@media screen and (max-width: 540px) {
		margin-top: 10px;
		margin-left: auto;
	}
`

const LanguageButton = styled.button`
	background-color: ${props => props.theme.buttonBackground};
	color: ${props => props.theme.buttonColor};
	transition: background-color 0.3s ease;
	border: none;
	cursor: pointer;
	margin-left: 10px;
	margin-right: 30px;
	@media screen and (max-width: 540px) {
		margin-top: 10px;
		margin-left: auto;
	}
`
interface LayoutProps {
	children: ReactNode
}

const Layout: React.FC<LayoutProps> = React.memo(({ children }) => {
	const { setSearchTerm, changeTheme, changeLanguage } = useActions()
	const { theme, language } = useTypedSelector(state => state.settings)

	const [searchTerm, setSearchTermLocal] = useState('')
	const [showSidebar, setShowSidebar] = useState(window.innerWidth > 540)

	const handleSearchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target
			setSearchTerm(value)
			setSearchTermLocal(value)
		},
		[setSearchTerm]
	)

	const toggleTheme = useCallback(() => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		changeTheme(newTheme)
	}, [theme, changeTheme])

	const toggleLanguage = useCallback(() => {
		const newLanguage = language === 'en' ? 'ru' : 'en'
		changeLanguage(newLanguage)
	}, [language, changeLanguage])

	const locale = useMemo(
		() => (language === 'en' ? englishLocale : russianLocale),
		[language]
	)

	const toggleSidebar = useCallback(() => {
		setShowSidebar(prevState => !prevState)
	}, [])

	useEffect(() => {
		const handleResize = () => {
			setShowSidebar(window.innerWidth > 540)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<>
				<GlobalStyle />
				<Header>
					<IconPanda src={SiteIcon} alt='Panda Icon' effect='blur'></IconPanda>
					<Title>{locale.headerTitle}</Title>
					<SearchInput
						type='text'
						placeholder={locale.searchPlaceholder}
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<MenuButton onClick={toggleSidebar}>
						<MdMenu />
					</MenuButton>
					<ThemeButton onClick={toggleTheme}>
						{theme === 'light' ? 'Dark' : 'Light'} Theme
					</ThemeButton>
					<LanguageButton onClick={toggleLanguage}>
						{language === 'en' ? 'Русский' : 'English'}
					</LanguageButton>
				</Header>
				<Sidebar style={{ display: showSidebar ? 'block' : 'none' }}>
					<Navigation>
						<NavLink to='/photos'>{locale.mainNavHome}</NavLink>
						<NavLink to='/favorites'>{locale.mainNavFavorites}</NavLink>
					</Navigation>
				</Sidebar>
				<Content>{children}</Content>
			</>
		</ThemeProvider>
	)
})

export default Layout
