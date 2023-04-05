import React from 'react';
import { Redirect } from 'react-router-dom';

const NewVendorForm = (props) => {
  // console.log(props.lat)
  // console.log(props.long)
  // if (props.form.id) {
  //   return <Redirect to={`/edit/${props.form.id}`} />
  // }
  return (
    <>
      <h2>Create Your Entry!</h2>
      <form onSubmit={e => {
        e.preventDefault();
        props.handleSubmit(e)
      }}>
        <label htmlFor="username">Name:</label>
        <input
          type="text"
          name="username"
          value={props.form.username}
          onChange={e => props.handleChange(e)}
        />
        {/* <label htmlFor="lat">Latitude:</label>
        <input
          type="number"
          name="lat"
          value={props.lat}
          onChange={e => props.handleChange(e)}
          />
          <label htmlFor="long">longitude:</label>
          <input
            type="number"
            name="long"
            value={props.long}
            onChange={e => props.handleChange(e)}
            /> */}
        <label htmlFor="website">website:</label>
        <input
          type="text"
          name="website"
          value={props.form.website}
          onChange={e => props.handleChange(e)}
        />
        <button type="submit">Submit!</button>
      </form>
    </>
  )
};

export default NewVendorForm;
