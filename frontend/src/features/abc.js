// export const listNotes = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: NOTES_LIST_REQUEST,
//     });
//     const {
//       userLogin: { userInfo },
//     } = getState();
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     const {data} = await axios.get('http://localhost:5000/notes', config)
//     dispatch({
//         type: NOTES_LIST_SUCCESS,
//         payload: data
//     })
//   } catch (e) {
//     const message = error.response && error.response.data.message ? error.response.data.message : error.message
//     dispatch({
//         type: NOTES_LIST_FAIL,
//         payload: message
//     })
//   }
// };
