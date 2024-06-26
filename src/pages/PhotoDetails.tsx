import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { usePhoto } from '../hooks/usePhoto'
import Layout from '../components/Layout'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { englishLocale, russianLocale } from '../theme/locales'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    @media screen and (max-width: 1100px) {
        flex-wrap: wrap;
    }
`

const Image = styled(LazyLoadImage)`
    max-width: 800px;
    max-height: 800px;
    margin-right: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    @media screen and (max-width: 1030px) {
        max-width: 600px;
        max-height: 600px;
    }
    @media screen and (max-width: 830px) {
        max-width: 500px;
        max-height: 500px;
    }
    @media screen and (max-width: 730px) {
        max-width: 400px;
        max-height: 400px;
    }
    @media screen and (max-width: 630px) {
        max-width: 300px;
        max-height: 300px;
    }
    @media screen and (max-width: 340px) {
        max-width: 300px;
        max-height: 300px;
    }
`

const DetailsContainer = styled.div`
    flex: 1;
`

const TitlePhoto = styled.h2`
    margin-bottom: 10px;
    font-size: 24px;
    color: ${(props) => props.theme.text};
`

const Description = styled.p`
    margin-top: 0;
    font-size: 16px;
    color: ${(props) => props.theme.text};
`
const Title = styled.h1`
    color: ${(props) => props.theme.text};
`

const PhotoDetails: React.FC = () => {
    const { language } = useTypedSelector((state) => state.settings)
    const locale = language === 'en' ? englishLocale : russianLocale

    const { id } = useParams<{ id: string }>()
    const photo = usePhoto(id!)

    if (!photo) {
        return (
            <Layout>
                <div>Загрузка...</div>
            </Layout>
        )
    }

    return (
        <Layout>
            <Title>{locale.detailTitle}</Title>
            <Container>
                <Image src={photo.imageUrl} alt={photo.title} />
                <DetailsContainer>
                    <TitlePhoto>{photo.title}</TitlePhoto>
                    <Description>{photo.description}</Description>
                </DetailsContainer>
            </Container>
        </Layout>
    )
}

export default PhotoDetails
