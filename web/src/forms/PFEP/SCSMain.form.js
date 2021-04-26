import React, {useEffect, useState, Suspense} from 'react';
import {Steps} from 'antd';
import {CLEAN_PFEP_DATA, START_STEP_LOADING} from 'common/actions';
import {useDispatch, useSelector} from 'react-redux';
import {SCSSteps} from '../../steps/SCSSteps';
import {Loading} from '../../components/Loading';

const {Step} = Steps;

export const SCSMainForm = ({id, onCancel, onDone, lead}) => {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const dispatch = useDispatch();
  const stepLoading = useSelector((e) => e.data.stepLoading);
  const CurrentComponent = stepLoading ? SCSSteps[previous].component : SCSSteps[active].component;
  return (
    <div>
      <Steps
        size="small"
        current={active}
        onChange={(e) => {
          setPrevious(active);
          setActive(e);
          dispatch({type: START_STEP_LOADING});
        }}
        labelPlacement="vertical">
        {SCSSteps.map((step) => (
          <Step title={step.title} />
        ))}
      </Steps>
      <br />
      <Suspense fallback={Loading}>
        <CurrentComponent
          lead={lead}
          active={active}
          onNext={() => {
            setActive(active + 1);
          }}
          onDone={() => {
            dispatch({type: CLEAN_PFEP_DATA});
            onDone();
          }}
          onCancel={() => {
            dispatch({type: CLEAN_PFEP_DATA});
            onCancel();
          }}
          id={id}
        />
      </Suspense>
    </div>
  );
};
