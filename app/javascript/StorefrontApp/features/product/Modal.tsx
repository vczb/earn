import { useCallback, useState } from "react";
import {
  Modal as MUIModal,
  Container,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useTransaction } from "features/transaction/transactionSlice";
import { Product } from "./productSlice";
import { useCustomer } from "features/customer/customerSlice";
import { useNotification } from "features/notification/notificationSlice";
import { Elevation } from "components";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
};

const Modal = ({ product, isOpen, onClose }: ModalProps) => {
  const { onWithdrawal, onResetRequestStatus } = useTransaction();
  const { onShowNotification } = useNotification();
  const { onGetWallet } = useCustomer();
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    setLoading(false);
    onResetRequestStatus();
    onClose();
  }, [onClose, onResetRequestStatus]);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    if (product) {
      onWithdrawal({
        productId: product.id,
      }).then(() => {
        onGetWallet();
        onShowNotification({
          type: "success",
          message: "Produto resgatado com sucesso!",
        });
        handleClose();
      });
    }
  }, [onWithdrawal, onShowNotification, onGetWallet, handleClose, product]);

  return (
    <MUIModal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container component="main" maxWidth="lg">
        <Elevation
          sx={{
            position: "absolute",
            transform: "translate(50%, -50%)",
            top: "50%",
            right: "50%",
            maxHeight: "80%",
            width: "80%",
            overflowY: "auto",
          }}
        >
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {product?.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {product?.description}
            </Typography>
            <Button
              autoFocus
              type="button"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit()}
            >
              {loading ? "Carregando..." : "Eu quero"}
            </Button>
          </Box>
        </Elevation>
      </Container>
    </MUIModal>
  );
};

export default Modal;
