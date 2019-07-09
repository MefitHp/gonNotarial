import React, { useState, useRef, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useMutation } from "react-apollo-hooks";
import { crearEscritura as gqlCrearEscritura } from "./Graphql/Mutations";

const RubroForm = () => {
  let [labelWidth, setLabelWidth] = useState(0);
  let [escritura, setEscritura] = useState({
    rubro: "Rubro 1A",
    nombreActor: "",
    nombreDemandado: "",
    noJuzgado: "",
    noExpediente: ""
  });
  const styles = useStyles();
  const inputLabel = useRef(null);
  const crearEscritura = useMutation(gqlCrearEscritura);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = e => {
    let { name, value } = e.target;
    setEscritura(prev => {
      return { ...prev, [name]: value };
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    crearEscritura({ variables: { ...escritura } })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };
  return (
    <Paper className={styles.Paper}>
      <Box className={styles.Box}>
        <Typography className={styles.Title} component="h2" variant="h6">
          Datos de escritura
        </Typography>
        <form onSubmit={onSubmit} id="rubro-form">
          <FormControl variant="outlined" required fullWidth>
            <InputLabel ref={inputLabel}>Rubro</InputLabel>
            <Select
              name="rubro"
              onChange={handleChange}
              value={escritura.rubro}
              // onChange={e => setRubro(e.target.value)}
              placeholder="Rubro"
              input={<OutlinedInput labelWidth={labelWidth} />}
            >
              <MenuItem value="Rubro 1">Rubro 1</MenuItem>
              <MenuItem value="Rubro 2">Rubro 2</MenuItem>
              <MenuItem value="Rubro 3">Rubro 3</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            value={escritura.nombreActor}
            name="nombreActor"
            onChange={handleChange}
            label="Nombre del Actor"
            placeholder="Ej. Carlos Torrentera"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            name="nombreDemandado"
            value={escritura.nombreDemandado}
            onChange={handleChange}
            required
            label="Nombre del demandado"
            placeholder="Ej. Martín Rivas"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <Box display="flex" justifyContent="space-between">
            <TextField
              required
              name="noJuzgado"
              value={escritura.noJuzgado}
              onChange={handleChange}
              label="No. de juzgado"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              margin="normal"
              variant="outlined"
              style={{ marginRight: 16 }}
            />
            <TextField
              required
              value={escritura.noExpediente}
              name="noExpediente"
              onChange={handleChange}
              label="No. de expediente"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Box>
        </form>
      </Box>
      <Button
        type="submit"
        form="rubro-form"
        style={{ boxShadow: "none", borderRadius: "0px 0px 4px 4px" }}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        Generar escritura
      </Button>
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  Paper: {
    maxWidth: 512
  },
  Box: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`
  },
  Title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  }
}));
export default RubroForm;
