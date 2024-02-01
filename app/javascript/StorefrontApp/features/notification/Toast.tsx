import { useCallback, useMemo } from "react";
import { Alert, AlertColor, ClickAwayListener } from "@mui/material";
import { useNotification } from "./notificationSlice";

const Toast = () => {
  const { notification, onResetNofication } = useNotification();

  const isOpen = useMemo(() => !!notification.message, [notification]);

  const handleClose = useCallback(() => {
    onResetNofication();
  }, [onResetNofication]);

  if (!isOpen) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={() => handleClose()}>
      <Alert
        variant="filled"
        severity={notification.type as AlertColor}
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
        }}
      >
        {notification.message}
      </Alert>
    </ClickAwayListener>
  );
};

export default Toast;
