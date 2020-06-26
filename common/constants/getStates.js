import Countries from './countryAndState.json';
import States from './statesAndCity.json';

export const getStates = (country) => {
  if (country) {
    return States.states.filter((i) => i.country === country)[0].states;
  }
  return [];
};

export const getCities = (country) => {
  if (country) {
    return Countries.countries.filter((i) => i.country === country)[0].states;
  }
  return [];
};
