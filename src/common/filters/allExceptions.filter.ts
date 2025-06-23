import { 
    ArgumentsHost, 
    Catch, 
    ExceptionFilter, 
    HttpException,
    HttpStatus
} from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

@Catch(HttpException, WsException)
export class AllExceptionsFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {

        const ctxType = host.getType()

        if (ctxType === "http") {
            const ctxHttp = host.switchToHttp()
            const response = ctxHttp.getResponse()
            const request = ctxHttp.getRequest()

            const status = exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR
            const message = exception instanceof HttpException
                ? exception.getResponse()
                : "Internal server error"

            response.status(status).json({
                statusCode: status,
                message,
                timestamp: new Date().toISOString(),
                path: request.url,
            })
        } else if (ctxType === "ws") {
            const ctxWs = host.switchToWs()
            const client = ctxWs.getClient()
            const message = exception instanceof WsException ?
                exception.getError() : 'Internal server error'
            client.emit("exception", {message})
        }
    }
    
}