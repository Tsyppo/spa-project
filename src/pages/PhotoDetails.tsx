import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { usePhoto } from '../hooks/usePhoto'
import Layout from '../components/Layout'

const Container = styled.div`
	display: flex;
	align-items: flex-start;
`

const Image = styled.img`
	width: auto;
	height: auto;
	margin-right: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const DetailsContainer = styled.div`
	flex: 1;
`

const Title = styled.h2`
	margin-bottom: 10px;
	font-size: 24px;
	color: #333;
`

const Description = styled.p`
	margin-top: 0;
	font-size: 16px;
	color: #666;
`

const PhotoDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const photo = usePhoto(parseInt(id!))

	if (!photo) {
		return (
			<Layout>
				<div>Loading...</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<h1>Photo Details</h1>
			<Container>
				<Image src={photo.imageUrl} alt={photo.title} />
				<DetailsContainer>
					<Title>{photo.title}</Title>
					<Description>{photo.description}</Description>
				</DetailsContainer>
			</Container>
		</Layout>
	)
}

export default PhotoDetails
