import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { useAuth } from 'src/context/AuthContext';
import axiosInstance from 'src/api/axios';
import { useFormik } from 'formik';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();
  const { login } = useAuth();

  const { values, isSubmitting, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await axiosInstance.post('/auth/login', { ...values, type: 'partner' });

        if (res.data.data) {
          console.log('log;', res.data);
          login(res.data?.data?.accessToken);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Welcome to examly partner
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <TextField
            fullWidth
            name="email"
            label="Email address"
            onChange={handleChange}
            value={values.email}
            sx={{ mb: 3 }}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            onChange={handleChange}
            value={values.password}
            type={showPassword ? 'text' : 'password'}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            loading={isSubmitting}
          >
            Sign in
          </Button>
        </Box>
      </form>

      <Box textAlign="right" mt={2}>
        <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
          Forgot password?
        </Link>
      </Box>
    </>
  );
}
