import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, fiveCharacters, nonNumber} from '../validators';
import './complaint-form.css';

export class ComplaintForm extends React.Component {
    onSubmit(values) {
        
    }
    render() {
        return (
            <form 
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="trackingnumber">Tracking number</label>
                <Field 
                    type="text" 
                    name="tracking-number" 
                    id="tracking-number"
                    component={Input}
                    validate={[required, nonEmpty, fiveCharacters, nonNumber]}
                /> <br/>
                <label htmlFor="issue">What is your issue?</label> <br/>
                <Field 
                    name="issue" 
                    component="select"
                    validate={[required]}
                >
                    <option value="">My delivery hasn't arrived</option>
                    <option value="">The wrong item was delivered</option>
                    <option value="">Part of my order was missing</option>
                    <option value="">Some of my order arrived damaged</option>
                    <option value="">Other (give details below)</option>
                </Field> 
                <br/>
                <br/>
                <label htmlFor="details">Give more details (optional)</label> <br/>
                <Field 
                    rows="4" cols="50" 
                    name="comment" 
                    form="userform"
                    id="comment"
                    component="textarea"
                /> <br/>
                <button type="submit">Submit</button> <br/>
            </form>
        );
    }
};

export default reduxForm({
    form: 'complaint'
})(ComplaintForm);