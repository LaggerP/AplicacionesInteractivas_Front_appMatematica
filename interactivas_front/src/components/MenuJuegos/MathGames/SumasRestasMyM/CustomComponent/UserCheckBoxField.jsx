import React, {Component} from 'react';

class UserCheckBoxField extends Component {

  handleChange = (e) => {
    this.props.callback(e.target.value);
  }

  render() {
    return (
        <div className='CheckList'>
            <input id='CheckSi' onClick={this.handleChange} type="radio" value="SI" name="MyM"/>
            <label htmlFor='CheckSi' className='LabelCheckSi'>SI</label>
            
            <input id='CheckNo' onClick={this.handleChange} type="radio" value="NO" name="MyM"/>      
            <label htmlFor='CheckNo' className='LabelCheckNo'>NO</label>
        </div>
    );
  }
}

export default (UserCheckBoxField)