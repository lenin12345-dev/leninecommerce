// reducer.js
import {
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  GET_ALL_REVIEWS_SUCCESS,
  GET_ALL_REVIEWS_FAILURE,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAILURE,
  GET_ALL_RATINGS_SUCCESS,
  GET_ALL_RATINGS_FAILURE,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
} from "./ActionTyp";

const initialState = {
  reviews: [],
  ratings: [],
  error: "",
  loading: false,
};

const ReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        error: "",
      };
    case CREATE_REVIEW_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload
        ),
      };
    case DELETE_REVIEW_FAILURE:
      return {
        ...state,
        error: "Error in deleting review",
      };
    case GET_ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        error: "",
      };
    case GET_ALL_REVIEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_RATING_SUCCESS:
      return {
        ...state,
        ratings: [...state.ratings, action.payload],
        error: "",
      };
    case CREATE_RATING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ALL_RATINGS_SUCCESS:
      return {
        ...state,
        ratings: action.payload,
        error: "",
      };
    case GET_ALL_RATINGS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ReviewReducer;
