import * as actions from './editPlace.actions';
import history from '../../../history';
import axiosInstance from '../../../api';

export const editPlace = ({
  id,
  name,
  description,
  price,
  capacity,
  square,
  time_from,
  time_to,
  renter_email,
  rules
}) => async (dispatch) => {
  dispatch(actions.editPlaceRequest());
  try {
    const result = await axiosInstance.put(`/api/building/${id}`, {
      name,
      description,
      price,
      capacity,
      square,
      time_from,
      time_to,
      renter_email,
      rules
    });
    // console.log('result.data',result.data);
    dispatch(actions.editPlaceSuccess(result.data));
  } catch (error) {
    dispatch(actions.editPlaceFailure({ message: error.data }));
  }
};

export const deletePlace = (id) => async (dispatch) => {
  dispatch(actions.deletePlaceRequest());
  try {
    const result = await axiosInstance.delete(`/api/buildings/${id}`);
    // console.log('result.data', result.data)
    dispatch(actions.deletePlaceSuccess(result.data));
    history.push('/host');
  } catch (error) {
    dispatch(actions.deletePlaceFailure({ message: error.data }));
  }
};

export const getPlaceDetails = (id) => async (dispatch) => {
  dispatch(actions.getPlaceDetailsRequest());
  try {
    const result = await axiosInstance.get(`/api/building/${id}`);
    // console.log('result.data', result.data)
    dispatch(actions.getPlaceDetailsSuccess(result.data));
  } catch (error) {
    dispatch(actions.getPlaceDetailsFailure({ message: error.message }));
  }
};
