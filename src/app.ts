// import { FfmpegExecutor } from './commands/ffmpeg/ffmpeg.executor'
import { DirExecutor } from './commands/dir/dir.executor'
import { ConsoleLogger } from './out/console-logger/console-logger'

export class App {
  async run(): Promise<void> {
    new DirExecutor(ConsoleLogger.getLogger()).execute()
  }
}

const app = new App()
app.run()
