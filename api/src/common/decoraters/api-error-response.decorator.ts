import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
export const ApiErrorResponse = <TResponse extends Type<any>>(
  response: TResponse,
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
                type: 'object',
              },
            },
          },
        ],
      },
    }),
  );
};
