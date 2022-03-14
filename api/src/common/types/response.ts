import { ApiProperty } from '@nestjs/swagger';
import HttpStatusCodes from 'http-status-codes';
import { STATUS_DESCRIPTION } from '../message/status-description';

type StatusCode = typeof HttpStatusCodes[keyof typeof HttpStatusCodes];

const createDescription = (statusCode: StatusCode) => {
  if (statusCode === 200) {
    return STATUS_DESCRIPTION.OK;
  }
  if (statusCode === 201) {
    return STATUS_DESCRIPTION.CREATED;
  }
  if (statusCode === 202) {
    return STATUS_DESCRIPTION.ACCEPTED;
  }
  if (statusCode === 401) {
    return STATUS_DESCRIPTION.UNAUTHORIZED;
  }
  return STATUS_DESCRIPTION.OTHERS;
};

export class CommonResponse {
  @ApiProperty()
  httpStatusCode: StatusCode;

  @ApiProperty()
  timestamp: string;

  description: string;
  data: object;

  constructor(statusCode: StatusCode, responseData: object) {
    this.httpStatusCode = statusCode;
    this.timestamp = new Date().toISOString();
    this.description = createDescription(statusCode);
    this.data = responseData;
  }
}

export class OkResponse extends CommonResponse {
  @ApiProperty({ example: 200 })
  httpStatusCode: StatusCode;

  @ApiProperty({ example: createDescription(200) })
  description: string;

  @ApiProperty()
  data: object[];

  constructor(responseData: object) {
    super(200, responseData);
  }
}

export class CreatedResponse extends CommonResponse {
  @ApiProperty({ example: 201 })
  httpStatusCode: StatusCode;
  constructor(responseData: object) {
    super(201, responseData);
  }
}

export class AcceptedResponse extends CommonResponse {
  @ApiProperty({ example: 202 })
  httpStatusCode: StatusCode;
  @ApiProperty({ example: createDescription(202) })
  description: string;

  constructor(responseData: object) {
    super(202, responseData);
  }
}

export class UnAuthorizedResponse extends CommonResponse {
  @ApiProperty({ example: 401 })
  httpStatusCode: StatusCode;
  @ApiProperty({ example: createDescription(401) })
  description: string;

  constructor(responseData: object) {
    super(401, responseData);
  }
}

export class NotFoundResponse extends CommonResponse {
  @ApiProperty({ example: 404 })
  httpStatusCode: StatusCode;
  @ApiProperty({ example: createDescription(404) })
  description: string;

  constructor(responseData: object) {
    super(404, responseData);
  }
}

class DeletedResultData {
  @ApiProperty()
  'fieldCount': number;

  @ApiProperty()
  'affectedRows': number;

  @ApiProperty()
  'insertId': number;

  @ApiProperty()
  'serverStatus': number;

  @ApiProperty()
  'warningCount': number;

  @ApiProperty()
  'message': string;

  @ApiProperty()
  'protocol41': boolean;

  @ApiProperty()
  'changedRows': number;
}

export class DeletedResult {
  @ApiProperty({ type: DeletedResultData })
  raw: DeletedResultData;
  @ApiProperty()
  affected?: Number;
}
