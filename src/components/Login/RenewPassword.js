import React, { useState, useContext } from "react";
import { Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { AuthContext } from "../../context/AuthContext";
import ModalContent from "./ModalContent";

const RenewPassword = () => {
  const classes = useStyles();
  let [newPass, setNewPass] = useState("");
  const { user, setUser, modalOpen, setModalOpen } = useContext(AuthContext);

  const onSubmit = e => {
    e.preventDefault();
    Auth.completeNewPassword(user, newPass);
  };
  return (
    <div>
      <Modal
        aria-labelledby="new-password"
        aria-describedby="new-password-description"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className={classes.Modal}
        disableAutoFocus
      >
        <ModalContent
          onSubmit={onSubmit}
          classes={classes}
          newPass={newPass}
          setModalOpen={setModalOpen}
          setNewPass={setNewPass}
        />
      </Modal>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  Paper: {
    maxWidth: 450,
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  Modal: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  Button: {
    margin: theme.spacing(1)
  }
}));
export default RenewPassword;
