import { useEffect, useState } from "react";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";

import { Elevation, GridContainer, Wrapper } from "components";
import { useCustomer } from "features/customer/customerSlice";

import { Product, useProduct } from "./productSlice";

import styles from "./List.module.css";
import Modal from "./Modal";
import Item from "./Item";
import Info from "./Info";

export default function List() {
  const { onGetWallet, customer, onResetCustomer } = useCustomer();
  const { product, onList, onResetProduct } = useProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const theme = useTheme();
  const greaterThanLG = useMediaQuery(theme.breakpoints.up("lg"));

  const onFinish = () => {
    onResetProduct();
    onResetCustomer();
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    onGetWallet();
    onList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper fullVH>
      <GridContainer maxWidth="lg">
        <Elevation
          sx={{
            my: 8,
          }}
        >
          <Info />
          <Box
            color={"grey.300"}
            sx={{
              my: 2,
              px: 1,
            }}
            className={styles.divider}
          />
          <Box
            sx={{
              maxHeight: greaterThanLG ? "15rem" : "10rem",
              overflowY: "auto",
              px: 1,
            }}
          >
            {product.products.map((item: Product) => (
              <Item
                key={item.id}
                item={item}
                handleItemClick={handleProductClick}
                disabled={
                  (customer?.wallet?.diamonds || 0) < item.priceInDiamonds
                }
              />
            ))}
          </Box>
          <Box
            color={"grey.300"}
            sx={{
              my: 2,
              px: 1,
            }}
            className={styles.divider}
          />
          <Box sx={{ my: 2, display: "flex", width: "100%" }}>
            <Button
              type="button"
              onClick={() => onFinish()}
              variant="outlined"
              fullWidth
              sx={{ margin: "auto", maxWidth: "25rem" }}
            >
              FINALIZAR
            </Button>
          </Box>
        </Elevation>
      </GridContainer>
      <Modal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Wrapper>
  );
}
