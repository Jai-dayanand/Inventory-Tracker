"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  AppBar,
  Toolbar,
  Container,
  Paper,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
    },
    secondary: {
      main: "#c2185b",
    },
  },
  typography: {
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#444",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.5rem",
      color: "#555",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.2rem",
      color: "#666",
    },
  },
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 3,
};

const HomePageContent = () => {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h2"
              color="Blue"
              sx={{ flexGrow: 1, textAlign: "center", color: "black", textDecoration: 'underline'  }}
              
            >
              Pantry Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Container
          sx={{
            pt: 10,
            pb: 3,

            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
          }}
        >
          <Paper elevation={4} sx={{ p: 4 }}>
            <Stack spacing={3} alignItems="flex-start">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography variant="h2" color="primary">
                  My Cart
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Add To Cart
                </Button>
              </Box>
              <Box
                border={"2px solid #00796b"}
                borderRadius={"8px"}
                width="100%"
                p={2}
              >
                <Stack
                  width="100%"
                  height="250px"
                  spacing={2}
                  overflow={"auto"}
                >
                  {inventory.map(({ name, quantity }) => (
                    <Box
                      key={name}
                      width="100%"
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      bgcolor={"#f7f7f7"}
                      padding={2}
                      border={"1px solid #ccc"}
                      borderRadius={"4px"}
                    >
                      <Typography variant="h3">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Typography>
                      <Typography variant="h3">Qty: {quantity}</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeItem(name)}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item
            </Typography>
            <Stack width="100%" direction={"row"} spacing={2} mt={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  addItem(itemName);
                  setItemName("");
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default HomePageContent;
