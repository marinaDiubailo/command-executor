import { ChildProcessWithoutNullStreams } from 'child_process'
import { IStreamLogger } from './stream-logger.interface'

/*----------------- Proxy----------------------------*/
export class StreamHandler {
  constructor(private logger: IStreamLogger) {}

  proccessOutpute(stream: ChildProcessWithoutNullStreams): void {
    stream.stdout.on('data', (data: any) => {
      this.logger.log(data)
    })
    stream.stderr.on('data', (data: any) => {
      this.logger.error(data)
    })
    stream.on('close', () => {
      this.logger.end()
    })
  }
}
