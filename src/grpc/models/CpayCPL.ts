/* eslint-disable */
import Long from "long";
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export enum OperationStatus {
  SUCCESS = 0,
  FAIL = 1,
  UNRECOGNIZED = -1,
}

export function operationStatusFromJSON(object: any): OperationStatus {
  switch (object) {
    case 0:
    case "SUCCESS":
      return OperationStatus.SUCCESS;
    case 1:
    case "FAIL":
      return OperationStatus.FAIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OperationStatus.UNRECOGNIZED;
  }
}

export function operationStatusToJSON(object: OperationStatus): string {
  switch (object) {
    case OperationStatus.SUCCESS:
      return "SUCCESS";
    case OperationStatus.FAIL:
      return "FAIL";
    default:
      return "UNKNOWN";
  }
}

export interface EmptyRequest {}

export interface GetfiatCurrencyByIdRequest {
  id: string;
}

export interface GetfiatCurrencyByIdReponse {
  operationStatus: OperationStatus;
  operationMessage: string;
  id: string;
  isPublish: boolean;
  name: string;
  currencyCode: string;
  logo: string;
}

export interface GetALlCurrencySelectList {
  currencyCode: string;
  logo: string;
  name: string;
  id: string;
}

export interface GetAllFiatCurrencySelectListReponse {
  result: GetALlCurrencySelectList[];
  operationStatus: OperationStatus;
  operationMessage: string;
}

export interface GetRegisterSettingRequest {
  settingType: string;
}

export interface GetRegisterSettingResponse {
  operationStatus: OperationStatus;
  operationMessage: string;
  registerUserRole: string;
  registerUserSupport: string;
  registerUserAdmin: string;
  setDefaultRegisterUserLevel: string;
}

function createBaseEmptyRequest(): EmptyRequest {
  return {};
}

export const EmptyRequest = {
  encode(
    _: EmptyRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmptyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): EmptyRequest {
    const message = createBaseEmptyRequest();
    return message;
  },

  toJSON(_: EmptyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EmptyRequest>, I>>(
    _: I
  ): EmptyRequest {
    const message = createBaseEmptyRequest();
    return message;
  },
};

function createBaseGetfiatCurrencyByIdRequest(): GetfiatCurrencyByIdRequest {
  return { id: "" };
}

export const GetfiatCurrencyByIdRequest = {
  encode(
    message: GetfiatCurrencyByIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetfiatCurrencyByIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetfiatCurrencyByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetfiatCurrencyByIdRequest {
    const message = createBaseGetfiatCurrencyByIdRequest();
    message.id =
      object.id !== undefined && object.id !== null ? String(object.id) : "";
    return message;
  },

  toJSON(message: GetfiatCurrencyByIdRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetfiatCurrencyByIdRequest>, I>>(
    object: I
  ): GetfiatCurrencyByIdRequest {
    const message = createBaseGetfiatCurrencyByIdRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetfiatCurrencyByIdReponse(): GetfiatCurrencyByIdReponse {
  return {
    operationStatus: 0,
    operationMessage: "",
    id: "",
    isPublish: false,
    name: "",
    currencyCode: "",
    logo: "",
  };
}

export const GetfiatCurrencyByIdReponse = {
  encode(
    message: GetfiatCurrencyByIdReponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.operationStatus !== 0) {
      writer.uint32(8).int32(message.operationStatus);
    }
    if (message.operationMessage !== "") {
      writer.uint32(18).string(message.operationMessage);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.isPublish === true) {
      writer.uint32(32).bool(message.isPublish);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.currencyCode !== "") {
      writer.uint32(50).string(message.currencyCode);
    }
    if (message.logo !== "") {
      writer.uint32(58).string(message.logo);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetfiatCurrencyByIdReponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetfiatCurrencyByIdReponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operationStatus = reader.int32() as any;
          break;
        case 2:
          message.operationMessage = reader.string();
          break;
        case 3:
          message.id = reader.string();
          break;
        case 4:
          message.isPublish = reader.bool();
          break;
        case 5:
          message.name = reader.string();
          break;
        case 6:
          message.currencyCode = reader.string();
          break;
        case 7:
          message.logo = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetfiatCurrencyByIdReponse {
    const message = createBaseGetfiatCurrencyByIdReponse();
    message.operationStatus =
      object.operationStatus !== undefined && object.operationStatus !== null
        ? operationStatusFromJSON(object.operationStatus)
        : 0;
    message.operationMessage =
      object.operationMessage !== undefined && object.operationMessage !== null
        ? String(object.operationMessage)
        : "";
    message.id =
      object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.isPublish =
      object.isPublish !== undefined && object.isPublish !== null
        ? Boolean(object.isPublish)
        : false;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.currencyCode =
      object.currencyCode !== undefined && object.currencyCode !== null
        ? String(object.currencyCode)
        : "";
    message.logo =
      object.logo !== undefined && object.logo !== null
        ? String(object.logo)
        : "";
    return message;
  },

  toJSON(message: GetfiatCurrencyByIdReponse): unknown {
    const obj: any = {};
    message.operationStatus !== undefined &&
      (obj.operationStatus = operationStatusToJSON(message.operationStatus));
    message.operationMessage !== undefined &&
      (obj.operationMessage = message.operationMessage);
    message.id !== undefined && (obj.id = message.id);
    message.isPublish !== undefined && (obj.isPublish = message.isPublish);
    message.name !== undefined && (obj.name = message.name);
    message.currencyCode !== undefined &&
      (obj.currencyCode = message.currencyCode);
    message.logo !== undefined && (obj.logo = message.logo);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetfiatCurrencyByIdReponse>, I>>(
    object: I
  ): GetfiatCurrencyByIdReponse {
    const message = createBaseGetfiatCurrencyByIdReponse();
    message.operationStatus = object.operationStatus ?? 0;
    message.operationMessage = object.operationMessage ?? "";
    message.id = object.id ?? "";
    message.isPublish = object.isPublish ?? false;
    message.name = object.name ?? "";
    message.currencyCode = object.currencyCode ?? "";
    message.logo = object.logo ?? "";
    return message;
  },
};

function createBaseGetALlCurrencySelectList(): GetALlCurrencySelectList {
  return { currencyCode: "", logo: "", name: "", id: "" };
}

export const GetALlCurrencySelectList = {
  encode(
    message: GetALlCurrencySelectList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.currencyCode !== "") {
      writer.uint32(10).string(message.currencyCode);
    }
    if (message.logo !== "") {
      writer.uint32(18).string(message.logo);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.id !== "") {
      writer.uint32(34).string(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetALlCurrencySelectList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetALlCurrencySelectList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyCode = reader.string();
          break;
        case 2:
          message.logo = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetALlCurrencySelectList {
    const message = createBaseGetALlCurrencySelectList();
    message.currencyCode =
      object.currencyCode !== undefined && object.currencyCode !== null
        ? String(object.currencyCode)
        : "";
    message.logo =
      object.logo !== undefined && object.logo !== null
        ? String(object.logo)
        : "";
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.id =
      object.id !== undefined && object.id !== null ? String(object.id) : "";
    return message;
  },

  toJSON(message: GetALlCurrencySelectList): unknown {
    const obj: any = {};
    message.currencyCode !== undefined &&
      (obj.currencyCode = message.currencyCode);
    message.logo !== undefined && (obj.logo = message.logo);
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetALlCurrencySelectList>, I>>(
    object: I
  ): GetALlCurrencySelectList {
    const message = createBaseGetALlCurrencySelectList();
    message.currencyCode = object.currencyCode ?? "";
    message.logo = object.logo ?? "";
    message.name = object.name ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetAllFiatCurrencySelectListReponse(): GetAllFiatCurrencySelectListReponse {
  return { result: [], operationStatus: 0, operationMessage: "" };
}

export const GetAllFiatCurrencySelectListReponse = {
  encode(
    message: GetAllFiatCurrencySelectListReponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.result) {
      GetALlCurrencySelectList.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.operationStatus !== 0) {
      writer.uint32(16).int32(message.operationStatus);
    }
    if (message.operationMessage !== "") {
      writer.uint32(26).string(message.operationMessage);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAllFiatCurrencySelectListReponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAllFiatCurrencySelectListReponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result.push(
            GetALlCurrencySelectList.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.operationStatus = reader.int32() as any;
          break;
        case 3:
          message.operationMessage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAllFiatCurrencySelectListReponse {
    const message = createBaseGetAllFiatCurrencySelectListReponse();
    message.result = (object.result ?? []).map((e: any) =>
      GetALlCurrencySelectList.fromJSON(e)
    );
    message.operationStatus =
      object.operationStatus !== undefined && object.operationStatus !== null
        ? operationStatusFromJSON(object.operationStatus)
        : 0;
    message.operationMessage =
      object.operationMessage !== undefined && object.operationMessage !== null
        ? String(object.operationMessage)
        : "";
    return message;
  },

  toJSON(message: GetAllFiatCurrencySelectListReponse): unknown {
    const obj: any = {};
    if (message.result) {
      obj.result = message.result.map((e) =>
        e ? GetALlCurrencySelectList.toJSON(e) : undefined
      );
    } else {
      obj.result = [];
    }
    message.operationStatus !== undefined &&
      (obj.operationStatus = operationStatusToJSON(message.operationStatus));
    message.operationMessage !== undefined &&
      (obj.operationMessage = message.operationMessage);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetAllFiatCurrencySelectListReponse>, I>
  >(object: I): GetAllFiatCurrencySelectListReponse {
    const message = createBaseGetAllFiatCurrencySelectListReponse();
    message.result =
      object.result?.map((e) => GetALlCurrencySelectList.fromPartial(e)) || [];
    message.operationStatus = object.operationStatus ?? 0;
    message.operationMessage = object.operationMessage ?? "";
    return message;
  },
};

function createBaseGetRegisterSettingRequest(): GetRegisterSettingRequest {
  return { settingType: "" };
}

export const GetRegisterSettingRequest = {
  encode(
    message: GetRegisterSettingRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.settingType !== "") {
      writer.uint32(10).string(message.settingType);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetRegisterSettingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRegisterSettingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.settingType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRegisterSettingRequest {
    const message = createBaseGetRegisterSettingRequest();
    message.settingType =
      object.settingType !== undefined && object.settingType !== null
        ? String(object.settingType)
        : "";
    return message;
  },

  toJSON(message: GetRegisterSettingRequest): unknown {
    const obj: any = {};
    message.settingType !== undefined &&
      (obj.settingType = message.settingType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetRegisterSettingRequest>, I>>(
    object: I
  ): GetRegisterSettingRequest {
    const message = createBaseGetRegisterSettingRequest();
    message.settingType = object.settingType ?? "";
    return message;
  },
};

function createBaseGetRegisterSettingResponse(): GetRegisterSettingResponse {
  return {
    operationStatus: 0,
    operationMessage: "",
    registerUserRole: "",
    registerUserSupport: "",
    registerUserAdmin: "",
    setDefaultRegisterUserLevel: "",
  };
}

export const GetRegisterSettingResponse = {
  encode(
    message: GetRegisterSettingResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.operationStatus !== 0) {
      writer.uint32(8).int32(message.operationStatus);
    }
    if (message.operationMessage !== "") {
      writer.uint32(18).string(message.operationMessage);
    }
    if (message.registerUserRole !== "") {
      writer.uint32(26).string(message.registerUserRole);
    }
    if (message.registerUserSupport !== "") {
      writer.uint32(34).string(message.registerUserSupport);
    }
    if (message.registerUserAdmin !== "") {
      writer.uint32(42).string(message.registerUserAdmin);
    }
    if (message.setDefaultRegisterUserLevel !== "") {
      writer.uint32(50).string(message.setDefaultRegisterUserLevel);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetRegisterSettingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRegisterSettingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operationStatus = reader.int32() as any;
          break;
        case 2:
          message.operationMessage = reader.string();
          break;
        case 3:
          message.registerUserRole = reader.string();
          break;
        case 4:
          message.registerUserSupport = reader.string();
          break;
        case 5:
          message.registerUserAdmin = reader.string();
          break;
        case 6:
          message.setDefaultRegisterUserLevel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRegisterSettingResponse {
    const message = createBaseGetRegisterSettingResponse();
    message.operationStatus =
      object.operationStatus !== undefined && object.operationStatus !== null
        ? operationStatusFromJSON(object.operationStatus)
        : 0;
    message.operationMessage =
      object.operationMessage !== undefined && object.operationMessage !== null
        ? String(object.operationMessage)
        : "";
    message.registerUserRole =
      object.registerUserRole !== undefined && object.registerUserRole !== null
        ? String(object.registerUserRole)
        : "";
    message.registerUserSupport =
      object.registerUserSupport !== undefined &&
      object.registerUserSupport !== null
        ? String(object.registerUserSupport)
        : "";
    message.registerUserAdmin =
      object.registerUserAdmin !== undefined &&
      object.registerUserAdmin !== null
        ? String(object.registerUserAdmin)
        : "";
    message.setDefaultRegisterUserLevel =
      object.setDefaultRegisterUserLevel !== undefined &&
      object.setDefaultRegisterUserLevel !== null
        ? String(object.setDefaultRegisterUserLevel)
        : "";
    return message;
  },

  toJSON(message: GetRegisterSettingResponse): unknown {
    const obj: any = {};
    message.operationStatus !== undefined &&
      (obj.operationStatus = operationStatusToJSON(message.operationStatus));
    message.operationMessage !== undefined &&
      (obj.operationMessage = message.operationMessage);
    message.registerUserRole !== undefined &&
      (obj.registerUserRole = message.registerUserRole);
    message.registerUserSupport !== undefined &&
      (obj.registerUserSupport = message.registerUserSupport);
    message.registerUserAdmin !== undefined &&
      (obj.registerUserAdmin = message.registerUserAdmin);
    message.setDefaultRegisterUserLevel !== undefined &&
      (obj.setDefaultRegisterUserLevel = message.setDefaultRegisterUserLevel);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetRegisterSettingResponse>, I>>(
    object: I
  ): GetRegisterSettingResponse {
    const message = createBaseGetRegisterSettingResponse();
    message.operationStatus = object.operationStatus ?? 0;
    message.operationMessage = object.operationMessage ?? "";
    message.registerUserRole = object.registerUserRole ?? "";
    message.registerUserSupport = object.registerUserSupport ?? "";
    message.registerUserAdmin = object.registerUserAdmin ?? "";
    message.setDefaultRegisterUserLevel =
      object.setDefaultRegisterUserLevel ?? "";
    return message;
  },
};

export const CpayCPLService = {
  getRegisterSetting: {
    path: "/cpay.cpl.CpayCPL/GetRegisterSetting",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetRegisterSettingRequest) =>
      Buffer.from(GetRegisterSettingRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      GetRegisterSettingRequest.decode(value),
    responseSerialize: (value: GetRegisterSettingResponse) =>
      Buffer.from(GetRegisterSettingResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) =>
      GetRegisterSettingResponse.decode(value),
  },
  getAllFiatCurrencySelectList: {
    path: "/cpay.cpl.CpayCPL/GetAllFiatCurrencySelectList",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: EmptyRequest) =>
      Buffer.from(EmptyRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => EmptyRequest.decode(value),
    responseSerialize: (value: GetAllFiatCurrencySelectListReponse) =>
      Buffer.from(GetAllFiatCurrencySelectListReponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) =>
      GetAllFiatCurrencySelectListReponse.decode(value),
  },
  getfiatCurrencyById: {
    path: "/cpay.cpl.CpayCPL/GetfiatCurrencyById",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetfiatCurrencyByIdRequest) =>
      Buffer.from(GetfiatCurrencyByIdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      GetfiatCurrencyByIdRequest.decode(value),
    responseSerialize: (value: GetfiatCurrencyByIdReponse) =>
      Buffer.from(GetfiatCurrencyByIdReponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) =>
      GetfiatCurrencyByIdReponse.decode(value),
  },
} as const;

export interface CpayCPLServer extends UntypedServiceImplementation {
  getRegisterSetting: handleUnaryCall<
    GetRegisterSettingRequest,
    GetRegisterSettingResponse
  >;
  getAllFiatCurrencySelectList: handleUnaryCall<
    EmptyRequest,
    GetAllFiatCurrencySelectListReponse
  >;
  getfiatCurrencyById: handleUnaryCall<
    GetfiatCurrencyByIdRequest,
    GetfiatCurrencyByIdReponse
  >;
}

export interface CpayCPLClient extends Client {
  getRegisterSetting(
    request: GetRegisterSettingRequest,
    callback: (
      error: ServiceError | null,
      response: GetRegisterSettingResponse
    ) => void
  ): ClientUnaryCall;
  getRegisterSetting(
    request: GetRegisterSettingRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: GetRegisterSettingResponse
    ) => void
  ): ClientUnaryCall;
  getRegisterSetting(
    request: GetRegisterSettingRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: GetRegisterSettingResponse
    ) => void
  ): ClientUnaryCall;
  getAllFiatCurrencySelectList(
    request: EmptyRequest,
    callback: (
      error: ServiceError | null,
      response: GetAllFiatCurrencySelectListReponse
    ) => void
  ): ClientUnaryCall;
  getAllFiatCurrencySelectList(
    request: EmptyRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: GetAllFiatCurrencySelectListReponse
    ) => void
  ): ClientUnaryCall;
  getAllFiatCurrencySelectList(
    request: EmptyRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: GetAllFiatCurrencySelectListReponse
    ) => void
  ): ClientUnaryCall;
  getfiatCurrencyById(
    request: GetfiatCurrencyByIdRequest,
    callback: (
      error: ServiceError | null,
      response: GetfiatCurrencyByIdReponse
    ) => void
  ): ClientUnaryCall;
  getfiatCurrencyById(
    request: GetfiatCurrencyByIdRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: GetfiatCurrencyByIdReponse
    ) => void
  ): ClientUnaryCall;
  getfiatCurrencyById(
    request: GetfiatCurrencyByIdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: GetfiatCurrencyByIdReponse
    ) => void
  ): ClientUnaryCall;
}

export const CpayCPLClient = makeGenericClientConstructor(
  CpayCPLService,
  "cpay.cpl.CpayCPL"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): CpayCPLClient;
  service: typeof CpayCPLService;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
