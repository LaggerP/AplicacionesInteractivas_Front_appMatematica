import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import '../SumasRestasMyM.scss';

const styles = {
    input: {
        fontSize: "5rem",
        color: "#007BA7",
        textAlign: "center",
        width:'24rem',
    }
  }

class UserTextField extends Component {

  handleChange = (e) => {
    e.preventDefault();
    this.props.callback(e.target.value);
  }

  render() {
    return (
      <div>
        <TextField
          type='number'
          required={true}
          autoFocus={true}
          value={this.props.valueRes}
          onChange={this.handleChange}
          InputProps={{
            classes: {
                input: this.props.classes.input
            } 
          }}>
        </TextField>
      </div>
    );
  }
}

export default withStyles(styles)(UserTextField)