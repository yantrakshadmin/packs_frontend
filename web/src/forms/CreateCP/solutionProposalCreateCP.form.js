import React, { useEffect, useState, useCallback } from 'react';
import { Form, Col, Row, Button, Divider, Spin, Tag } from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightOutlined } from '@ant-design/icons';
import {
  ADD_CREATE_CP_DATA,
  STOP_STEP_LOADING,
} from 'common/actions';
import { solutionProposalCreateCPFormFields , }
  from 'common/formFields/createCP/solutionProposalCreateCP.formFields';
import { getFields, getLabels,getFieldsByColumn,getDefaultMonthValue } from 'common/constants/solutionproposalCreateCP';

import _ from 'lodash';


export const SolutionProposalCreateCPForm = ({ id, onCancel,lead,onNext,active }) => {
	const [loading,setLoading] = useState(false);
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const state =  useSelector(e=>(e.data.createCPData))
	const [fields,setFields] = useState(getFields('FLC','Insert'))
	const [labels,setLabels] = useState(getLabels('FLC','Insert'))
	const submit = async (data) =>{
		setLoading(true)
		await dispatch({ type:ADD_CREATE_CP_DATA,
			data:{ ...data } 
		});
		setLoading(false)
		if(active === 1){
			onNext();
		}
	}

	useEffect( ()=>{
		if(active!==1){
		form.submit()
		dispatch({ type:STOP_STEP_LOADING })
		}
	},[active])

	const updateTotalKitQtysCols = useCallback(() => {
		if (form.getFieldValue('kit_based_on_usage_ratio')) {
			const totalKitQtysCols = getFieldsByColumn(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type'),'quantity');
			totalKitQtysCols.forEach(i => {
			if (!form.getFieldValue(i)) {
				if (i!=="mould_quantity") {
				form.setFieldsValue({
					[i] : form.getFieldValue('kit_based_on_usage_ratio'),
				})
				} else {
				form.setFieldsValue({
					['mould_quantity'] : 1,
				})
				}
			}
			})
		}
	},[form])

	const updateMonthCols = useCallback(() => {
		const monthCols = getFieldsByColumn(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type'),'month');
		monthCols.forEach(i => {
			if (!form.getFieldValue(i)) {
				//console.log("HAHA: " + _.chain(i).trimEnd("month").trimEnd("_"))
				form.setFieldsValue({
					[i] : getDefaultMonthValue(i.slice(0,-6)),
				})
			}
		})
	},[form])

	useEffect( () => {
		updateTotalKitQtysCols();
		updateMonthCols();
	},[])

  	const handleFieldsChange = useCallback(data => {

		if(data[0]){
			if(data[0].name) {

				//console.log(data[0].name[0]);

				if (data[0].name[0]==="standard_assets" || data[0].name[0]==='insert_type') {
					setFields(getFields(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type')));
					setLabels(getLabels(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type')));
					updateTotalKitQtysCols();
					updateMonthCols();
				}

				const qtyPerKitCols = getFieldsByColumn(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type'),'quantity_perkit');
				const rateCols = getFieldsByColumn(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type'),'rate');
				const totalMatReqCols = getFieldsByColumn(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type'),'tot_mat_req');
				const totalCostCols = getFieldsByColumn(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type'),'total_cost');
				const monthCols = getFieldsByColumn(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type'),'month');
				const depCostCols = getFieldsByColumn(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type'),'dep_cost');

				qtyPerKitCols.forEach((i,idx) => {
					if (data[0].name[0]===qtyPerKitCols[idx] || data[0].name[0]===rateCols[idx] || data[0].name[0]===totalMatReqCols[idx] || data[0].name[0]===totalCostCols[idx] || data[0].name[0]===depCostCols[idx]) {
						if (form.getFieldValue(qtyPerKitCols[idx]) && form.getFieldValue(rateCols[idx])) {
							const x = form.getFieldValue(qtyPerKitCols[idx])*form.getFieldValue(rateCols[idx]);
							form.setFieldsValue({
								[totalMatReqCols[idx]] : x,
								[totalCostCols[idx]] : Math.pow(x,2),
							})
						} else {
							form.setFieldsValue({
								[totalMatReqCols[idx]] : 0,
								[totalCostCols[idx]] : 0,
							})
						}

						if ( form.getFieldValue(totalCostCols[idx]) && form.getFieldValue(monthCols[idx]) && form.getFieldValue("yantra_cycle") ) {
							form.setFieldsValue({
								[depCostCols[idx]] : ( form.getFieldValue(totalCostCols[idx])/form.getFieldValue(monthCols[idx]) )/( 30*form.getFieldValue("yantra_cycle") ),
							})
						} else {
							form.setFieldsValue({
								[depCostCols[idx]] : 0,
							})
						}
					}
				})

			}
		}

  	},[form,fields,labels])

  // const handleFieldsChange = (data) => {
  //   if(data[0]){
  //     if(data[0].name){
  //       if(data[0].name[0]==='standard_assets') {
  //         // console.log(getFields(data[0].value),form.getFieldValue('insert_type'),'Ggg')
  //         setFields(getFields(data[0].value,form.getFieldValue('insert_type')))
  //         setLabels(getLabels(form.getFieldValue('standard_assets'),data[0].value))
  //       }
  //       if(data[0].name[0]==='insert_type') {
  //         // console.log(form.getFieldValue('standard_assets'),getFields(data[0].value),'Ggg')
  //         setFields(getFields(form.getFieldValue('standard_assets'),data[0].value))
  //         setLabels(getLabels(form.getFieldValue('standard_assets'),data[0].value))
  //       }}}
  // }

  return (
    <Spin spinning={loading}>
      <Form
        initialValues={{
          ...state,
          insert_type:state.insert_type||'Insert',
          standard_assets:state.standard_assets || 'FLC' }}
        onFinish={submit}
        form={form}
        layout='vertical'
        // hideRequiredMark
        onFieldsChange={handleFieldsChange}
        autoComplete='off'
      >
        <Divider orientation='left'>Capex</Divider>
        <div className='row px-2'>
          {state.solution_flc ? <Tag>FLC</Tag> : null}
          {state.solution_fsc ? <Tag>FSC</Tag> : null}
          {state.solution_crate ? <Tag>Crate</Tag> : null}
          {state.solution_ppbox ? <Tag>PP Box</Tag> : null}
          {state.solution_palletized_box ? <Tag>Solution Palletized Box</Tag> : null}
          {state.solution_palletized_crate? <Tag>Solution Palletized Crate</Tag> : null}
          {state.solution_pp ? <Tag>Solution PP</Tag> : null}
          {state.solution_stacking_nesting ? <Tag>Solution Stacking Nesting</Tag> : null}
          {state.solution_wp ? <Tag>Solution WP</Tag> : null}
        </div>
        <Row style={{ justifyContent: 'left' }}>
          {solutionProposalCreateCPFormFields.map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          <Col span={3}>
              <div className='p-2 flex row justify-center'>
                <b></b>
              </div>
          </Col>
          {[...fields].slice(0,7).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2 flex row justify-center'>
                <b>{item.customLabel}</b>
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {labels.slice(0,1).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2 flex row justify-center'>
                <b>{item}</b>
              </div>
            </Col>
          ))}
          {[...fields].slice(0,7).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {labels.slice(1,2).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2 flex row justify-center'>
                <b>{item}</b>
              </div>
            </Col>
          ))}
          {[...fields].slice(7,14).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {labels.slice(2,3).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2 flex row justify-center'>
                <b>{item}</b>
              </div>
            </Col>
          ))}
          {[...fields].slice(14,21).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {labels.slice(3,4).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2 flex row justify-center'>
                <b>{item}</b>
              </div>
            </Col>
          ))}
          {[...fields].slice(21,28).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {labels.slice(4,5).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2 flex row justify-center'>
                <b>{item}</b>
              </div>
            </Col>
          ))}
          {[...fields].slice(28,35).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {labels.slice(5,6).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2 flex row justify-center'>
                <b>{item}</b>
              </div>
            </Col>
          ))}
          {[...fields].slice(35,42).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {labels.slice(6,7).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2 flex row justify-center'>
                <b>{item}</b>
              </div>
            </Col>
          ))}
          {[...fields].slice(42,49).map((item, idx) => (
            <Col span={3}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        {/* <Form.List name='solutions'> */}
        {/*  {(fields, { add, remove }) => { */}
        {/*    return ( */}
        {/*      <div> */}
        {/*        {fields.map((field, index) => ( */}
        {/*          <Row align='middle'> */}
        {/*            {formListSolutionProposalCreateCPFormFields.slice(0,1).map((item) => ( */}
        {/*              <Col span={4}> */}
        {/*                <div className='p-2'> */}
        {/*                  {formItem({ */}
        {/*                    ...item, */}
        {/*                    noLabel: index !== 0, */}
        {/*                    form, */}
        {/*                    others: { */}
        {/*                      formOptions: { */}
        {/*                        ...field, */}
        {/*                        // hidden:true, */}
        {/*                        name: [field.name, item.key], */}
        {/*                        fieldKey: [field.fieldKey, item.key], */}
        {/*                      }, */}
        {/*                    }, */}
        {/*                  })} */}
        {/*                </div> */}
        {/*              </Col> */}
        {/*            ))} */}
        {/*            {[...createFields('std_ast')].slice(1,7).map((item) => ( */}
        {/*              <Col span={3}> */}
        {/*                <div className='p-2'> */}
        {/*                  {formItem({ */}
        {/*                    ...item, */}
        {/*                    noLabel: index !== 0, */}
        {/*                    form, */}
        {/*                    others: { */}
        {/*                      formOptions: { */}
        {/*                        ...field, */}
        {/*                        name: [field.name, item.key], */}
        {/*                        fieldKey: [field.fieldKey, item.key], */}
        {/*                      }, */}
        {/*                    }, */}
        {/*                  })} */}
        {/*                </div> */}
        {/*              </Col> */}
        {/*            ))} */}
        {/*          </Row> */}
        {/*        ))} */}
        {/*      </div> */}
        {/*    ); */}
        {/*  }} */}
        {/* </Form.List> */}
        <Row justify='space-between'>
          <div className='row'>
            <Button type='primary' htmlType='submit' disabled>
              Submit
            </Button>
            <div className='p-2' />
            <Button type='primary' onClick={onCancel}>
              Cancel
            </Button>
          </div>
          <Button type='link' htmlType='submit'>
            <ArrowRightOutlined style={{ fontSize:30 }}  />
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default SolutionProposalCreateCPForm;

