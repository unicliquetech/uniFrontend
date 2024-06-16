import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
  margin-top: 30%;
`;

const SignUpForm = styled.form`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const DeliveryPersonSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phoneNumber: '',
    email: '',
    fee: '',
    serviceArea: '',
    availability: '',
    vehicle: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('https://unibackend.onrender.com/api/v1/deliveryPersonnel', formData);
      alert('Sign up successful!');
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <h2>Delivery Person Sign Up</h2>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Location</Label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Fee</Label>
          <Input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Service Area</Label>
          <Input
            type="text"
            name="serviceArea"
            value={formData.serviceArea}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Availability</Label>
          <Input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Vehicle</Label>
          <Input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Sign Up</Button>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default DeliveryPersonSignUp;