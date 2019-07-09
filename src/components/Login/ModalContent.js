import React, { Component } from "react";
import { Paper, Typography, TextField, Box, Button } from "@material-ui/core";

export default class ModalContent extends Component {
  render() {
    const { classes, newPass, setModalOpen, setNewPass, onSubmit } = this.props;
    return (
      <Paper className={classes.Paper}>
        <Typography>Renueva tu contraseña:</Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Es necesario que actualices tu contraseña antes de iniciar sesión.
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            label="Nueva contraseña"
            helperText="Al menos 6 carácteres"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
            required
            InputLabelProps={{
              shrink: true
            }}
          />
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ boxShadow: "none" }}
              className={classes.Button}
            >
              Actualizar
            </Button>
          </Box>
        </form>
      </Paper>
    );
  }
}
