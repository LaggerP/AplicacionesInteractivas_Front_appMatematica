import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class UserDialog extends Component {

  state = {setOpen: true};

  handleClose = () => {
    this.setState({setOpen: false});
  };

  render(){
    return (
      <div>
          <Dialog
            open={this.state.setOpen}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                  Ups, Perdiste! Intentalo nuevamente.
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                      Tuviste menos de 7 preguntas correctas. Hace click en Volver a intentar
                      y comenza denuevo. ¡Esta vez seguro te va a ir mejor!
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={() =>{ this.props.Close(); this.handleClose()}} color="primary">
                      Volver a intentar
                  </Button>
              </DialogActions>
          </Dialog>
      </div>
    );
  }
}

export default (UserDialog);