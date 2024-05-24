import { IStreamLogger } from '../../core/handlers/stream-logger.interface'

/*-----------------Singleton----------------------- */
export class ConsoleLogger implements IStreamLogger {
  private static logger: ConsoleLogger

  log(...args: any[]): void {
    console.log(...args)
  }

  error(...args: any[]): void {
    console.log(...args)
  }

  end(): void {
    console.log('Done')
  }

  /**Create a static creation method that acts as a constructor. Under the hood, this method calls the private constructor to create an object and saves it in a static field. All following calls to this method return the cached object. */
  public static getLogger(): ConsoleLogger {
    if (!ConsoleLogger.logger) {
      ConsoleLogger.logger = new ConsoleLogger()
    }
    return ConsoleLogger.logger
  }
}
