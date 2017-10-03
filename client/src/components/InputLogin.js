//SurveyField contains logic to render text input and bleh
import React from 'react';

//{...input}
//is the name as
//<input onBlur={props.onBlur} onChange={props.onChange} />

export default (props) => {
  var input = props.input;
  var label = props.label;
  var meta = props.meta;
  var error = meta.error;
  var touched = meta.touched;


  return (
    <div>
      <label>{label}</label>
    <input {...input}  style={{ marginBottom: '5px'}}/>
    <div className="red-text" style={{ marginBottom:'20px'}}>
      {touched && error}
    </div>
    </div>
  )
}
