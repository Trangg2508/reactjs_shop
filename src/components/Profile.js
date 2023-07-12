import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Profile({ profileModal, handleCloseModal }) {
  const [account, setAccount] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    password: ''
  });

  const navigate = useNavigate();
  const baseURL = 'https://640c4dd9a3e07380e8f11292.mockapi.io/userDUMMY';

  const token = localStorage.getItem('token');
  const getProfile = () => {
    fetch(baseURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Fail to get profile information');
        }
        return response.json();

      })

      .then((data) => {
        const existedUser = data.find(
          (userData) => userData.username === token);
        setAccount(existedUser);
      })
      .catch(error => {
        console.log('Error get profile: ', error);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${baseURL}/${account.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          alert('Update successfully!');
          window.location.reload();
        } else {
          // Handle error
          throw new Error('Unable to account the profile.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    fetch(`${baseURL}/${account.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          alert('Delete successfully!');
          console.log(account);
          localStorage.removeItem('token');
          window.location.reload();
          navigate('/');
        } else {
          // Handle error
          throw new Error('Unable to delete the profile.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <Modal
      centered
      open={profileModal}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      width={600}
      bodyStyle={{ padding: '24px' }}
    >
      <form onSubmit={handleSubmit}>
        <h6 className="mb-4 pb-3 border-bottom font-weight-600">Information</h6>
        <div className="row mb-3">
          <div className="col-sm-6">
            <label className="font-weight-600">Username</label>
            <input
              className="form-control text-center"
              type="text"
              value={account.username}
              disabled
            />
          </div>
          <div className="col-sm-6">
            <label className="font-weight-600">Password</label>
            <input
              className="form-control text-center"
              type="password"
              value={account.password}
              onChange={(e) => setAccount({ ...account, password: e.target.value })}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-6">
            <label className="font-weight-600">First Name</label>
            <input
              className="form-control text-center"
              type="text"
              name="firstName"
              value={account.firstName}
              onChange={(e) => setAccount({ ...account, firstName: e.target.value })}
            />
          </div>
          <div className="col-sm-6">
            <label className="font-weight-600">Last Name</label>
            <input
              className="form-control text-center"
              type="text"
              value={account.lastName}
              onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-6">
            <label className="font-weight-600">Phone number</label>
            <input
              className="form-control text-center"
              type="text"
              value={account.phone}
              onChange={(e) => setAccount({ ...account, phone: e.target.value })}
            />
          </div>
          <div className="col-sm-6">
            <label className="font-weight-600">Address</label>
            <input
              className="form-control text-center"
              type="text"
              value={account.address}
              onChange={(e) => setAccount({ ...account, address: e.target.value })}
            />
          </div>
        </div>
        <li className="update-button btn mt-3 mb-4 text-white"
          style={{ backgroundColor: '#009688', fontSize: '1em', width: '100%' }}>
          <button type="submit" >Update</button>
        </li>
      </form>
      <li className="delete-button btn text-white"
        style={{ backgroundColor: '#b13838', fontSize: '1em', width: '100%' }}>
        <button onClick={handleDelete}>Delete account</button>
      </li>

    </Modal>
  );
}
