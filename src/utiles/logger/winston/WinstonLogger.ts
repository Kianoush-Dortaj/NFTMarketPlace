import winston, { format, transports } from 'winston';
const { combine, timestamp, printf, colorize, align, json } = winston.format;

export class WinstonLogger {

    static logger: winston.Logger;

    private static logConfiguration = {
        transports:
            new transports.File({
                filename: 'logs/server.log',
                format: format.combine(
                    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                    format.align(),
                    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
                )
            }),
    };

    static Config() {

        WinstonLogger.logger = winston.createLogger(WinstonLogger.logConfiguration);
        
    }

}
