import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import CheckIcon from '@mui/icons-material/Check';
import BusinessIcon from '@mui/icons-material/Business';
import TConnectLogo from '../components/TConnectLogo';
import LanguageToggle from '../components/LanguageToggle';
import AppBackground from '../components/AppBackground';
import { useLang } from '../context/LanguageContext';

export default function SuccessPage() {
  const location = useLocation();
  const formData = location.state?.formData;
  const knowsTConnect = location.state?.knowsTConnect;
  const { t } = useLang();

  const [vis, setVis] = React.useState(false);

  React.useEffect(() => { setTimeout(() => setVis(true), 250); }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gwAddress = params.get('gw_address');
    const gwPort = params.get('gw_port');
    const gwId = params.get('gw_id');
    const mac = params.get('mac');

    if (gwAddress && gwPort && gwId) {
      const timer = setTimeout(() => {
        const authUrl = `http://${gwAddress}:${gwPort}/gw_redirect.php?gw_id=${gwId}&mac=${mac || ''}`;
        window.location.href = authUrl;
      }, knowsTConnect === 'no' ? 8000 : 3000);
      return () => clearTimeout(timer);
    }
  }, [knowsTConnect]);

  // MIKROTIK CAPTIVE PORTAL AUTO-UNLOCK
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const routerIp = params.get('router');
    const gwAddress = params.get('gw_address');

    if (routerIp && !gwAddress) {
      const timer = setTimeout(() => {
        window.location.href = `http://${routerIp}/login?username=free&password=free&dst=https://t-connect-free-wifi.vercel.app/enjoy`;
      }, knowsTConnect === 'no' ? 8000 : 3000);
      return () => clearTimeout(timer);
    }
  }, [knowsTConnect]);

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', px: 3, py: 5, overflow: 'hidden', bgcolor: '#000000' }}>
      <AppBackground />

      <Box sx={{ position: 'fixed', top: 16, right: 20, zIndex: 10 }}>
        <LanguageToggle />
      </Box>

      <Fade in={vis} timeout={1000}>
        <Box sx={{ textAlign: 'center', zIndex: 2, maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Zoom in={vis} timeout={1200}>
            <Avatar sx={{ width: 56, height: 56, mb: 2, bgcolor: 'rgba(255,81,0,0.15)', border: '2px solid #FF5100' }}>
              <CheckIcon sx={{ fontSize: 28, color: '#FF5100' }} />
            </Avatar>
          </Zoom>

          <Typography sx={{ color: '#FFFFFF', fontSize: { xs: '1.4rem', sm: '1.8rem' }, fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>{t.success.connected}</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.60)', fontSize: '0.95rem', lineHeight: 1.5, mb: 4 }}>{t.success.authorizing}</Typography>

          {/* Network Details Paper Completely Removed */}

          {knowsTConnect === 'no' && (
            <Fade in={vis} timeout={1500}>
              <Paper elevation={0} sx={{
                width: '100%', mb: 3, p: 3,
                bgcolor: 'rgba(255, 81, 0, 0.05)',
                border: '1px solid rgba(255,81,0,0.15)',
                borderRadius: 3
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <BusinessIcon sx={{ fontSize: 20, color: '#FF5100' }} />
                  <Typography sx={{ fontWeight: 700, color: '#FF5100', fontSize: '0.9rem' }}>{t.success.aboutTConnect}</Typography>
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', lineHeight: 1.7, textAlign: 'left' }}>
                  {t.success.aboutText}
                </Typography>
              </Paper>
            </Fade>
          )}

          <Typography sx={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.5, mb: 1 }}>{t.success.thankYou}</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', lineHeight: 1.6, mb: 4, maxWidth: 300 }}>
            {knowsTConnect === 'no' ? t.success.learnMore : t.success.redirectMsg}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.40)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: 1, lineHeight: 1 }}>T-CONNECT</Typography>
            <TConnectLogo size={20} />
          </Box>
        </Box>
      </Fade>
      <Typography sx={{ position: 'fixed', bottom: 16, right: 20, color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem', zIndex: 2 }}>{t.success.poweredBy}</Typography>
    </Box>
  );
}