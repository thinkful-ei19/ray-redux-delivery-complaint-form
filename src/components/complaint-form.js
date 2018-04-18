import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, fiveCharacters, nonNumber} from '../validators';
import './complaint-form.css';

export class ComplaintForm extends React.Component {
    onSubmit(values) {
        // console.log(values);
        return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(!res.ok) {
                    if(
                        res.headers.has('content-type') && 
                        res.headers
                            .get('content-type')
                            .startsWith('application/json')
                    ) {
                        return res.json().then(err => Promise.reject(err));
                    }
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                } 
                return;
            })
            .then(() => console.log('Submitted with values', values))
            .catch(err => {
                const {reason, message, location} = err;
                if(reason === 'ValidationError') {
                    return Promise.reject(
                        new SubmissionError({
                            [location]: message
                        })
                    );
                }
                return Promise.reject(
                    new SubmissionError({
                        _error: 'Error submitting message'
                    })
                );
            })
    }
    render() {
        // console.log(this.props);
        let successMessage;
        if(this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    Complaint submitted successfully
                </div>
            );
        }

        let errorMessage;
        if(this.props.error) {
            errorMessage = (
                <div className="message message-error">{this.props.error}</div>
            );
        }

        return (
            <form 
                onSubmit={this.props.handleSubmit(values => 
                    this.onSubmit(values)
                    // console.log(values)
                )}>
                {successMessage}
                {errorMessage}    
                <label htmlFor="trackingNumber">Tracking number</label>
                <Field 
                    type="text" 
                    name="trackingNumber" 
                    id="trackingNumber"
                    component={Input}
                    validate={[required, nonEmpty, fiveCharacters, nonNumber]}
                /> <br/>
                <label htmlFor="issue">What is your issue?</label> <br/>
                <Field 
                    name="issue" 
                    component="select"
                    validate={[required]}
                >
                    <option value="select">Please select issue</option>
                    <option value="not-delivered">My delivery hasn't arrived</option>
                    <option value="wrong-item">The wrong item was delivered</option>
                    <option value="missing-part">Part of my order was missing</option>
                    <option value="damaged">Some of my order arrived damaged</option>
                    <option value="other">Other (give details below)</option>
                </Field> 
                <br/>
                <br/>
                <label htmlFor="details">Give more details (optional)</label> <br/>
                <Field component="textarea" name="details">
                    rows="4" cols="50" 
                    name="details" 
                    form="userform"
                    id="details"
                </Field> <br/>
                <button type="submit">Submit</button> <br/>
            </form>
        );
    }
};

export default reduxForm({
    form: 'complaint',
    onSubmitFail: (errors, dispatch) => 
        dispatch(focus('complaint', Object.keys(errors)[0]))
})(ComplaintForm);