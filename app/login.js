// // pages/login.js
// import React from 'react';
// import { Container, Box, Typography, Button } from '@mui/material';
// import { signInWithGoogle } from '../firebase';

// const LoginPage = () => {
//   return (
//     <Container 
//       maxWidth={false} 
//       disableGutters 
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         bgcolor: '#4a90e2', // Change this to any color you like
//       }}
//     >
//       <Box 
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           p: 4,
//           bgcolor: 'white',
//           borderRadius: 2,
//           boxShadow: 1,
//         }}
//       >
//         <Typography variant="h4" component="h1" gutterBottom>
//           Login
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={signInWithGoogle}
//           sx={{ mt: 2 }}
//         >
//           Sign in with Google
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default LoginPage;

'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f5f5f5"
        padding={3}
      >
        <Typography variant="h4" marginBottom={3}>
          Login
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoogleSignIn}>
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
