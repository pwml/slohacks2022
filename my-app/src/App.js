import { useState } from 'react';
import './App.css';

function App(props) {
    const [organization, setOrganization] = useState( 
        {  
            Name: '',
            Category: '',
            City: '',
            State: '',
            Website: '',
            Description: '',
            Email: '',
            Phone: ''
        }
   );

   function handleChangeOrganization(event, setOrganization, organization) { //when the user types in/selects a value, the value is populated 
    const value = event.target.value;
    setOrganization({
        ...organization, 
        [event.target.name]: value
    });
}

    //only accepts numbers as input 
    function handlePhoneNumber(event) {
        const value = event.target.value.replace(/\D/g, "");
        setOrganization({
            ...organization,
            [event.target.name]: value
        })
    };

    //checks length of phone number -> cannot be more than 10
    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    function submitForm() {
        console.log(organization);
        props.handleSubmit(organization); //send values to backend
        setOrganization({ //reset form to blanks
            Name: '',
            Category: '',
            City: '',
            State: '',
            URLWebsite: '',
            Description: '',
            Email: '',
            Phone: '',
            MinimumDonation: '',
            URLLogo: '',
            Contacted: 0})
    } 

return ( //NEED TO CHANGE THE VALUES AND INPUT INFO IN ROUND TRIP (TRIP 1 AND TRIP 2 SHOULD HAVE SEPARATE INFOS MIGHT CHANGE BASED ON SCHEMA)
<div>
    <form className="container">
        <label id="heading">want to include your nonprofit on our website? please fill out your information below!</label>
        <br></br>
        <label id="organizationField">Name of nonprofit organization</label>
            <input
                className="inputBox"
                type="text"
                name="name"
                id="name"
                value={organization.Name}
                onChange={handleChangeOrganization} />
        <br></br>
        <label id="organizationField">Category of nonprofit organization</label>
            {/* TODO: need to research how to do category */}
        <br></br>
        <label id="organizationField">Location of nonprofit organization</label>
        <br></br>
            {/* TODO: need to research how to do location */}
        <label id="organizationField">Website</label>
            <input
                className="inputBox"
                type="text"
                name="website"
                id="website"
                value={organization.Website}
                onChange={handleChangeOrganization} />
        <br></br>
        <label id="organizationField">Please describe your nonprofit organization</label>
            <input
                className="inputBox"
                type="text"
                name="description"
                id="description"
                value={organization.Description}
                onChange={handleChangeOrganization} />
        <br></br>
        <label id="subheading">How can we contact you?</label>
        <label>Email address</label>
            <input
                className="inputBox"
                type="text"
                name="email"
                id="email"
                value={organization.Email}
                onChange={handleChangeOrganization} />
        <label>Phone</label>
            <input
                className="inputBox"
                type="text"
                name="phone"
                id="phone"
                value={organization.Phone}
                onInput={maxLengthCheck}
                onChange={handlePhoneNumber} />
        <input type="button" value="Submit" className="button" onClick={submitForm} />
    </form>
</div>
); 
}

export default App;