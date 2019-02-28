import {ADD_FLASH_MESSAGE} from '../constants/action-types'

export const addFlashmessage = message => {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
};
