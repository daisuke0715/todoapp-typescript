import { applyDecorators } from '@nestjs/common';
import { Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiSuccessResponse = <
  TResponse extends Type<any>,
  TResponseData extends Type<any>
>(
  response: TResponse,
  responseData: TResponseData,
) => {
  return applyDecorators(
    ApiResponse({
      status: new response().httpStatusCode,
      schema: {
        allOf: [
          { $ref: getSchemaPath(response) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(responseData),
              },
            },
          },
        ],
      },
    }),
  );
};
