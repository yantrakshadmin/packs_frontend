import React, {useState, Suspense} from 'react';
import {Steps} from 'antd';
import {CLEAN_CREATE_CP_DATA, START_STEP_LOADING} from 'common/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Loading} from '../../components/Loading';
import {CreateCPStep} from '../../steps/CreateCPStep';

const {Step} = Steps;

export const MainCreateCPForm = ({id, onCancel, onDone, lead}) => {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const dispatch = useDispatch();
  const stepLoading = useSelector((e) => e.data.stepLoading);
  const CurrentComponent = stepLoading
    ? CreateCPStep[previous].component
    : CreateCPStep[active].component;

  return (
    <div>
      <Steps
        size="small"
        current={active}
        onChange={(e) => {
          dispatch({type: START_STEP_LOADING});
          setPrevious(active);
          setActive(e);
        }}
        labelPlacement="vertical">
        {CreateCPStep.map((step) => (
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
            dispatch({type: CLEAN_CREATE_CP_DATA});
            onDone();
          }}
          onCancel={() => {
            dispatch({type: CLEAN_CREATE_CP_DATA});
            onCancel();
          }}
          id={id}
        />
      </Suspense>
    </div>
  );
};
