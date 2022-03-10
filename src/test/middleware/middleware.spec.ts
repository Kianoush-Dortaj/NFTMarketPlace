
import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../../core/ErrorHandler/BaseError';
import handleError from '../../middleware/HandlerError';


describe('Authorization middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn()
        };
    });

    test('without headers', async () => {
        const expectedResponse = {
            "error": "Missing JWT token from the 'Authorization' header"
        };
        const error = handleError(mockRequest as BaseError, mockRequest as Request, mockResponse as Response, nextFunction);
        console.log(error)
        // expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });
});