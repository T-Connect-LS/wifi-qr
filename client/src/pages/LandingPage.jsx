import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import WifiIcon from '@mui/icons-material/Wifi';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TConnectLogo from '../components/TConnectLogo';
import LanguageToggle from '../components/LanguageToggle';
import AppBackground from '../components/AppBackground';
import { useLang } from '../context/LanguageContext';

export default function LandingPage() {
  const [vis, setVis] = React.useState(false);
  const navigate = useNavigate();
  const { t } = useLang();

  React.useEffect(() => { setTimeout(() => setVis(true), 200); }, []);

  return (
    <Box sx={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      px: 3,
      py: 6,
      overflow: 'hidden',
      bgcolor: '#000000'
    }}>
      
      <AppBackground />

      {/* Language Toggle - Top Right */}
      <Box sx={{ position: 'fixed', top: 16, right: 20, zIndex: 10 }}>
        <LanguageToggle />
      </Box>

      {/* Orange glow */}
      <Box sx={{
        position: 'absolute',
        top: '25%', left: '50%', transform: 'translateX(-50%)',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,81,0,0.15) 0%, transparent 65%)',
        filter: 'blur(60px)', zIndex: 1
      }} />

      <Fade in={vis} timeout={1000}>
        <Box sx={{
          textAlign: 'center', zIndex: 2, maxWidth: 400, width: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          {/* Brand Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <TConnectLogo size={36} />
          </Box>

          <Typography sx={{
            color: '#FF5100', fontWeight: 600, fontSize: '0.6rem',
            letterSpacing: 2.5, textTransform: 'uppercase', mb: 5, lineHeight: 1
          }}>
            {t.landing.starlink}
          </Typography>

          {/* WiFi Icon with pulse rings */}
          <Box sx={{
            position: 'relative', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            mb: 5, width: 140, height: 140
          }}>
            {[1, 2, 3].map(i => (
              <Box key={i} sx={{
                position: 'absolute',
                width: 64 + i * 28, height: 64 + i * 28,
                borderRadius: '50%', border: '1px solid',
                borderColor: `rgba(255,81,0,${0.2 / i})`,
                animation: `pulseRing ${2.0 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }} />
            ))}
            <Avatar sx={{
              width: 72, height: 72,
              bgcolor: 'rgba(255,81,0,0.16)',
              border: '1.5px solid rgba(255,81,0,0.30)'
            }}>
              <WifiIcon sx={{ fontSize: 38, color: '#FF5100' }} />
            </Avatar>
          </Box>

          <Typography sx={{
            color: '#FFFFFF', fontSize: { xs: '1.6rem', sm: '2rem' },
            fontWeight: 700, lineHeight: 1.2, mb: 1.5
          }}>
            {t.landing.title}
          </Typography>

          <Typography sx={{
            maxWidth: 300, mx: 'auto', lineHeight: 1.6,
            color: 'rgba(255,255,255,0.70)', fontSize: '0.88rem', mb: 5
          }}>
            {t.landing.subtitle}
          </Typography>

          <Button variant="contained" size="large"
            onClick={() => navigate(`/register${window.location.search}`)}
            endIcon={<ArrowForwardIcon />}
            sx={{
              width: '100%', py: 1.8, fontSize: '1rem', fontWeight: 600,
              borderRadius: 3, background: '#FF5100', color: '#FFFFFF',
              boxShadow: '0 4px 20px rgba(255,81,0,0.30)',
              '&:hover': { background: '#FF6A2A' }
            }}>
            {t.landing.getConnected}
          </Button>

          <Typography sx={{
            mt: 3, color: 'rgba(255,255,255,0.35)',
            fontSize: '0.68rem', lineHeight: 1.5
          }}>
            {t.landing.terms}
          </Typography>
        </Box>
      </Fade>

      <Typography sx={{
        position: 'fixed', bottom: 16, right: 20,
        color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem', zIndex: 2
      }}>
        {t.landing.poweredBy}
      </Typography>
    </Box>
  );
}