import { useCompany } from './companySlice';
import OffIcon from '@mui/icons-material/PowerSettingsNewRounded'
import { IconButton } from '@mui/material';

const LogoutButton = () => {
  const { onLogout } = useCompany();

  return (
    <IconButton
      style={{
        position: 'absolute',
        left: '1rem',
        bottom: '1rem',
      }}
      aria-label="Log Out"
      size='small'
      onClick={() => onLogout()}
    >
      <OffIcon fontSize='inherit' />
    </IconButton>
  );
};
export default LogoutButton;
