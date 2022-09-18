import { StatusCodes } from "./httpStatus.enum";

export const ErrorCodes = {
  COMMON_ERROR: {
    message: "처리 중 오류가 발생했습니다.",
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  UNDEFINED_ERROR: {
    message: "알 수 없는 오류가 발생하였습니다.",
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  NOT_FOUND_NOTION_TOKEN: {
    message: "노션 토큰을 찾을 수 없습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  FORM_DATA_PARSER_ERROR: {
    message: "파라미터를 처리하던 중 오류가 발생했습니다.",
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  INVALID_INPUT: {
    message: "전달된 파라미터 중 잘못된 항목이있습니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  INVALID_REQUEST: {
    message: "유효하지 않은 요청입니다.",
    status: StatusCodes.BAD_REQUEST,
  },
};
