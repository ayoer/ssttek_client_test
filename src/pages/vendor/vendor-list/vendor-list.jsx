import React, {useEffect, useState} from 'react';
import {Button, Table} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from 'store/hooks';
import {deleteVendor, getVendor, searchVendor, vendorSelector} from 'store/vendor';

import styles from './index.module.css';
import {useNavigate} from 'react-router-dom';

function VendorList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {vendors} = useAppSelector(vendorSelector);

  useEffect(() => {
    console.log('sayfa geldi');
    //dispatch(getVendor(''));
    dispatch(searchVendor());
  }, []);

  async function deleteRecordHandle(vendorId) {
    console.log('id', vendorId);
    if (vendorId) {
      await dispatch(deleteVendor(vendorId));
      dispatch(searchVendor());
    }
  }
  function editRecordHandle(id) {
    //alert(id);
    navigate('/editVendor/' + id);
  }

  const coloums = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 100,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (_, record) => record.country.name,
      width: 100,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 20,
      render: (_, record) => (
        <div style={{justifyContent: 'space-between', display: 'flex'}}>
          <div>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                editRecordHandle(record._id);
              }}
            >
              Edit
            </Button>
          </div>
          <div>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteRecordHandle(record._id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={styles.page_body}>
        <div className={styles.page_title}>
          <div>Vendor List</div>
          <div>
            <Button
              type='primary'
              onClick={() => {
                navigate('/addVendor');
              }}
            >
              Create Vendor
            </Button>
          </div>
        </div>
        <div>
          <Table columns={coloums} dataSource={vendors}></Table>
        </div>
      </div>
    </>
  );
}

export default VendorList;
