import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: '/static/themes/donAndSons/AF1QipMh2dqDlWaLXlKpPWLdlmOHteGxp5YO-_Qd0Yqz=s544-k-no.jfif',
    title: 'Snorkeling',
    width: '40%',
  },
  {
    url: '/static/themes/donAndSons/AF1QipN7gJkYiJ16BccZlqFhLhDZ8fVSKYNnhQYgbdHs=s580-k-no.jfif',
    title: 'Massage',
    width: '20%',
  },
  {
    url: '/static/themes/donAndSons/AF1QipO1n3dS_cZN4QA-8mPRbjJ7B-gCP8VaswAE_R9y=s508-k-no.jfif',
    title: 'Hiking',
    width: '40%',
  },
  {
    url: '/static/themes/donAndSons/AF1QipOUp3QEroTgGMb2rXQkuN3n5iJC-zGiWbnXy8MW=s510-k-no.jfif',
    title: 'Tour',
    width: '38%',
  },
  {
    url: '/static/themes/donAndSons/AF1QipPEcZBxYOH2SFTgY9BdfNboJPdMFx5Veiy85ZGX=s510-k-no.jfif',
    title: 'Gastronomy',
    width: '38%',
  },
  {
    url: '/static/themes/donAndSons/AF1QipPLbPvJa0fMmVgVVj7C2A24NNMOurAP-kzQVq7o=s635-k-no.jfif',
    title: 'Shopping',
    width: '24%',
  },
  {
    url: '/static/themes/donAndSons/AF1QipPKa9O6zsoR5wWizb57QvTlDngxH6L3wTFB2Cy5=s846-k-no.jfif',
    title: 'Walking',
    width: '40%',
  },
  {
    url: '/static/themes/donAndSons/AF1QipPcIyaqC7JyH6jIztrp-HOOeictgC-Ayv77wa4=s579-k-no.jfif',
    title: 'Fitness',
    width: '20%',
  },
  {
    url: '/static/themes/donAndSons/AF1QipOsKIIjQ_lQQm2_b5tqG4REOsxTAT8IFj4ZBkUp=s544-k-no.jfif',
    title: 'Reading',
    width: '40%',
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}