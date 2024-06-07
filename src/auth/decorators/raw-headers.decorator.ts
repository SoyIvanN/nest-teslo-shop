import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const RawHeaders = createParamDecorator( ( data, ctx: ExecutionContext ) => {
    const req = ctx.switchToHttp().getRequest();
    const headers: string[] = req.rawHeaders
    return headers
})