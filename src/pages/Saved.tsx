import React from 'react'
import Layout from '../components/Layout'
import PhotoList from '../components/PhotoList'
import styled from 'styled-components'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { englishLocale, russianLocale } from '../theme/locales'

import { useCookies } from 'react-cookie'

const Title = styled.h1`
    color: ${(props) => props.theme.text};
`

const Saved: React.FC = () => {
    const { language } = useTypedSelector((state) => state.settings)
    const locale = language === 'en' ? englishLocale : russianLocale
    const [cookies] = useCookies(['savedPhotos'])
    return (
        <Layout>
            <Title>{locale.savedTitle}</Title>
            <PhotoList isSavedPage />
        </Layout>
    )
}

export default Saved
