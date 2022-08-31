import {Button, Input, Select} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {countrySelector, searchCountry} from 'store/country';
import {useAppDispatch, useAppSelector} from 'store/hooks';
import {createVendor, getVendor, updateVendor, vendorSelector} from 'store/vendor';

import styles from './index.module.css';

const {Option} = Select;

function AddUpdateVendor() {
  const {id} = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {vendor} = useAppSelector(vendorSelector);
  const {countries} = useAppSelector(countrySelector);

  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const loadVendor = () => {
    if (!vendor || !id) return;

    setName(vendor.name || '');
    setDisplayName(vendor.displayName || '');
    setCountryId(vendor.countryId || '');
    setAddress(vendor.address || '');
    setPhone(vendor.phone || '');
  };

  useEffect(() => {
    loadVendor();
  }, [vendor, id]);

  useEffect(() => {
    if (id) {
      dispatch(getVendor(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(searchCountry());
  }, []);

  const onSave = async () => {
    let vendorData = {
      name,
      displayName,
      countryId,
      address,
      phone,
    };

    const emptyInput = Object.keys(vendorData).find((el) => !vendorData[el]);

    if (emptyInput) {
      console.log('empty input ', emptyInput);
      return;
    }

    if (id) {
      vendorData.id = id;
      await dispatch(updateVendor(vendorData));
      navigate('/');
    } else {
      await dispatch(createVendor(vendorData));
      navigate('/');
    }
  };

  const countryOptions = useCallback(
    () =>
      countries.map((el, index) => (
        <Option key={index} value={el._id}>
          {el.name}
        </Option>
      )),
    [countries]
  );

  return (
    <>
      <div className={styles.page_body}>
        <div className={styles.page_title}>{id ? 'Update Vendor' : 'Add Vendor'}</div>
        <div className={styles.page_row}>
          <div className={styles.page_input}>
            <Input value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}></Input>
          </div>
          <div className={styles.page_input}>
            <Input value={displayName} placeholder='Display Name' onChange={(e) => setDisplayName(e.target.value)}></Input>
          </div>
        </div>
        <div className={styles.page_row}>
          <div className={styles.page_input}>
            <Select
              value={countryId || 'Country'}
              placeholder='Country'
              style={{width: '100%'}}
              showSearch={true}
              onChange={(value) => setCountryId(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {countryOptions()}
            </Select>
          </div>
          <div className={styles.page_input}>
            <Input value={phone} placeholder='Phone' onChange={(e) => setPhone(e.target.value)}></Input>
          </div>
        </div>
        <div className={styles.page_row}>
          <div className={styles.page_input}>
            <Input value={address} placeholder='Address' onChange={(e) => setAddress(e.target.value)}></Input>
          </div>
        </div>
        <div className={styles.page_row}>
          <div className={styles.page_input}>
            <Button
              type='primary'
              onClick={() => {
                onSave();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUpdateVendor;
